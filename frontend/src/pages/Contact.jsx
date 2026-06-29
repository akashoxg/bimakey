import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import Breadcrumb from '../components/shared/Breadcrumb';
import { BRAND, INSURANCE_TYPES, getWhatsAppUrl } from '../utils/constants';
import { submitLead } from '../utils/api';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  insuranceType: z.string().min(1, 'Please select an insurance type'),
  message: z.string().optional(),
  whatsappConsent: z.boolean().optional(),
});

const contactInfo = [
  { icon: Phone, label: 'Call Us', value: BRAND.phone, href: `tel:${BRAND.phone}`, description: 'Speak directly with an expert advisor' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: getWhatsAppUrl('contact'), description: 'Quick online advisory replies' },
  { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}`, description: 'We respond within 24 hours' },
  { icon: MapPin, label: 'Operating Base', value: BRAND.address, href: null, description: '100% Online Platform across India' },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '', phone: '', email: '', insuranceType: '', message: '', whatsappConsent: true,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsError(false);
    const result = await submitLead({ ...data, source: 'contact-page' });
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      toast.success('Consultation booked successfully!');
    } else {
      setFallbackUrl(result.fallbackUrl);
      setIsError(true);
      toast.error('Server unavailable. Please connect via WhatsApp.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-24 pb-8 sm:pt-28 md:pt-36 sm:pb-12 md:pb-16 bg-gradient-to-b from-brand-teal-light/30 to-transparent">
        <div className="max-w-container mx-auto px-4 sm:px-6 md:px-8">
          <Breadcrumb items={[{ label: 'Contact Us', href: '/contact-us' }]} />
          <h1 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-brand-navy mb-3 sm:mb-4">
            Get in Touch
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-brand-text-secondary max-w-2xl leading-relaxed">
            Book a free consultation with our insurance experts. We'll help you find the right plan in under 30 minutes.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="pb-12 md:pb-20">
        <div className="max-w-container mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 xl:gap-16">
            {/* Left — Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="font-display font-bold text-2xl text-brand-navy mb-6">
                Reach Us Directly
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item) => {
                  const Wrapper = item.href ? 'a' : 'div';
                  const wrapperProps = item.href ? {
                    href: item.href,
                    target: item.href.startsWith('http') ? '_blank' : undefined,
                    rel: item.href.startsWith('http') ? 'noopener noreferrer' : undefined,
                  } : {};

                  return (
                    <Wrapper
                      key={item.label}
                      {...wrapperProps}
                      className={`flex items-start gap-4 p-4 rounded-xl border border-gray-100 bg-white ${item.href ? 'hover:border-brand-teal/20 hover:shadow-soft transition-[border-color,box-shadow] duration-200 cursor-pointer' : ''} group`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-brand-teal-light flex items-center justify-center flex-shrink-0 group-hover:bg-brand-teal transition-colors duration-200">
                        <item.icon className="w-5 h-5 text-brand-teal group-hover:text-white transition-colors duration-200" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-brand-text-secondary mb-0.5">{item.label}</p>
                        <p className="font-semibold text-brand-navy text-sm">{item.value}</p>
                        <p className="text-xs text-brand-text-secondary mt-0.5">{item.description}</p>
                      </div>
                    </Wrapper>
                  );
                })}
              </div>

              {/* Online Platform Badge */}
              <div className="mt-6 sm:mt-8 rounded-2xl overflow-hidden border border-brand-teal/20 bg-brand-teal-light/30 p-5 sm:p-6 flex items-start sm:items-center gap-4 text-brand-navy">
                <div className="w-10 h-10 sm:w-12 rounded-xl bg-brand-teal flex items-center justify-center text-white shrink-0">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base">Operating from {BRAND.address}</h4>
                  <p className="text-xs text-brand-text-secondary mt-0.5">Delivering 100% unbiased advisory and lifelong claims support across India.</p>
                </div>
              </div>
            </div>

            {/* Right — Booking Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-5 sm:p-6 md:p-8 lg:p-10">
                <h2 className="font-display font-bold text-2xl text-brand-navy mb-2">
                  Book Free Consultation
                </h2>
                <p className="text-brand-text-secondary mb-8">
                  Fill in your details and we’ll call you within 24 hours.
                </p>

                {isError ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-navy mb-2">Server Temporarily Offline</h3>
                    <p className="text-brand-text-secondary mb-6">
                      Don&rsquo;t worry! You can instantly chat with our expert advisor on WhatsApp with your request pre-filled.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={fallbackUrl || getWhatsAppUrl('contact')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                      >
                        💬 Continue on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => { setIsError(false); reset(); }}
                        className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Try Again
                      </button>
                    </div>
                  </motion.div>
                ) : isSuccess ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-brand-teal" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-navy mb-2">Consultation Booked!</h3>
                    <p className="text-brand-text-secondary mb-6">
                      Our expert will reach out within 24 hours. You can also reach us on WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={getWhatsAppUrl('contact')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors"
                      >
                        💬 Chat on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={() => { setIsSuccess(false); reset(); }}
                        className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                      >
                        Submit Another
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-sm font-medium text-brand-navy mb-1.5">
                          Full Name <span className="text-brand-red">*</span>
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          placeholder="Your full name…"
                          autoComplete="name"
                          {...register('name')}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-brand-red' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm transition-shadow`}
                        />
                        {errors.name && <p className="text-xs text-brand-red mt-1" role="alert">{errors.name.message}</p>}
                      </div>

                      {/* Phone */}
                      <div>
                        <label htmlFor="contact-phone" className="block text-sm font-medium text-brand-navy mb-1.5">
                          Phone Number <span className="text-brand-red">*</span>
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-xl text-sm text-brand-text-secondary font-data">
                            +91
                          </span>
                          <input
                            id="contact-phone"
                            type="tel"
                            placeholder="98765 43210…"
                            inputMode="numeric"
                            autoComplete="tel"
                            {...register('phone')}
                            className={`flex-1 px-4 py-3 rounded-r-xl border ${errors.phone ? 'border-brand-red' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm transition-shadow`}
                          />
                        </div>
                        {errors.phone && <p className="text-xs text-brand-red mt-1" role="alert">{errors.phone.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-sm font-medium text-brand-navy mb-1.5">
                          Email Address <span className="text-brand-red">*</span>
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          placeholder="you@email.com…"
                          autoComplete="email"
                          {...register('email')}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.email ? 'border-brand-red' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm transition-shadow`}
                        />
                        {errors.email && <p className="text-xs text-brand-red mt-1" role="alert">{errors.email.message}</p>}
                      </div>

                      {/* Insurance Type */}
                      <div>
                        <label htmlFor="contact-type" className="block text-sm font-medium text-brand-navy mb-1.5">
                          Insurance Type <span className="text-brand-red">*</span>
                        </label>
                        <select
                          id="contact-type"
                          {...register('insuranceType')}
                          className={`w-full px-4 py-3 rounded-xl border ${errors.insuranceType ? 'border-brand-red' : 'border-gray-200'} focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white transition-shadow`}
                        >
                          <option value="">Select type…</option>
                          {INSURANCE_TYPES.map((type) => (
                            <option key={type.value} value={type.value}>{type.label}</option>
                          ))}
                        </select>
                        {errors.insuranceType && <p className="text-xs text-brand-red mt-1" role="alert">{errors.insuranceType.message}</p>}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Your Query <span className="text-brand-text-secondary">(optional)</span>
                      </label>
                      <textarea
                        id="contact-message"
                        rows={4}
                        placeholder="Tell us about your requirements…"
                        {...register('message')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none transition-shadow"
                      />
                    </div>

                    {/* WhatsApp Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        id="contact-whatsapp"
                        type="checkbox"
                        {...register('whatsappConsent')}
                        className="mt-1 w-4 h-4 text-brand-teal rounded border-gray-300 focus:ring-brand-teal"
                      />
                      <label htmlFor="contact-whatsapp" className="text-xs text-brand-text-secondary cursor-pointer">
                        I agree to be contacted via WhatsApp for consultation updates
                      </label>
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-hover transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 shadow-sm"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          Booking…
                        </>
                      ) : (
                        <>
                          <Phone className="w-4 h-4" aria-hidden="true" />
                          Book Free Consultation
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
