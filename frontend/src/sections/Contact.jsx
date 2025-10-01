import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { socialLinks } from '../utils/mock';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { useToast } from '../hooks/use-toast';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter a valid email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message must be at least 10 characters.';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(`${API}/contact`, formData);
      
      if (response.data.success) {
        toast({
          title: "Message sent!",
          description: response.data.message,
          duration: 5000,
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.response?.data?.detail || "Message failed to send. Try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: socialLinks.email,
      href: `mailto:${socialLinks.email}`
    },
    {
      icon: Phone,
      label: 'Phone',
      value: socialLinks.phone,
      href: `tel:${socialLinks.phone}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chengalpattu, Tamil Nadu, India',
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">Get In Touch</h2>
          <div className="w-24 h-1 bg-cyan-500 mx-auto rounded-full mb-6" />
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Interested in collaboration or have a question? I'd love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-slate-800/50 backdrop-blur-sm border-slate-700 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const Icon = info.icon;
                  return (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-400 mb-1">{info.label}</p>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="text-white hover:text-cyan-400 transition-colors duration-200 font-medium"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="text-white font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border-cyan-500/30 p-6 text-center">
              <p className="text-cyan-400 font-semibold mb-2">Response Time</p>
              <p className="text-white text-lg">Within 48 hours</p>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="lg:col-span-3 bg-slate-800/50 backdrop-blur-sm border-slate-700 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Name <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-500 ${
                      errors.name ? 'border-red-500' : ''
                    }`}
                    placeholder="Your name"
                    aria-label="Name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-500 ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                    placeholder="your.email@example.com"
                    aria-label="Email"
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                  Subject (optional)
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  value={formData.subject}
                  onChange={handleChange}
                  className="bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-500"
                  placeholder="What's this about?"
                  aria-label="Subject"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                  Message <span className="text-red-400">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`bg-slate-700/50 border-slate-600 text-white placeholder:text-gray-500 focus:border-cyan-500 resize-none ${
                    errors.message ? 'border-red-500' : ''
                  }`}
                  placeholder="Your message..."
                  aria-label="Message"
                />
                {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-6 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;