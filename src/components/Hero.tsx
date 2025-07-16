import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const [selectedLang, setSelectedLang] = useState<'curl' | 'javascript' | 'python'>('curl');

  const codeExamples: Record<typeof selectedLang, string[]> = {
    curl: [
      '// Send notification via API',
      'curl -X POST https://api.alertora.addisalem.xyz/api/v1/notify',
      '-H "Authorization: Bearer YOUR_TOKEN"',
      '-H "Content-Type: application/json"',
      `-d '{`,
      `  "recipient_id": "user@example.com",`,
      `  "notification_type": "feature_release",`,
      `  "channel": "email",`,
      `  "content": "Welcome to our platform!"`,
      `}'`,
    ],
    javascript: [
      '// Send notification using fetch',
      'fetch("https://api.alertora.addisalem.xyz/api/v1/notify", {',
      '  method: "POST",',
      '  headers: {',
      '    "Authorization": "Bearer YOUR_TOKEN",',
      '    "Content-Type": "application/json"',
      '  },',
      '  body: JSON.stringify({',
      '    recipient_id: "user@example.com",',
      '    notification_type: "feature_release",',
      '    channel: "email",',
      '    content: "Welcome to our platform!"',
      '  })',
      '});',
    ],
    python: [
      '# Send notification using requests',
      'import requests',
      '',
      'url = "https://api.alertora.addisalem.xyz/api/v1/notify"',
      'headers = {',
      '  "Authorization": "Bearer YOUR_TOKEN",',
      '  "Content-Type": "application/json"',
      '}',
      'data = {',
      '  "recipient_id": "user@example.com",',
      '  "notification_type": "feature_release",',
      '  "channel": "email",',
      '  "content": "Welcome to our platform!"',
      '}',
      '',
      'response = requests.post(url, headers=headers, json=data)',
    ],
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Reliable Multi-Channel{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Notification Delivery
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Send emails, SMS, and push notifications at scale with intelligent user preferences, 
                retry mechanisms, and real-time analytics. Built for developers who need reliability.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('signup')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <span>Start Building Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => scrollToSection('docs')}
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-200"
              >
                View Documentation
              </button>
            </div>
          </div>

          {/* Right Column - Code Example + Flow */}
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 border">
              <div className="space-y-6">

                {/* Language Toggle */}
                <div className="flex space-x-2 text-sm">
                  {(['curl', 'javascript', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setSelectedLang(lang)}
                      className={`px-3 py-1 rounded font-medium ${
                        selectedLang === lang
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {lang === 'curl' ? 'cURL' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>

                {/* Code Block */}
                <div className="bg-gray-900 rounded-lg p-4 text-sm font-mono overflow-x-auto text-white space-y-1">
                  {codeExamples[selectedLang].map((line, i) => (
                    <div key={i} className="whitespace-pre">{line}</div>
                  ))}
                </div>

                {/* Notification Flow */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-700">Email notification queued</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">Delivered successfully</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-purple-50 rounded-lg">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">User preferences respected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-3 rounded-lg shadow-lg">
              <div className="text-xs font-medium">Real-time Analytics</div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border shadow-lg p-3 rounded-lg">
              <div className="text-xs text-gray-600">Multi-provider Support</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
