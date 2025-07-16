import React, { useState } from 'react';
import { Copy, Check, Code, Zap } from 'lucide-react';

const ApiDocs = () => {
  const codeExamples = {
    register: {
      title: 'Register Your Application',
      description: 'Register your client app and obtain API credentials.',
      code: `curl -X POST https://api.alertora.addisalem.xyz/api/v1/register \\
  -H "Content-Type: application/json" \\
  -d '{
    "service_name": "MyApp",
    "notification_types": [
      {"name": "promo", "description": "Promotional offers"},
      {"name": "security_alert", "description": "Security-related notifications"}
    ]
  }'`,
      response: `{
  "client_id": "uuid-string",
  "api_token": "secure-token"
}`
    },
    notify: {
      title: 'Send Notification',
      description: 'Send a notification using your API token.',
      code: `curl -X POST https://api.alertora.addisalem.xyz/api/v1/notify \\
  -H "Authorization: Bearer at_1234567890abcdef" \\
  -H "Content-Type: application/json" \\
  -d '{
    "recipient_id": "user@example.com",
    "notification_type": "promo",
    "channel": "email",
    "content": "🔥 Big Sale starts now!"
  }'`,
      response: `{
  "message": "Notification accepted"
}`
    }
  };

  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<keyof typeof codeExamples>('register');

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <section id="docs" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">API Documentation</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, powerful APIs designed for developers. Get started in minutes with our comprehensive documentation and interactive examples.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">2</div>
            <div className="text-gray-600">Simple Endpoints</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Code className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">RESTful APIs</div>
            <div className="text-gray-600">Easy Integration</div>
          </div>
        </div>

        {/* Interactive API Explorer */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <div className="flex">
              {Object.entries(codeExamples).map(([key, example]) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key as keyof typeof codeExamples)}
                  className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === key
                      ? 'border-blue-600 text-blue-600 bg-blue-50'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {example.title}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Request */}
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {codeExamples[activeTab].title}
                  </h3>
                  <p className="text-gray-600">{codeExamples[activeTab].description}</p>
                </div>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <span className="text-gray-300 text-sm font-medium">Request</span>
                    <button
                      onClick={() => copyToClipboard(codeExamples[activeTab].code, `${activeTab}-request`)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === `${activeTab}-request` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                    <code>{codeExamples[activeTab].code}</code>
                  </pre>
                </div>
              </div>

              {/* Response */}
              <div>
                <div className="mb-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Response</h3>
                  <p className="text-gray-600">Expected JSON response from the API</p>
                </div>
                <div className="bg-gray-900 rounded-lg overflow-hidden">
                  <div className="flex items-center justify-between p-4 border-b border-gray-700">
                    <span className="text-gray-300 text-sm font-medium">200 OK</span>
                    <button
                      onClick={() => copyToClipboard(codeExamples[activeTab].response, `${activeTab}-response`)}
                      className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === `${activeTab}-response` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span className="text-sm">Copy</span>
                    </button>
                  </div>
                  <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
                    <code>{codeExamples[activeTab].response}</code>
                  </pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApiDocs;
