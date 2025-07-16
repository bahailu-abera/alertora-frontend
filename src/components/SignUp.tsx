import React, { useState } from 'react';
import { ArrowRight, Plus, X, Check } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    serviceName: '',
    notificationTypes: [{ name: '', description: '' }]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [credentials, setCredentials] = useState<{ client_id: string; api_key: string } | null>(null);

  const addNotificationType = () => {
    setFormData({
      ...formData,
      notificationTypes: [...formData.notificationTypes, { name: '', description: '' }]
    });
  };

  const removeNotificationType = (index: number) => {
    const newTypes = formData.notificationTypes.filter((_, i) => i !== index);
    setFormData({ ...formData, notificationTypes: newTypes });
  };

  const updateNotificationType = (index: number, field: 'name' | 'description', value: string) => {
    const newTypes = [...formData.notificationTypes];
    newTypes[index][field] = value;
    setFormData({ ...formData, notificationTypes: newTypes });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.alertora.addisalem.xyz/api/v1/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          service_name: formData.serviceName,
          notification_types: formData.notificationTypes
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to register');
      }

      setCredentials({ client_id: data.client_id, api_key: data.api_key });
      setShowSuccess(true);
    } catch (error: any) {
      alert(error.message || 'There was an error. Please try again.');
    }

    setIsSubmitting(false);
  };

  if (showSuccess && credentials) {
    return (
      <section id="signup" className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">You're all set! ✅</h2>
            <p className="text-lg text-gray-600 mb-8">Here are your API credentials:</p>

            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-500">Client ID</label>
                  <div className="font-mono text-sm bg-white p-3 rounded border mt-1">{credentials.client_id}</div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-500">API Key</label>
                  <div className="font-mono text-sm bg-white p-3 rounded border mt-1">{credentials.api_key}</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#docs"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
              >
                Start Building
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="signup" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Create your Alertora account</h2>
          <p className="text-xl text-gray-600">
            Register your service and get API keys instantly. Free forever for devs.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Name *</label>
              <input
                type="text"
                required
                value={formData.serviceName}
                onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g. MyApp"
              />
            </div>

            {/* Notification Types */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Notification Types</h3>
                <button
                  type="button"
                  onClick={addNotificationType}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add</span>
                </button>
              </div>

              {formData.notificationTypes.map((type, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium text-gray-600">Type {index + 1}</span>
                    {formData.notificationTypes.length > 1 && (
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
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Notification Type Name</label>
                    <input
                      type="text"
                      required
                      value={type.name}
                      onChange={(e) => updateNotificationType(index, 'name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="e.g. promo"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-1 block">Notification Description</label>
                    <input
                      type="text"
                      required
                      value={type.description}
                      onChange={(e) => updateNotificationType(index, 'description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded"
                      placeholder="e.g. Promotional offers and discounts"
                    />
                  </div>
                </div>
              ))}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Registering...</span>
                </>
              ) : (
                <>
                  <span>Register & Get API Keys</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>

            <p className="text-xs text-gray-500 text-center">
              By registering, you agree to our Terms & Privacy Policy.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
