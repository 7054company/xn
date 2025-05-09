import React, { useState } from 'react';
import { Shield, Key, Lock } from 'lucide-react';

const SecuritySettings: React.FC = () => {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
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
          <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
          <p className="text-sm text-gray-500">Manage your security preferences and authentication methods.</p>
        </div>
        <div className="mt-6 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Shield className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Two-Factor Authentication</p>
                <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
              </div>
            </div>
            <button
              onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                twoFactorEnabled ? 'bg-green-500' : 'bg-gray-200'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  twoFactorEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Key className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">API Keys</p>
                <p className="text-sm text-gray-500">Manage your API keys and access tokens</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800">Manage Keys</button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Lock className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">Password</p>
                <p className="text-sm text-gray-500">Change your account password</p>
              </div>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-800">Change Password</button>
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

export default SecuritySettings;