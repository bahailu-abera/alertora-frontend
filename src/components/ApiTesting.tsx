import React, { useState } from 'react';
import { 
  Send, 
  Copy, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Code, 
  Play,
  Settings,
  Mail,
  MessageSquare,
  Smartphone,
  Plus,
  X
} from 'lucide-react';

interface TestResult {
  status: 'success' | 'error' | 'loading';
  data?: any;
  error?: string;
  timestamp: string;
  endpoint?: string;
  method?: string;
}

const ApiTesting = () => {
  const [activeTab, setActiveTab] = useState<'register' | 'notify'>('register');
  const [apiToken, setApiToken] = useState('');
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  
  // Registration form state
  const [serviceName, setServiceName] = useState('My Test Service');
  const [notificationTypes, setNotificationTypes] = useState([
    { name: 'welcome', description: 'Welcome messages for new users' },
    { name: 'promo', description: 'Promotional offers and discounts' }
  ]);

  // Notification form state
  const [recipientId, setRecipientId] = useState('user@example.com');
  const [notificationType, setNotificationType] = useState('welcome');
  const [channel, setChannel] = useState<'email' | 'sms' | 'push'>('email');
  const [content, setContent] = useState('Welcome to our platform! We\'re excited to have you on board.');

  const [isLoading, setIsLoading] = useState(false);

  const addTestResult = (result: Omit<TestResult, 'timestamp'>) => {
    const newResult = {
      ...result,
      timestamp: new Date().toLocaleTimeString()
    };
    setTestResults(prev => [newResult, ...prev]);
  };

  const handleRegister = async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.alertora.addisalem.xyz/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_name: serviceName,
          notification_types: notificationTypes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setApiToken(data.api_token);
      
      addTestResult({
        status: 'success',
        data: data,
        endpoint: '/api/v1/register',
        method: 'POST'
      });
    } catch (error: any) {
      addTestResult({
        status: 'error',
        error: error.message || 'Registration failed. Please try again.',
        endpoint: '/api/v1/register',
        method: 'POST'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendNotification = async () => {
    if (!apiToken) {
      addTestResult({
        status: 'error',
        error: 'Please register first to get an API token',
        endpoint: '/api/v1/notify',
        method: 'POST'
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await fetch('https://api.alertora.addisalem.xyz/api/v1/notify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          recipient_id: recipientId,
          notification_type: notificationType,
          channel: channel,
          content: content
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send notification');
      }
      
      addTestResult({
        status: 'success',
        data: data,
        endpoint: '/api/v1/notify',
        method: 'POST'
      });
    } catch (error: any) {
      addTestResult({
        status: 'error',
        error: error.message || 'Failed to send notification. Please check your parameters.',
        endpoint: '/api/v1/notify',
        method: 'POST'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const addNotificationType = () => {
    setNotificationTypes([...notificationTypes, { name: '', description: '' }]);
  };

  const updateNotificationType = (index: number, field: 'name' | 'description', value: string) => {
    const updated = [...notificationTypes];
    updated[index][field] = value;
    setNotificationTypes(updated);
  };

  const removeNotificationType = (index: number) => {
    if (notificationTypes.length > 1) {
      setNotificationTypes(notificationTypes.filter((_, i) => i !== index));
    }
  };

  const getChannelIcon = (channelType: string) => {
    switch (channelType) {
      case 'email': return Mail;
      case 'sms': return MessageSquare;
      case 'push': return Smartphone;
      default: return Mail;
    }
  };

  return (
    <section id="api-testing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Test Our API
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Try out Alertora's notification API directly from your browser. 
            Register your service and send test notifications to see how it works.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* API Testing Interface */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <div className="flex space-x-1 mb-6">
              <button
                onClick={() => setActiveTab('register')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'register'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:text-gray-900'
                }`}
              >
                <Settings className="w-4 h-4 inline mr-2" />
                Register Service
              </button>
              <button
                onClick={() => setActiveTab('notify')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'notify'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-600 hover:text-gray-900'
                }`}
              >
                <Send className="w-4 h-4 inline mr-2" />
                Send Notification
              </button>
            </div>

            {activeTab === 'register' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="My Awesome App"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Notification Types *
                    </label>
                    <button
                      type="button"
                      onClick={addNotificationType}
                      className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add</span>
                    </button>
                  </div>
                  
                  {notificationTypes.map((type, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 mb-3 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-600">Type {index + 1}</span>
                        {notificationTypes.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeNotificationType(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={type.name}
                          onChange={(e) => updateNotificationType(index, 'name', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Type name (e.g., promo)"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description *
                        </label>
                        <input
                          type="text"
                          required
                          value={type.description}
                          onChange={(e) => updateNotificationType(index, 'description', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="Description (e.g., Promotional offers)"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleRegister}
                  disabled={isLoading || !serviceName || notificationTypes.some(t => !t.name || !t.description)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Settings className="w-4 h-4 mr-2" />
                  )}
                  Register Service
                </button>
              </div>
            )}

            {activeTab === 'notify' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    API Token *
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={apiToken}
                      onChange={(e) => setApiToken(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Register first or paste your token here"
                    />
                    {apiToken && (
                      <button
                        onClick={() => copyToClipboard(apiToken)}
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                        title="Copy token"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recipient ID *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientId}
                    onChange={(e) => setRecipientId(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="user@example.com or +1234567890"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type *
                  </label>
                  <select
                    value={notificationType}
                    onChange={(e) => setNotificationType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {notificationTypes.map((type) => (
                      <option key={type.name} value={type.name}>
                        {type.name} - {type.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Delivery Channel *
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['email', 'sms', 'push'] as const).map((channelOption) => {
                      const IconComponent = getChannelIcon(channelOption);
                      return (
                        <button
                          key={channelOption}
                          type="button"
                          onClick={() => setChannel(channelOption)}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            channel === channelOption
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <IconComponent className="w-5 h-5 mx-auto mb-1" />
                          <div className="text-sm font-medium capitalize">{channelOption}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message Content *
                  </label>
                  <textarea
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your notification message..."
                  />
                </div>

                <button
                  onClick={handleSendNotification}
                  disabled={isLoading || !apiToken || !recipientId || !content}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Send Notification
                </button>
              </div>
            )}
          </div>

          {/* Results Panel */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Code className="w-5 h-5 mr-2" />
                API Response
              </h3>
              {testResults.length > 0 && (
                <button
                  onClick={() => setTestResults([])}
                  className="text-gray-400 hover:text-white text-sm"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {testResults.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <Play className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>Run an API test to see results here</p>
                </div>
              ) : (
                testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-l-4 ${
                      result.status === 'success'
                        ? 'bg-green-900/20 border-green-500'
                        : result.status === 'error'
                        ? 'bg-red-900/20 border-red-500'
                        : 'bg-yellow-900/20 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        {result.status === 'success' && (
                          <CheckCircle className="w-4 h-4 text-green-400 mr-2" />
                        )}
                        {result.status === 'error' && (
                          <XCircle className="w-4 h-4 text-red-400 mr-2" />
                        )}
                        {result.status === 'loading' && (
                          <Loader2 className="w-4 h-4 text-yellow-400 mr-2 animate-spin" />
                        )}
                        <span className="text-sm font-medium">
                          {result.method} {result.endpoint}
                        </span>
                      </div>
                      <span className="text-xs text-gray-400">
                        {result.timestamp}
                      </span>
                    </div>
                    
                    {result.data && (
                      <pre className="text-sm bg-black/30 p-3 rounded overflow-x-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    )}
                    
                    {result.error && (
                      <p className="text-red-300 text-sm">{result.error}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Quick Start Guide
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex items-start">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Register Your Service</h4>
                <p className="text-gray-600 text-sm">
                  Create your service profile and define notification types to get your API token.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Test Notifications</h4>
                <p className="text-gray-600 text-sm">
                  Send test notifications across different channels to see how they work.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold mr-3 mt-1">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-1">Integrate & Scale</h4>
                <p className="text-gray-600 text-sm">
                  Use the API token in your application and start sending notifications at scale.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiTesting;
