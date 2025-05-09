import React, { useState } from 'react';

const GeneralSettings: React.FC = () => {
  const [timezone, setTimezone] = useState('UTC');
  const [language, setLanguage] = useState('en');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setSaving(false);
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-gray-200 pb-12">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-gray-900">General Settings</h2>
          <p className="text-sm text-gray-500">Configure your basic preferences.</p>
        </div>
        <div className="mt-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mt-1 block w-full max-w-md rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-0"
            >
              <option value="UTC">UTC</option>
              <option value="EST">Eastern Time</option>
              <option value="PST">Pacific Time</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Language</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full max-w-md rounded-md border border-gray-200 py-2 pl-3 pr-10 text-sm focus:border-black focus:outline-none focus:ring-0"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`inline-flex items-center px-4 py-2 rounded-md text-sm ${
            saving ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-black text-white hover:bg-gray-900'
          }`}
        >
          {saving ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </div>
  );
};

export default GeneralSettings;