import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Database, 
  MessageSquare, 
  Users, 
  Zap, 
  Shield, 
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Mail,
  Smartphone,
  Bell,
  Settings,
  Lock,
  RefreshCw,
  Activity,
  Clock,
  RotateCcw,
  AlertTriangle
} from 'lucide-react';

const Architecture: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const steps = [
    { id: 'registration', title: 'Client Registration', delay: 0 },
    { id: 'notification', title: 'Notification Request', delay: 1000 },
    { id: 'preferences', title: 'User Preferences Check', delay: 2000 },
    { id: 'queue', title: 'Message Queue', delay: 3000 },
    { id: 'workers', title: 'Workers Processing', delay: 4000 },
    { id: 'logging', title: 'Delivery Logging', delay: 5000 },
    { id: 'retry', title: 'Retry Handling (Celery)', delay: 6000 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const architectureComponents = [
    {
      title: "Notification Service",
      icon: <Server className="w-8 h-8" />,
      description: "Main entry point for client registration and notification requests",
      features: [
        "API token authentication",
        "Rate limiting enforcement", 
        "Payload validation",
        "User preference integration"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "User Preference Service",
      icon: <Settings className="w-8 h-8" />,
      description: "Manages user notification preferences per client and type",
      features: [
        "Channel preferences (email, SMS, push)",
        "Notification type filtering",
        "Opt-in/opt-out management",
        "Redis caching for fast access"
      ],
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Message Queues (Kafka)",
      icon: <MessageSquare className="w-8 h-8" />,
      description: "Decoupled, scalable message processing with channel separation",
      features: [
        "Separate topics per channel",
        "Fault-tolerant processing",
        "Load spike buffering",
        "Strong delivery guarantees"
      ],
      color: "from-indigo-500 to-indigo-600"
    },
    {
      title: "Worker Services",
      icon: <Zap className="w-8 h-8" />,
      description: "Channel-specific consumers for notification delivery",
      features: [
        "Stateless, scalable workers",
        "Third-party provider integration",
        "Delivery result logging",
        "Independent scaling per channel"
      ],
      color: "from-yellow-500 to-yellow-600"
    },
    {
      title: "Retry System (Celery)",
      icon: <RotateCcw className="w-8 h-8" />,
      description: "Automated retry handling for failed notifications",
      features: [
        "Periodic task scheduling",
        "Exponential backoff strategy",
        "Configurable retry limits",
        "Failed notification recovery"
      ],
      color: "from-green-500 to-green-600"
    }
  ];

  const dataStores = [
    {
      title: "MongoDB - Client & Preferences",
      icon: <Database className="w-6 h-6" />,
      description: "Flexible schema for client metadata and user preferences",
      usage: "3.5GB for 1M services + 8GB for user preferences"
    },
    {
      title: "Redis - Caching Layer",
      icon: <Zap className="w-6 h-6" />,
      description: "Fast access to frequently queried data",
      usage: "Client tokens, user preferences, rate limiting"
    },
    {
      title: "PostgreSQL - Logs & Auditing",
      icon: <Shield className="w-6 h-6" />,
      description: "ACID compliance for delivery logs and retry tracking",
      usage: "14.6TB/year for 40M daily notifications"
    }
  ];

  const deliveryChannels = [
    {
      title: "Email",
      icon: <Mail className="w-6 h-6" />,
      provider: "SendGrid",
      features: ["High deliverability", "Rich analytics", "Template support"]
    },
    {
      title: "SMS",
      icon: <Smartphone className="w-6 h-6" />,
      provider: "Twilio",
      features: ["Global coverage", "Delivery callbacks", "Two-way messaging"]
    },
    {
      title: "Push",
      icon: <Bell className="w-6 h-6" />,
      provider: "FCM/APNs",
      features: ["iOS & Android", "Real-time delivery", "Rich notifications"]
    }
  ];

  return (
    <section id="architecture" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            System Architecture
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A robust, scalable notification delivery system designed to handle 40M+ daily notifications
            with 99.9% uptime and automated retry mechanisms for guaranteed delivery.
          </p>
        </div>

        {/* Architecture Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-5 gap-8 mb-16">
          {architectureComponents.map((component, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
            >
              <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${component.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-200`}>
                {component.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{component.title}</h3>
              <p className="text-gray-600 mb-4">{component.description}</p>
              <ul className="space-y-2">
                {component.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Data Flow Diagram */}
        <div className="bg-white rounded-2xl p-8 mb-16 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Alertora Data Flow Visualization
          </h3>
          
          <div className="relative">
            {/* Flow Steps */}
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-8 lg:space-y-0 lg:space-x-4">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex-1 transition-all duration-500 ${
                    currentStep === index
                      ? 'transform scale-110 opacity-100'
                      : 'opacity-60 hover:opacity-80'
                  }`}
                >
                  <div className="text-center">
                    <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-500 ${
                      currentStep === index
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg'
                        : 'bg-gray-200 border-2 border-gray-300'
                    }`}>
                      <span className={`font-bold text-lg ${currentStep === index ? 'text-white' : 'text-gray-600'}`}>{index + 1}</span>
                    </div>
                    <h4 className={`font-semibold transition-colors duration-300 text-sm ${
                      currentStep === index ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h4>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2 z-0">
                      <div className={`h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-1000 ${
                        currentStep > index ? 'w-full' : 'w-0'
                      }`}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Detailed Flow Description */}
            <div className="mt-12 bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-blue-600" />
                    Authentication & Validation
                  </h4>
                  <p className="text-gray-600 text-sm">
                    All requests are authenticated using API tokens. Payload validation ensures data integrity before processing.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Users className="w-5 h-5 mr-2 text-purple-600" />
                    User Preference Filtering
                  </h4>
                  <p className="text-gray-600 text-sm">
                    User preferences are checked in real-time to respect opt-out choices and channel preferences.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-indigo-600" />
                    Delivery Logging
                  </h4>
                  <p className="text-gray-600 text-sm">
                    All delivery attempts are logged in PostgreSQL with timestamps and status for auditing and retry tracking.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-green-600" />
                    Automated Retries
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Celery periodic tasks automatically retry failed notifications with exponential backoff until delivery succeeds.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Data Flow Steps */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Complete Data Flow Process
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <span className="font-bold">1</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Client Registration</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Client applications register via POST /register with service_name and notification_types. 
                  System generates unique client_id and api_token, stores in MongoDB, and caches in Redis.
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  Storage: MongoDB (persistence) + Redis (fast lookups)
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <span className="font-bold">2</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Notification Request</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Clients send POST /notify with recipient_id, notification_type, channel, and content. 
                  System authenticates, validates payload, and checks user preferences.
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  Process: Auth → Validation → Preference Check → Queue
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <span className="font-bold">3</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">User Preferences</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Synchronous query to User Preference Service to check if user wants this notification type 
                  and channel. Preferences stored in MongoDB with Redis caching.
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  Data: Channel preferences + notification type filtering
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <span className="font-bold">4</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Message Queues</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Allowed notifications are published to appropriate Kafka topics (email, SMS, push). 
                  Separate topics enable independent scaling and fault isolation.
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  Technology: Kafka with topic-based channel separation
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <span className="font-bold">5</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Workers Processing</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Channel-specific workers consume Kafka messages, transform if needed, and send via 
                  third-party providers (SendGrid, Twilio, FCM/APNs).
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  Workers: email_worker, sms_worker, push_worker
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <span className="font-bold">6</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Delivery Logging</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  All delivery attempts are logged in PostgreSQL with status, timestamps, and retry counters. 
                  Provides audit trail and enables retry logic.
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  Status: sent, failed, retry_pending, delivered
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center text-white mr-3">
                    <span className="font-bold">7</span>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">Retry Handling</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">
                  Celery periodic tasks query PostgreSQL logs for failed notifications, retry sending 
                  with exponential backoff up to configured limits.
                </p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  Technology: Celery + PostgreSQL with automated scheduling
                </div>
              </div>

              {/* Retry System Details */}
              <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                <div className="flex items-center mb-4">
                  <AlertTriangle className="w-6 h-6 text-green-600 mr-3" />
                  <h4 className="text-lg font-semibold text-gray-900">Retry Strategy</h4>
                </div>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Clock className="w-4 h-4 text-green-600 mr-2" />
                    Exponential backoff: 1min → 5min → 15min → 1hr → 6hr
                  </li>
                  <li className="flex items-center">
                    <RefreshCw className="w-4 h-4 text-green-600 mr-2" />
                    Maximum 5 retry attempts per notification
                  </li>
                  <li className="flex items-center">
                    <Database className="w-4 h-4 text-green-600 mr-2" />
                    Dead letter queue for permanently failed messages
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Data Stores */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Data Layer Architecture
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {dataStores.map((store, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 mr-3">
                    {store.icon}
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">{store.title}</h4>
                </div>
                <p className="text-gray-600 text-sm mb-3">{store.description}</p>
                <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-2">
                  {store.usage}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Channels */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Delivery Channels
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deliveryChannels.map((channel, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
              >
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center text-white mr-3 group-hover:scale-110 transition-transform duration-200">
                    {channel.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900">{channel.title}</h4>
                    <p className="text-sm text-gray-500">{channel.provider}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {channel.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* System Metrics */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-8 text-center">
            System Capacity & Performance
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white">40M+</h4>
              <p className="text-blue-100">Daily Notifications</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white">1M</h4>
              <p className="text-blue-100">Client Services</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white">10K</h4>
              <p className="text-blue-100">Peak RPS</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h4 className="text-2xl font-bold text-white">99.9%</h4>
              <p className="text-blue-100">Uptime SLA</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;
