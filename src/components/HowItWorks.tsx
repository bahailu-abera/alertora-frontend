import React from 'react';
import { ArrowRight, Code, Send, BarChart } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Code,
      title: 'Integrate our API',
      description: 'Add Alertora to your application with a simple REST API call. Get your API key and start sending notifications in minutes.',
      code: `curl -X POST https://api.alertora.addisalem.xyz/notify \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -d '{
    "recipient": "user@example.com",
    "channel": "email",
    "content": "Welcome!"
  }'`,
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Send,
      title: 'Send notifications',
      description: 'Our system handles routing, user preferences, provider selection, and delivery. You focus on your application logic.',
      code: `{
  "message": "Notification accepted",
  "id": "notif_1234567890",
  "status": "queued",
  "estimated_delivery": "2024-01-15T10:30:00Z"
}`,
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: BarChart,
      title: 'Track delivery',
      description: 'Monitor delivery status, user engagement, and system performance through our dashboard and webhooks.',
      code: `{
  "event": "notification.delivered",
  "notification_id": "notif_1234567890",
  "recipient": "user@example.com",
  "channel": "email",
  "delivered_at": "2024-01-15T10:30:15Z"
}`,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How Alertora Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes with our simple three-step process. 
            From integration to delivery tracking, we've made it effortless.
          </p>
        </div>

        <div className="space-y-16">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;
            
            return (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  isEven ? '' : 'lg:grid-flow-col-dense'
                }`}
              >
                {/* Content */}
                <div className={isEven ? '' : 'lg:col-start-2'}>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className={`w-12 h-12 bg-gradient-to-r ${step.color} rounded-lg flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl font-bold text-gray-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <ArrowRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
                      Try it Now
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center space-x-2">
                      <span>View Documentation</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Code Example */}
                <div className={isEven ? '' : 'lg:col-start-1'}>
                  <div className="bg-gray-900 rounded-xl p-6 shadow-2xl">
                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <pre className="text-sm text-gray-300 overflow-x-auto">
                      <code>{step.code}</code>
                    </pre>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Examples */}
        <div className="mt-20 bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Works with your favorite tools
            </h3>
            <p className="text-gray-600">
              SDKs and integrations for popular programming languages and frameworks
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['JavaScript', 'Python', 'PHP', 'Ruby', 'Go', 'Java', 'C#', 'Node.js'].map((tech, index) => (
              <div
                key={index}
                className="bg-white p-4 rounded-lg text-center hover:shadow-md transition-shadow"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded mx-auto mb-2"></div>
                <span className="text-sm font-medium text-gray-700">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
