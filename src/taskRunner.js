const fs = require('fs');
const path = require('path');
const concurrently = require('concurrently');
const { exec } = require('child_process');
const { setCache, getCache } = require('./cache');
const repoxConfig = require('../repox.json');
const { logPerformanceMetrics } = require('./analytics'); // Import analytics functions

function init() {
    console.log('Initializing the project...');
}

function create(packageName) {
    if (!packageName) {
        console.log('Please provide a package name.');
        return;
    }
    console.log(`Creating package: ${packageName}`);
    const packageDir = path.join(__dirname, '../packages', packageName);
    if (!fs.existsSync(packageDir)) {
        fs.mkdirSync(packageDir);
        fs.writeFileSync(
            path.join(packageDir, 'index.js'),
            `// Entry file for ${packageName}\nconsole.log('Hello from ${packageName}!');`
        );
        fs.writeFileSync(
            path.join(packageDir, 'package.json'),
            JSON.stringify({
                name: packageName,
                version: '1.0.0',
                main: 'index.js',
                scripts: {
                    test: `echo "Running tests for ${packageName}" && exit 0`,
                },
            }, null, 2)
        );
        fs.writeFileSync(
            path.join(packageDir, 'README.md'),
            `# ${packageName}\n\nThis package is part of the RepoX monorepo.`
        );
        console.log(`Package ${packageName} created successfully.`);
    } else {
        console.log(`Package ${packageName} already exists.`);
    }
}

function getAllPackages() {
    return fs
        .readdirSync(path.join(__dirname, '../packages'))
        .filter(pkg => fs.statSync(path.join(__dirname, '../packages', pkg)).isDirectory());
}

// Run a single command in a specific directory with performance logging
async function runCommand(command, dir) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now(); // Start time before command execution

        const fullCommand = `npm run ${command}`;
        console.log(`Executing ${fullCommand} in ${dir}...`);

        exec(fullCommand, { cwd: dir }, (error, stdout, stderr) => {
            const endTime = Date.now(); // End time after command execution

            const duration = endTime - startTime; // Calculate actual duration

            // Log performance metrics with the correct duration
            logPerformanceMetrics(command, dir, duration);

            if (error) {
                console.error(`Error executing command in ${dir}: ${error.message}`);
                reject(error);
            } else {
                console.log(stdout);
                resolve(stdout);
            }
        });
    });
}

// Run multiple commands for filtered packages with parallel execution using concurrently
async function runMultipleCommands(commands, filters) {
    const packages = getAllPackages();

    // Ensure each command exists in the pipeline configuration
    for (const command of commands) {
        if (!repoxConfig.pipeline[command]) {
            console.log(`Command '${command}' not found in repox.json.`);
            return;
        }
    }

    // Apply filters to select only relevant packages
    let filteredPackages = packages;
    if (filters && filters.length > 0) {
        filteredPackages = packages.filter(pkg =>
            filters.some(filter => pkg.includes(filter))
        );
    }

    // Exit if no packages match the filter criteria
    if (filteredPackages.length === 0) {
        console.log(`No packages found for filters: ${filters.join(', ')}`);
        return;
    }

    console.log(`Running commands '${commands.join(' ')}' for packages: ${filteredPackages.join(', ')}`);

    // Start tracking the total time for all commands
    const overallStartTime = Date.now();

    // Prepare tasks for concurrently
    const tasks = filteredPackages.flatMap(pkg => {
        const packageDir = path.join(__dirname, '../packages', pkg);
        return commands.map(command => ({
            command: `npm run ${command}`,
            name: `${pkg}-${command}`,
            cwd: packageDir,
            runWhen: () => {
                const startTime = Date.now(); // Track start time for each command
                return {
                    startTime,
                    logCommandCompletion: () => {
                        const endTime = Date.now();
                        const duration = endTime - startTime;
                        logPerformanceMetrics(command, packageDir, duration);
                    }
                };
            }
        }));
    });

    try {
        // Use concurrently for parallel execution with specified max processes
        const { result } = concurrently(tasks, {
            maxProcesses: repoxConfig.maxParallel || filteredPackages.length,
            killOthers: ['failure'],
        });

        await result; // Wait for all commands to complete
        console.log('All commands completed successfully.');

        // Log completion of each command
        tasks.forEach(task => {
            task.runWhen().logCommandCompletion();
        });

        // Log the total duration after all commands have completed
        const overallEndTime = Date.now();
        const totalDuration = overallEndTime - overallStartTime;
        console.log(`Total duration for all commands: ${totalDuration}ms`);
        logPerformanceMetrics('Total', 'All packages', totalDuration); // Log total duration
    } catch (error) {
        console.error('Error in parallel execution:', error);
    }
}

async function build() {
    console.log('Building all packages...');
    const packages = getAllPackages();
    console.log(`Found packages: ${packages.join(', ')}`);

    await Promise.all(
        packages.map(pkg => {
            const packageDir = path.join(__dirname, '../packages', pkg);
            console.log(`Running build in ${packageDir}`);

            // Check if there's a cached result
            const cacheKey = `${pkg}-build-output`;
            const cachedResult = getCache(cacheKey);
            if (cachedResult) {
                console.log(`Using cached result for ${pkg}:`, cachedResult);
                return Promise.resolve();
            }

            return runCommand('build', packageDir).then(stdout => {
                setCache(cacheKey, { output: stdout });
                console.log(`Cached build output for ${pkg}:`, stdout);
            });
        })
    );
}

async function test() {
    console.log('Running tests...');
    const packages = getAllPackages();

    await Promise.all(
        packages.map(pkg =>
            runCommand('test', path.join(__dirname, '../packages', pkg)).catch(err => {
                console.error(`Tests failed for ${pkg}: ${err.message}`);
            })
        )
    );
}

async function integrate(existingPath) {
    console.log(`Integrating project from: ${existingPath}`);
}

function help() {
    console.log(`
RepoX - Monorepo Management Tool

Usage: repox [command]

Commands:
  init                          Initialize a new RepoX project.
  create <package-name>         Create a new package within the monorepo.
  integrate <path>              Integrate an existing project into the monorepo.
  build                         Build all packages in the monorepo.
  test                          Run tests across all packages.
  run <command> [--filter=<filter>]   Run a command for specific packages.
  help                          Display this help message.

Filtering:
  Use the --filter option to run commands for packages that match the filter.
  
Examples:
  Initialize a new project:
    npx repox init

  Create a new package called "utils":
    npx repox create utils

  Integrate an existing project:
    npx repox integrate path/to/existing-project

  Build all packages:
    npx repox build

  Run tests across all packages:
    npx repox test

  Run a command for packages that match a filter:
    npx repox run build --filter=utils

  For more information on a specific command, run:
    npx repox <command> --help
`);
}

// Export the functions
module.exports = { init, create, integrate, build, test, help, runMultipleCommands };




//log capture total parall 