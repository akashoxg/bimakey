import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Award, Scale, Phone, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/shared/Breadcrumb';
import SectionHeader from '../components/shared/SectionHeader';
import BookingModal from '../components/consultation/BookingModal';
import { BRAND } from '../utils/constants';

const values = [
  { icon: Scale, title: 'Zero Commission', description: 'We never earn a single rupee from any insurance company. Our recommendations are 100% unbiased.' },
  { icon: ShieldCheck, title: 'Transparent Methodology', description: 'Every plan score is based on a published formula: Feature Rating + Insurer Rating + Premium Rating.' },
  { icon: Heart, title: 'Lifelong Claims Support', description: 'We don’t disappear after the sale. Our team helps you with claims, renewals, and policy changes — forever, for free.' },
  { icon: Award, title: 'Expert Advisors', description: 'Our team includes insurance professionals with up to 20 years of experience, including former claims managers.' },
];

const stats = [
  { value: '10,000+', label: 'Families Protected' },
  { value: '150+', label: 'Plans Analyzed' },
  { value: '4.7★', label: 'Google Rating' },
  { value: '₹0', label: 'Commission Earned' },
];

const About = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden bg-brand-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/website_background.jpg')" }} 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-0 z-0 bg-white/65 backdrop-blur-[2px]" 
          aria-hidden="true" 
        />
        <div 
          className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.80)_0%,rgba(255,255,255,0.40)_60%,transparent_100%)]" 
          aria-hidden="true" 
        />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-brand-white to-transparent z-0" aria-hidden="true" />
        <div className="absolute inset-0 dot-grid opacity-20 z-0" aria-hidden="true" />
        <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'About Us', href: '/about' }]} />
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-6">
              Insurance Advice You Can Actually Trust
            </h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed mb-8">
              {BRAND.name} exists because we believe every Indian family deserves honest, expert insurance guidance — without the hidden commissions and aggressive sales tactics that plague this industry.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setBookingOpen(true)}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-hover transition-colors shadow-sm"
              >
                <Phone className="w-5 h-5" aria-hidden="true" />
                Talk to an Expert
              </button>
              <Link
                to="/health-insurance/plans"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-gray-200 text-brand-navy font-semibold rounded-xl hover:bg-gray-50 transition-colors"
              >
                View Plan Rankings
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="font-data font-bold text-3xl md:text-4xl text-brand-navy mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-brand-text-secondary">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 md:py-28">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <SectionHeader
            eyebrow="Our Promise"
            title="Why We’re Different"
            subtitle="In an industry driven by commissions, we chose a different path."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-soft border border-gray-100 hover:shadow-card transition-shadow duration-300 group"
              >
                <div className="w-12 h-12 bg-brand-teal-light rounded-xl flex items-center justify-center mb-5 group-hover:bg-brand-teal transition-colors duration-300">
                  <value.icon className="w-6 h-6 text-brand-teal group-hover:text-white transition-colors duration-300" aria-hidden="true" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy mb-3">{value.title}</h3>
                <p className="text-brand-text-secondary leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-brand-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-dark" aria-hidden="true" />
        <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-display font-bold text-section-sm md:text-section text-white mb-6">
              Our Mission
            </h2>
            <div className="h-0.5 w-12 bg-gradient-to-r from-brand-teal to-brand-teal/30 mx-auto mb-6" aria-hidden="true" />
            <p className="text-white/60 text-xl leading-relaxed mb-8">
              To become India’s most trusted insurance advisory platform by providing every family with expert, unbiased guidance that puts their interests first — not insurers’ commissions.
            </p>
            <p className="text-white/40 leading-relaxed">
              We believe insurance is too important to be sold. It needs to be understood, compared, and chosen carefully. That’s why we built {BRAND.name} — a platform where transparency is not a feature, it’s the foundation.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28">
        <div className="max-w-container mx-auto px-4 md:px-8 text-center">
          <h2 className="font-display font-bold text-section-sm md:text-section text-brand-navy mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-brand-text-secondary text-lg mb-8 max-w-xl mx-auto">
            Book a free consultation with our experts. Zero charge, zero spam, zero commissions.
          </p>
          <button
            type="button"
            onClick={() => setBookingOpen(true)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-hover transition-colors shadow-lg shadow-brand-teal/15"
          >
            <Phone className="w-5 h-5" aria-hidden="true" />
            Book Free Consultation
          </button>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} source="about" />
    </motion.div>
  );
};

export default About;
