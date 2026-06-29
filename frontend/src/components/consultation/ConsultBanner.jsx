import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useScrollReveal, fadeInUp } from '../../hooks/useScrollReveal';
import { getWhatsAppUrl } from '../../utils/constants';
import BookingModal from './BookingModal';

const ConsultBanner = () => {
  const { ref, controls } = useScrollReveal();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <motion.section
        ref={ref}
        initial="hidden"
        animate={controls}
        variants={fadeInUp}
        className="py-12 sm:py-14 md:py-16 lg:py-20 relative overflow-hidden"
      >
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-brand-teal via-brand-teal-hover to-brand-navy" aria-hidden="true" />
        <div className="absolute inset-0 dot-grid opacity-10" aria-hidden="true" />

        <div className="max-w-container mx-auto px-4 md:px-8 text-center relative z-10">
          <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4" style={{ textWrap: 'balance' }}>
            Still confused? Book a free consultation now — Zero&nbsp;Charge, Zero&nbsp;Spam.
          </h2>
          <p className="text-white/60 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">
            Our experts will analyze your needs and recommend the best insurance plans within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => setBookingOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-brand-teal font-bold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Book a Free Call
            </button>
            <a
              href={getWhatsAppUrl('contact')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-brand-teal"
            >
              💬 Chat on WhatsApp
            </a>
          </div>
        </div>
      </motion.section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} source="cta-banner" />
    </>
  );
};

export default ConsultBanner;
