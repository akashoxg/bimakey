import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { INSURANCE_TYPES, getWhatsAppUrl } from '../../utils/constants';
import { submitLead } from '../../utils/api';

const bookingSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[6-9]\d{9}$/, 'Enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Enter a valid email address'),
  insuranceType: z.string().min(1, 'Please select an insurance type'),
  message: z.string().optional(),
  whatsappConsent: z.boolean().optional(),
});

const BookingModal = ({ isOpen, onClose, source = 'navbar' }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [fallbackUrl, setFallbackUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      insuranceType: '',
      message: '',
      whatsappConsent: true,
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setIsError(false);
    const result = await submitLead({ ...data, source });
    setIsSubmitting(false);

    if (result.success) {
      console.log('Lead submitted successfully:', { ...data, source });
      setIsSuccess(true);
      toast.success('Consultation booked successfully!');
    } else {
      setFallbackUrl(result.fallbackUrl);
      setIsError(true);
      toast.error('Server unavailable. Please connect via WhatsApp.');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    setIsError(false);
    reset();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-0 pointer-events-none">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto pointer-events-auto"
              role="dialog"
              aria-modal="true"
              aria-label="Book a free consultation"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-border">
                <div>
                  <h2 className="font-display font-bold text-xl text-brand-navy">
                    Book Free Consultation
                  </h2>
                  <p className="text-sm text-brand-text-secondary mt-1">
                    We&apos;ll call you within 24 hours
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <div className="p-6">
                {isError ? (
                  /* Error / Fallback State */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <AlertCircle className="w-8 h-8 text-red-600" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-navy mb-2">
                      Server Temporarily Offline
                    </h3>
                    <p className="text-brand-text-secondary mb-6">
                      Don&apos;t worry! You can instantly chat with our expert advisor on WhatsApp with your request pre-filled.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={fallbackUrl || getWhatsAppUrl('contact')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        💬 Continue on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                ) : isSuccess ? (
                  /* Success State */
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 bg-brand-teal-light rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-brand-teal" aria-hidden="true" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-brand-navy mb-2">
                      Consultation Booked!
                    </h3>
                    <p className="text-brand-text-secondary mb-6">
                      Our expert will reach out to you within 24 hours. You can also reach us directly on WhatsApp.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <a
                        href={getWhatsAppUrl('contact')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl font-semibold hover:bg-green-600 transition-colors focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                      >
                        💬 Chat on WhatsApp
                      </a>
                      <button
                        type="button"
                        onClick={handleClose}
                        className="px-6 py-3 border-2 border-brand-border text-brand-navy rounded-xl font-semibold hover:bg-gray-50 transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
                      >
                        Close
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  /* Form */
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                    {/* Name */}
                    <div>
                      <label htmlFor="booking-name" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Full Name <span className="text-brand-red">*</span>
                      </label>
                      <input
                        id="booking-name"
                        type="text"
                        placeholder="Akash Kumar…"
                        autoComplete="name"
                        {...register('name')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.name ? 'border-brand-red' : 'border-brand-border'
                        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm transition-shadow`}
                      />
                      {errors.name && (
                        <p className="text-xs text-brand-red mt-1" role="alert">{errors.name.message}</p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label htmlFor="booking-phone" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Phone Number <span className="text-brand-red">*</span>
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-3 py-3 bg-gray-50 border border-r-0 border-brand-border rounded-l-xl text-sm text-brand-text-secondary">
                          +91
                        </span>
                        <input
                          id="booking-phone"
                          type="tel"
                          placeholder="98765 43210…"
                          inputMode="numeric"
                          autoComplete="tel"
                          {...register('phone')}
                          className={`flex-1 px-4 py-3 rounded-r-xl border ${
                            errors.phone ? 'border-brand-red' : 'border-brand-border'
                          } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm transition-shadow`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="text-xs text-brand-red mt-1" role="alert">{errors.phone.message}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="booking-email" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Email Address <span className="text-brand-red">*</span>
                      </label>
                      <input
                        id="booking-email"
                        type="email"
                        placeholder="akash@email.com…"
                        autoComplete="email"
                        spellCheck={false}
                        {...register('email')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.email ? 'border-brand-red' : 'border-brand-border'
                        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm transition-shadow`}
                      />
                      {errors.email && (
                        <p className="text-xs text-brand-red mt-1" role="alert">{errors.email.message}</p>
                      )}
                    </div>

                    {/* Insurance Type */}
                    <div>
                      <label htmlFor="booking-type" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Insurance Type <span className="text-brand-red">*</span>
                      </label>
                      <select
                        id="booking-type"
                        {...register('insuranceType')}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.insuranceType ? 'border-brand-red' : 'border-brand-border'
                        } focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm bg-white transition-shadow`}
                      >
                        <option value="">Select type…</option>
                        {INSURANCE_TYPES.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      {errors.insuranceType && (
                        <p className="text-xs text-brand-red mt-1" role="alert">{errors.insuranceType.message}</p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="booking-message" className="block text-sm font-medium text-brand-navy mb-1.5">
                        Your Query <span className="text-brand-text-secondary">(optional)</span>
                      </label>
                      <textarea
                        id="booking-message"
                        rows={3}
                        placeholder="Tell us about your requirements…"
                        {...register('message')}
                        className="w-full px-4 py-3 rounded-xl border border-brand-border focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm resize-none transition-shadow"
                      />
                    </div>

                    {/* WhatsApp Consent */}
                    <div className="flex items-start gap-3">
                      <input
                        id="booking-whatsapp"
                        type="checkbox"
                        {...register('whatsappConsent')}
                        className="mt-1 w-4 h-4 text-brand-teal rounded border-brand-border focus:ring-brand-teal"
                      />
                      <label htmlFor="booking-whatsapp" className="text-xs text-brand-text-secondary cursor-pointer">
                        I agree to be contacted via WhatsApp for consultation updates
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
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
