import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Check, 
  X, 
  Loader2,
  Shield,
  Bell,
  BellOff
} from 'lucide-react';

interface NotificationType {
  name: string;
  description: string;
}

interface PreferenceMetadata {
  allowed_types: string[];
}

const UserPreferences = () => {
  const [token, setToken] = useState<string>('');
  const [metaData, setMetaData] = useState<PreferenceMetadata | null>(null);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const channels = [
    { id: 'email', name: 'Email', icon: Mail, description: 'Receive notifications via email' },
    { id: 'sms', name: 'SMS', icon: MessageSquare, description: 'Receive notifications via text message' },
    { id: 'push_android', name: 'Android Push', icon: Smartphone, description: 'Receive notifications on Android' },
    { id: 'push_ios', name: 'iOS Push', icon: Smartphone, description: 'Receive notifications on iOS' }
  ];
  

  // Extract token from URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      setToken(urlToken);
      loadMetadata(urlToken);
    }
  }, []);

  const loadMetadata = async (tokenToUse: string) => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch(`https://prefs.alertora.addisalem.xyz/api/v1/preferences/metadata?token=${tokenToUse}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to load metadata');
      }

      setMetaData(data);
      // Initialize with empty selections - user will choose their preferences
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to load metadata' });
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async () => {
    if (!token || !metaData) return;

    setIsUpdating(true);
    setMessage(null);

    try {
      const response = await fetch('https://prefs.alertora.addisalem.xyz/api/v1/preferences/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          token,
          channels: selectedChannels,
          allowed_types: selectedTypes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to update preferences');
      }

      setMessage({ type: 'success', text: 'Preferences updated successfully!' });
    } catch (error: any) {
      setMessage({ type: 'error', text: error.message || 'Failed to update preferences' });
    } finally {
      setIsUpdating(false);
    }
  };

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleTypeToggle = (typeName: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeName) 
        ? prev.filter(name => name !== typeName)
        : [...prev, typeName]
    );
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (token.trim()) {
      loadMetadata(token.trim());
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Notification Preferences
            </h1>
            <p className="text-gray-600">
              Enter your preference token to manage your notification settings
            </p>
          </div>

          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preference Token
              </label>
              <input
                type="text"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your token here..."
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
            >
              Load Preferences
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your preferences...</p>
        </div>
      </div>
    );
  }

  if (!metaData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <X className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Invalid Token
          </h1>
          <p className="text-gray-600 mb-6">
            The preference token is invalid or has expired. Please check your link or contact support.
          </p>
          <button
            onClick={() => setToken('')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex items-center mb-6">
            <Settings className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Notification Preferences
              </h1>
              <p className="text-gray-600">
                Manage your notification settings
              </p>
            </div>
          </div>

          {message && (
            <div className={`p-4 rounded-lg mb-6 ${
              message.type === 'success' 
                ? 'bg-green-50 border border-green-200 text-green-800' 
                : 'bg-red-50 border border-red-200 text-red-800'
            }`}>
              <div className="flex items-center">
                {message.type === 'success' ? (
                  <Check className="w-5 h-5 mr-2" />
                ) : (
                  <X className="w-5 h-5 mr-2" />
                )}
                {message.text}
              </div>
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Delivery Channels */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <Bell className="w-5 h-5 mr-2" />
                Delivery Channels
              </h2>
              <p className="text-gray-600 mb-6">
                Choose how you want to receive notifications
              </p>

              <div className="space-y-4">
                {channels.map((channel) => {
                  const IconComponent = channel.icon;
                  const isSelected = selectedChannels.includes(channel.id);
                  
                  return (
                    <div
                      key={channel.id}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleChannelToggle(channel.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <IconComponent className={`w-6 h-6 mr-3 ${
                            isSelected ? 'text-blue-600' : 'text-gray-400'
                          }`} />
                          <div>
                            <h3 className="font-semibold text-gray-900">
                              {channel.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {channel.description}
                            </p>
                          </div>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-blue-500 bg-blue-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Notification Types */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <BellOff className="w-5 h-5 mr-2" />
                Notification Types
              </h2>
              <p className="text-gray-600 mb-6">
                Select which types of notifications you want to receive
              </p>

              <div className="space-y-4">
                {metaData.allowed_types.map((typeName) => {
                  const isSelected = selectedTypes.includes(typeName);
                  
                  return (
                    <div
                      key={typeName}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleTypeToggle(typeName)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900 capitalize">
                            {typeName.replace('_', ' ')}
                          </h3>
                          <p className="text-sm text-gray-600">
                            Receive {typeName.replace('_', ' ')} notifications
                          </p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? 'border-purple-500 bg-purple-500'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && <Check className="w-4 h-4 text-white" />}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
              <div className="text-sm text-gray-600">
                {selectedChannels.length === 0 && selectedTypes.length === 0 ? (
                  <span className="text-red-600">⚠️ You won't receive any notifications with current settings</span>
                ) : (
                  <span>
                    You'll receive {selectedTypes.length} notification type(s) via {selectedChannels.length} channel(s)
                  </span>
                )}
              </div>
              <button
                onClick={updatePreferences}
                disabled={isUpdating}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isUpdating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Save Preferences
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <p className="text-gray-600 text-sm">
            Your preferences are securely stored and can be updated anytime. 
            You can also unsubscribe from all notifications by deselecting all options above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
