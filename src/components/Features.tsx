import React from 'react';
import { 
  Mail, 
  MessageSquare, 
  Smartphone, 
  Settings, 
  BarChart3, 
  Shield, 
  Zap, 
  Globe,
  RefreshCw
} from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Mail,
      title: 'Multi-Channel Delivery',
      description: 'Send notifications via Email, SMS, and Push with a single API call. Automatic fallback between providers ensures maximum deliverability.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Settings,
      title: 'Smart User Preferences',
      description: 'Respect user choices with granular preference management. Users control what notifications they receive and how.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: RefreshCw,
      title: 'Intelligent Retries',
      description: 'Automatic retry mechanisms with exponential backoff. Never lose a message due to temporary provider issues.',
      color: 'from-green-500 to-green-600'
    },
    {
      icon: BarChart3,
      title: 'Real-time Analytics',
      description: 'Track delivery rates, user engagement, and system performance with comprehensive dashboards and reporting.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Built on Kafka for high-throughput message processing. Handle millions of notifications with sub-100ms API response times.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: MessageSquare,
      title: 'Developer Friendly',
      description: 'RESTful APIs, comprehensive documentation, SDKs for popular languages, and webhook support for real-time updates.',
      color: 'from-pink-500 to-pink-600'
    }
  ];

  const scrollToArchitecture = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById('architecture');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything you need for reliable notifications
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From simple transactional emails to complex multi-channel campaigns, 
            Alertora provides the infrastructure and tools to deliver every message.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Feature Highlight */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold mb-4">
                Built for Scale, Designed for Developers
              </h3>
              <p className="text-blue-100 text-lg mb-6">
                Our Kafka-based architecture handles millions of messages per second while 
                maintaining the simplicity developers love. Start with a few notifications 
                and scale to enterprise volumes seamlessly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={scrollToArchitecture}
                  className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  View Architecture
                </button>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Messages/second</span>
                  <span className="font-bold">1.2M</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-4/5"></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>Delivery Rate</span>
                  <span className="font-bold">99.5%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-full"></div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span>API Response Time</span>
                  <span className="font-bold">&lt; 100ms</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div className="bg-white rounded-full h-2 w-3/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
