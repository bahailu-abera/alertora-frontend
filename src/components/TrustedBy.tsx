import React from 'react';

const TrustedBy = () => {
  const companies = [
    { name: 'TechCorp', logo: 'TC' },
    { name: 'DataFlow', logo: 'DF' },
    { name: 'CloudSync', logo: 'CS' },
    { name: 'DevTools', logo: 'DT' },
    { name: 'AppScale', logo: 'AS' },
    { name: 'CodeBase', logo: 'CB' },
  ];

  return (
    <section className="py-16 bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-gray-500 text-sm font-medium uppercase tracking-wide">
            Trusted by innovative companies worldwide
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {companies.map((company, index) => (
            <div
              key={index}
              className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {company.logo}
                </div>
                <span className="font-semibold text-gray-700">{company.name}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 text-center max-w-3xl mx-auto">
          <blockquote className="text-xl text-gray-700 italic mb-4">
            "Alertora transformed our notification system. We went from 70% delivery rates to 99.5% 
            with their intelligent retry mechanisms and multi-provider support."
          </blockquote>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              JS
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Jane Smith</div>
              <div className="text-gray-600 text-sm">CTO, TechCorp</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;
