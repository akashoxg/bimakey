import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, MessageCircle, Shield, FileText, Car, Heart, Home, CheckCircle, Loader2, AlertCircle, Clock, FileCheck, Building } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/shared/Breadcrumb';
import { BRAND, getWhatsAppUrl } from '../utils/constants';
import { submitLead } from '../utils/api';

const claimTypes = [
  {
    value: 'health-claim',
    label: 'Health Insurance Claim',
    icon: Heart,
    description: 'Cashless or reimbursement claims for medical treatments',
    color: 'teal',
  },
  {
    value: 'motor-claim',
    label: 'Motor Insurance Claim',
    icon: Car,
    description: 'Accident damage, theft, or third-party claims',
    color: 'blue',
  },
  {
    value: 'life-claim',
    label: 'Life Insurance Claim',
    icon: Shield,
    description: 'Death claim or maturity benefits',
    color: 'navy',
  },
  {
    value: 'policy-issue',
    label: 'Policy Related Issue',
    icon: FileText,
    description: 'Policy cancellation, modification, or document requests',
    color: 'amber',
  },
  {
    value: 'renewal-help',
    label: 'Renewal Assistance',
    icon: Building,
    description: 'Help with policy renewal or porting',
    color: 'green',
  },
  {
    value: 'other',
    label: 'Other Query',
    icon: FileCheck,
    description: 'Any other insurance-related assistance',
    color: 'gray',
  },
];

const claimStatusOptions = [
  { value: 'not-started', label: 'Not Started Yet' },
  { value: 'in-progress', label: 'Claim In Progress' },
  { value: 'rejected', label: 'Claim Rejected' },
  { value: 'query', label: 'Just Have a Query' },
];

const callbackTimeOptions = [
  { value: 'morning', label: 'Morning (9 AM - 12 PM)' },
  { value: 'afternoon', label: 'Afternoon (12 PM - 4 PM)' },
  { value: 'evening', label: 'Evening (4 PM - 7 PM)' },
  { value: 'anytime', label: 'Anytime (9 AM - 7 PM)' },
];

const claimSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  claimType: z.string().min(1, 'Please select a claim type'),
  claimStatus: z.string().min(1, 'Please select claim status'),
  insurerName: z.string().optional(),
  policyNumber: z.string().optional(),
  callbackTime: z.string().min(1, 'Please select preferred callback time'),
  message: z.string().optional(),
  whatsappConsent: z.boolean().optional(),
});

