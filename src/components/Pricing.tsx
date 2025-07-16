import React from 'react';
import { Check, Zap, Crown, Building } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Starter',
      icon: Zap,
      price: 'Free',
      period: 'forever',
      description: 'Perfect for getting started and small projects',
      features: [
        '1,000 notifications/month',
        'Email & SMS channels',
        'Basic analytics',
        'API access',
        'Community support',
        '99% uptime SLA'
      ],
      limitations: [
        'No push notifications',
        'Limited to 2 notification types'
      ],
      cta: 'Start Free',
      popular: false,
      color: 'from-blue-500 to-blue-600'
    },
    {
      name: 'Professional',
      icon: Crown,
      price: '$29',
      period: '/month',
      description: 'For growing businesses and production applications',
      features: [
        '50,000 notifications/month',
        'All channels (Email, SMS, Push)',
        'Advanced analytics & reporting',
        'User preference management',
        'Webhook support',
        'Priority support',
        '99.9% uptime SLA',
        'Custom notification types',
        'Retry mechanisms',
        'Multi-provider support'
      ],
      limitations: [],
      cta: 'Start 14-day trial',
      popular: true,
      color: 'from-purple-500 to-purple-600'
    },
    {
      name: 'Enterprise',
      icon: Building,
      price: 'Custom',
      period: 'pricing',
      description: 'For large-scale applications with custom requirements',
      features: [
        'Unlimited notifications',
        'All channels + custom integrations',
        'Advanced analytics & insights',
        'Dedicated account manager',
        '24/7 phone support',
        '99.99% uptime SLA',
        'Custom SLA agreements',
        'On-premise deployment',
        'Advanced security features',
        'Custom integrations',
        'Volume discounts',
        'Training & onboarding'
      ],
      limitations: [],
      cta: 'Contact Sales',
      popular: false,
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Start free and scale as you grow. No hidden fees, no surprises. 
            Pay only for what you use with our flexible pricing plans.
          </p>
        </div>

        {/* Pricing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-lg">
            <button className="px-6 py-2 rounded-md bg-white shadow-sm text-gray-900 font-medium">
              Monthly
            </button>
            <button className="px-6 py-2 rounded-md text-gray-600 font-medium">
              Annual (Save 20%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-purple-500 scale-105' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="p-8">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-xl flex items-center justify-center mx-auto mb-4`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start space-x-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:shadow-lg'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Usage-based pricing info */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Usage-based pricing beyond plan limits
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Need more than your plan includes? We offer competitive usage-based pricing 
              for additional notifications with volume discounts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">$0.001</div>
              <div className="text-gray-600">per email</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">$0.01</div>
              <div className="text-gray-600">per SMS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">$0.002</div>
              <div className="text-gray-600">per push notification</div>
            </div>
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500 mb-4">
              Volume discounts available for 1M+ notifications per month
            </p>
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              Calculate your costs →
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Questions about pricing?
          </h3>
          <p className="text-gray-600 mb-6">
            Our team is here to help you choose the right plan for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200">
              Contact Sales
            </button>
            <button className="text-blue-600 hover:text-blue-700 font-semibold">
              View FAQ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
