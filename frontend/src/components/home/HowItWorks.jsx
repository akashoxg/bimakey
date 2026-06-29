import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, PhoneCall, ShieldCheck, HeartHandshake, Phone } from 'lucide-react';
import { useScrollReveal, fadeInUp } from '../../hooks/useScrollReveal';
import SectionHeader from '../shared/SectionHeader';
import BookingModal from '../consultation/BookingModal';
import { BRAND } from '../../utils/constants';

const steps = [
  {
    icon: Search,
    title: 'Compare & Shortlist',
    description: 'Use our transparent methodology to compare plans across 100+ parameters and shortlist the best fits for your specific situation.',
  },
  {
    icon: PhoneCall,
    title: 'Expert Consultation',
    description: 'Schedule a free 30-minute call with our unbiased advisors to clarify doubts and finalize your ideal plan.',
  },
  {
    icon: ShieldCheck,
    title: 'Zero Spam Purchase',
    description: 'Buy directly from the insurer via our platform. We never sell your data or make unsolicited calls.',
  },
  {
    icon: HeartHandshake,
    title: 'Lifelong Claims Support',
    description: 'Need to file a claim? Our dedicated team will guide you through the entire process, completely free.',
  },
];

const HowItWorks = () => {
  const { ref, controls } = useScrollReveal();
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="py-14 sm:py-16 md:py-20 lg:py-28 bg-gray-50/80 border-y border-gray-100">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow="The Process"
            title={`How ${BRAND.name} Works`}
            subtitle="A simple, transparent, and completely unbiased approach to securing your family’s future."
          />

          {/* Desktop: Vertical Timeline */}
          <motion.div
            ref={ref}
            initial="hidden"
            animate={controls}
            variants={fadeInUp}
            className="relative max-w-4xl mx-auto"
          >
            {/* Center timeline line — desktop only */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand-teal/20 via-brand-teal/40 to-brand-teal/20 -translate-x-px" aria-hidden="true" />

            <div className="space-y-8 md:space-y-0">
              {steps.map((step, index) => {
                const isLeft = index % 2 === 0;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative md:flex md:items-center md:gap-0 ${
                      isLeft ? '' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content card */}
                    <div className={`md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-0' : 'md:pl-0'}`}>
                      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-soft hover:shadow-card transition-shadow duration-300 border border-gray-100 group">
                        <div className="flex items-start gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-brand-teal-light group-hover:bg-brand-teal transition-colors duration-300">
                            <step.icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand-teal group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <h3 className="font-display font-bold text-lg sm:text-xl text-brand-navy mb-1.5 sm:mb-2">
                              {step.title}
                            </h3>
                            <p className="text-brand-text-secondary leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Center dot — desktop only */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-2 border-brand-teal items-center justify-center z-10 shadow-sm">
                      <span className="font-data font-bold text-sm text-brand-teal">{index + 1}</span>
                    </div>

                    {/* Spacer for other side */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </motion.div>
                );
              })}
            </div>

            {/* CTA after timeline */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="mt-8 sm:mt-10 md:mt-12 text-center"
            >
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-hover transition-colors duration-200 shadow-lg shadow-brand-teal/15 focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Start Your Journey
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} source="how-it-works" />
    </>
  );
};

export default HowItWorks;