const ClaimAssistance = () => {
  const [selectedClaimType, setSelectedClaimType] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState('');

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(claimSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      claimType: '',
      claimStatus: '',
      insurerName: '',
      policyNumber: '',
      callbackTime: '',
      message: '',
      whatsappConsent: true,
    },
  });

  const watchClaimType = watch('claimType');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsError(false);
    const result = await submitLead({ ...data, source: 'claim-assistance' });
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      toast.success('Callback requested! We\'ll contact you soon.');
    } else {
      setFallbackUrl(result.fallbackUrl);
      setIsError(true);
      toast.error('Server unavailable. Please reach us via WhatsApp.');
    }
  };

  const handleClaimTypeSelect = (type) => {
    setSelectedClaimType(type);
    setValue('claimType', type.value);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsError(false);
    setSelectedClaimType(null);
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-brand-teal-light/30 to-transparent">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Claim Assistance', href: '/claim-assistance' }]} />
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">
              Claim Assistance
            </h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed">
              Need help with an insurance claim? Our experts will guide you through the process, help with documentation, and ensure you get the support you deserve.
            </p>
          </div>
        </div>
      </section>

      {/* Claim Types Selection */}
      {!selectedClaimType && !isSuccess && !isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <h2 className="font-display font-bold text-2xl text-brand-navy mb-8 text-center">
              What type of assistance do you need?
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {claimTypes.map((type) => (
                <motion.button
                  key={type.value}
                  type="button"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleClaimTypeSelect(type)}
                  className={`text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                    type.color === 'teal' ? 'border-brand-teal/20 bg-brand-teal-light/20 hover:border-brand-teal hover:bg-brand-teal-light/30' :
                    type.color === 'blue' ? 'border-blue-200 bg-blue-50 hover:border-blue-400 hover:bg-blue-100' :
                    type.color === 'navy' ? 'border-brand-navy/20 bg-brand-navy/5 hover:border-brand-navy hover:bg-brand-navy/10' :
                    type.color === 'amber' ? 'border-amber-200 bg-amber-50 hover:border-amber-400 hover:bg-amber-100' :
                    type.color === 'green' ? 'border-green-200 bg-green-50 hover:border-green-400 hover:bg-green-100' :
                    'border-gray-200 bg-gray-50 hover:border-gray-400 hover:bg-gray-100'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                    type.color === 'teal' ? 'bg-brand-teal/20' :
                    type.color === 'blue' ? 'bg-blue-100' :
                    type.color === 'navy' ? 'bg-brand-navy/10' :
                    type.color === 'amber' ? 'bg-amber-100' :
                    type.color === 'green' ? 'bg-green-100' :
                    'bg-gray-100'
                  }`}>
                    <type.icon className={`w-6 h-6 ${
                      type.color === 'teal' ? 'text-brand-teal' :
                      type.color === 'blue' ? 'text-blue-600' :
                      type.color === 'navy' ? 'text-brand-navy' :
                      type.color === 'amber' ? 'text-amber-600' :
                      type.color === 'green' ? 'text-green-600' :
                      'text-gray-600'
                    }`} aria-hidden="true" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{type.label}</h3>
                  <p className="text-sm text-brand-text-secondary leading-relaxed">{type.description}</p>
                </motion.button>
              ))}
            </div>

            {/* Quick WhatsApp Option */}
            <div className="mt-12 text-center max-w-2xl mx-auto">
              <p className="text-brand-text-secondary mb-4">Need instant help?</p>
              <a
                href={getWhatsAppUrl('contact')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Chat on WhatsApp Now
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Callback Request Form */}
      {(selectedClaimType || isSuccess || isError) && !isSuccess && !isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="max-w-2xl mx-auto">
              {/* Selected Type Header */}
              <div className="bg-brand-teal-light/30 rounded-2xl p-6 mb-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand-teal/20 flex items-center justify-center">
                    {selectedClaimType && <selectedClaimType.icon className="w-6 h-6 text-brand-teal" />}
                  </div>
                  <div>
                    <p className="text-sm text-brand-text-secondary">Selected Assistance</p>
                    <p className="font-display font-bold text-brand-navy">{selectedClaimType?.label}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedClaimType(null)}
                  className="text-sm text-brand-teal hover:underline"
                >
                  Change
                </button>
              </div>

              {/* Form */}
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-brand-teal/10 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-xl text-brand-navy">Request a Callback</h2>
                    <p className="text-sm text-brand-text-secondary">Our expert will call you within 30 minutes</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                  {/* Name */}
                  <div>
                    <label htmlFor="claim-name" className="block text-sm font-medium text-brand-navy mb-1.5">
                      Full Name <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="claim-name"
                      type="text"
                      placeholder="Your full name…"
                      autoComplete="name"
                      {...register('name')}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.name ? 'border-brand-red' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
                    />
                    {errors.name && <p className="text-xs text-brand-red mt-1">{errors.name.message}</p>}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="claim-phone" className="block text-sm font-medium text-brand-navy mb-1.5">
                      Phone Number <span className="text-brand-red">*</span>
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-brand-text-secondary font-data">
                        +91
                      </span>
                      <input
                        id="claim-phone"
                        type="tel"
                        placeholder="98765 43210…"
                        inputMode="numeric"
                        autoComplete="tel"
                        {...register('phone')}
                        className={`flex-1 px-4 py-3 rounded-r-xl border ${
                          errors.phone ? 'border-brand-red' : 'border-gray-200'
                        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
                      />
                    </div>
                    {errors.phone && <p className="text-xs text-brand-red mt-1">{errors.phone.message}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="claim-email" className="block text-sm font-medium text-brand-navy mb-1.5">
                      Email Address <span className="text-brand-red">*</span>
                    </label>
                    <input
                      id="claim-email"
                      type="email"
                      placeholder="you@email.com…"
                      autoComplete="email"
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.email ? 'border-brand-red' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm`}
                    />
                    {errors.email && <p className="text-xs text-brand-red mt-1">{errors.email.message}</p>}
                  </div>

                  {/* Claim Status */}
                  <div>
                    <label htmlFor="claim-status" className="block text-sm font-medium text-brand-navy mb-1.5">
                      Claim Status <span className="text-brand-red">*</span>
                    </label>
                    <select
                      id="claim-status"
                      {...register('claimStatus')}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.claimStatus ? 'border-brand-red' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
                    >
                      <option value="">Select status…</option>
                      {claimStatusOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.claimStatus && <p className="text-xs text-brand-red mt-1">{errors.claimStatus.message}</p>}
                  </div>

                  {/* Policy Details Row */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Insurer Name */}
                    <div>
                      <label htmlFor="claim-insurer" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Insurance Company <span className="text-brand-text-secondary">(optional)</span>
                      </label>
                      <input
                        id="claim-insurer"
                        type="text"
                        placeholder="e.g., HDFC Ergo…"
                        {...register('insurerName')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
                      />
                    </div>

                    {/* Policy Number */}
                    <div>
                      <label htmlFor="claim-policy" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Policy Number <span className="text-brand-text-secondary">(optional)</span>
                      </label>
                      <input
                        id="claim-policy"
                        type="text"
                        placeholder="e.g., HDFC/123456…"
                        {...register('policyNumber')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  {/* Callback Time */}
                  <div>
                    <label htmlFor="claim-callback" className="block text-sm font-medium text-brand-navy mb-1.5">
                      Preferred Callback Time <span className="text-brand-red">*</span>
                    </label>
                    <select
                      id="claim-callback"
                      {...register('callbackTime')}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.callbackTime ? 'border-brand-red' : 'border-gray-200'
                      } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white`}
                    >
                      <option value="">Select time…</option>
                      {callbackTimeOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    {errors.callbackTime && <p className="text-xs text-brand-red mt-1">{errors.callbackTime.message}</p>}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="claim-message" className="block text-sm font-medium text-brand-navy mb-1.5">
                      Describe Your Issue <span className="text-brand-text-secondary">(optional)</span>
                    </label>
                    <textarea
                      id="claim-message"
                      rows={4}
                      placeholder="Tell us briefly about your claim issue and how we can help…"
                      {...register('message')}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none"
                    />
                  </div>

                  {/* WhatsApp Consent */}
                  <div className="flex items-start gap-3">
                    <input
                      id="claim-whatsapp"
                      type="checkbox"
                      {...register('whatsappConsent')}
                      className="mt-1 w-4 h-4 text-brand-teal rounded border-gray-300 focus:ring-brand-teal"
                    />
                    <label htmlFor="claim-whatsapp" className="text-xs text-brand-text-secondary cursor-pointer">
                      I agree to be contacted via WhatsApp for updates on my claim assistance request
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-hover transition-colors disabled:opacity-70 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Phone className="w-4 h-4" />
                        Request Callback
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Success State */}
      {isSuccess && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="max-w-lg mx-auto text-center py-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-10 h-10 text-brand-teal" />
              </motion.div>
              <h2 className="font-display font-bold text-3xl text-brand-navy mb-4">
                Callback Requested!
              </h2>
              <p className="text-brand-text-secondary text-lg mb-8">
                Our claim expert will call you within 30 minutes during business hours. You can also reach us directly on WhatsApp for instant help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={getWhatsAppUrl('contact')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Submit Another Request
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Error State */}
      {isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="max-w-lg mx-auto text-center py-12">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertCircle className="w-10 h-10 text-red-600" />
              </div>
              <h2 className="font-display font-bold text-3xl text-brand-navy mb-4">
                Server Temporarily Offline
              </h2>
              <p className="text-brand-text-secondary text-lg mb-8">
                Don't worry! Reach us on WhatsApp for instant claim assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href={fallbackUrl || getWhatsAppUrl('contact')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Continue on WhatsApp
                </a>
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Info Section */}
      {!selectedClaimType && !isSuccess && !isError && (
        <section className="pb-20 md:pb-28">
          <div className="max-w-container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                {
                  icon: Clock,
                  title: 'Quick Response',
                  description: 'Get callback within 30 minutes during business hours',
                },
                {
                  icon: Shield,
                  title: 'Expert Guidance',
                  description: 'Our team includes former claims managers from top insurers',
                },
                {
                  icon: Heart,
                  title: 'Lifelong Support',
                  description: 'Claims support is free, forever — even after policy ends',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="text-center p-6 bg-white rounded-2xl shadow-soft border border-gray-100"
                >
                  <div className="w-14 h-14 bg-brand-teal-light rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-brand-teal" />
                  </div>
                  <h3 className="font-display font-bold text-lg text-brand-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </motion.div>
  );
};

export default ClaimAssistance;
