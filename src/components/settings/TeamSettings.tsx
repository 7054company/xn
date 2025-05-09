import React, { useState } from 'react';

const TeamSettings: React.FC = () => {
  const [teamName, setTeamName] = useState('MyDashboard Team');
  const [teamUrl, setTeamUrl] = useState('mydashboard-team');
  const [saving, setSaving] = useState(false);
  const [membersCount, setMembersCount] = useState(5);
  const [activeProjects, setActiveProjects] = useState(3);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [teamLogo, setTeamLogo] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('12345-ABCDE');
  const [billingPlan, setBillingPlan] = useState('Pro');
  const [securityEnabled, setSecurityEnabled] = useState(true);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  const handleNotificationToggle = () => {
    setNotificationsEnabled(!notificationsEnabled);
  };

  const handleSecurityToggle = () => {
    setSecurityEnabled(!securityEnabled);
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTeamLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-12">
      {/* Team Name Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Team Name</h2>
          <p className="text-sm text-gray-500">
            This is your team's visible name within the dashboard. For example, the name of your company or department.
          </p>
        </div>
        <div className="mt-4">
          <input
            type="text"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full max-w-md rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-black focus:ring-0"
          />
          <p className="mt-2 text-sm text-gray-500">Please use 32 characters at maximum.</p>
        </div>
      </div>

      {/* Team URL Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Team URL</h2>
          <p className="text-sm text-gray-500">
            This is your team's URL namespace on the platform. Within it, your team can inspect their projects.
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-2">
          <span className="text-sm text-gray-500">dashboard.com/</span>
          <input
            type="text"
            value={teamUrl}
            onChange={(e) => setTeamUrl(e.target.value)}
            className="max-w-md rounded-md border border-gray-200 px-4 py-2 text-sm focus:border-black focus:ring-0"
          />
        </div>
      </div>

      {/* Team Usage Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Team Usage</h2>
          <p className="text-sm text-gray-500">
            This section displays your team's current usage, including the number of members and active projects.
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Team Members</span>
            <span className="text-sm text-gray-900">{membersCount} Members</span>
          </div>
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Active Projects</span>
            <span className="text-sm text-gray-900">{activeProjects} Projects</span>
          </div>
        </div>
      </div>

      {/* Team Logo Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Team Logo</h2>
          <p className="text-sm text-gray-500">
            Upload a logo to represent your team in the dashboard.
          </p>
        </div>
        <div className="mt-4">
          <input
            type="file"
            onChange={handleLogoUpload}
            className="w-full max-w-md text-sm"
          />
          {teamLogo && (
            <div className="mt-4">
              <img src={teamLogo} alt="Team Logo" className="w-24 h-24 object-cover rounded-md" />
            </div>
          )}
        </div>
      </div>

      {/* Billing Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Billing & Subscription</h2>
          <p className="text-sm text-gray-500">
            View and manage your current subscription plan, usage, and billing information.
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Current Plan</span>
            <span className="text-sm text-gray-900">{billingPlan} Plan</span>
          </div>
          <button className="text-sm text-blue-600 hover:underline">Manage Subscription</button>
        </div>
      </div>

      {/* Security Settings Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
          <p className="text-sm text-gray-500">
            Configure your team's security settings like two-factor authentication (2FA).
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <label className="text-sm text-gray-500">Enable Two-Factor Authentication</label>
          <input
            type="checkbox"
            checked={securityEnabled}
            onChange={handleSecurityToggle}
            className="h-4 w-4"
          />
        </div>
      </div>

      {/* API Keys Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">API Keys</h2>
          <p className="text-sm text-gray-500">
            Manage API keys for programmatic access to your team's data and services.
          </p>
        </div>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="text-sm text-gray-500">Current API Key</span>
            <span className="text-sm text-gray-900">{apiKey}</span>
          </div>
          <button className="text-sm text-blue-600 hover:underline">Generate New API Key</button>
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">Notification Preferences</h2>
          <p className="text-sm text-gray-500">
            Manage your notification preferences to receive updates about your team's activities.
          </p>
        </div>
        <div className="mt-4 flex items-center space-x-3">
          <label className="text-sm text-gray-500">Enable Notifications</label>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={handleNotificationToggle}
            className="h-4 w-4"
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8">
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full max-w-md rounded-md bg-blue-600 text-white px-4 py-2 text-sm focus:outline-none disabled:bg-gray-300"
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};

export default TeamSettings;
