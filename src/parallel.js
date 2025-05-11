const { exec } = require('child_process');
const path = require('path');

// Function to run commands in parallel
function runParallelCommand(command, packages, maxParallel) {
    let activeTasks = [];  // Active tasks being executed

    return new Promise(async (resolve, reject) => {
        for (let i = 0; i < packages.length; i++) {
            const pkg = packages[i];
            const packageDir = path.join(__dirname, '../packages', pkg);
            const task = new Promise((taskResolve, taskReject) => {
                exec(command, { cwd: packageDir }, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error executing command in ${packageDir}: ${error.message}`);
                        taskReject(error);
                        return;
                    }
                    console.log(stdout);
                    taskResolve(stdout);
                });
            });
            activeTasks.push(task);

            // If the active tasks reach maxParallel, wait for them to finish before starting more
            if (activeTasks.length >= maxParallel || i === packages.length - 1) {
                await Promise.all(activeTasks);
                activeTasks = []; // Reset active tasks after running them
            }
        }
        resolve();
    });
}

module.exports = { runParallelCommand };
