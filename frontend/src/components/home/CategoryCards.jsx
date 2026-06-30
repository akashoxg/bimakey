import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Shield, Car, ArrowRight } from 'lucide-react';
import { useScrollReveal, staggerContainer, fadeInUp } from '../../hooks/useScrollReveal';
import SectionHeader from '../shared/SectionHeader';

const categories = [
  {
    id: 'health',
    title: 'Health Insurance',
    description: 'Comprehensive coverage for medical emergencies, hospitalization, and day-care procedures.',
    icon: HeartPulse,
    accentClass: 'accent-health',
    iconBg: 'bg-rose-50',
    iconColor: 'text-rose-500',
    hoverShadow: 'hover:shadow-[0_12px_40px_rgba(225,29,72,0.1)]',
    href: '/health-insurance',
    stat: '30+ plans ranked',
    features: ['No room rent limits', 'Unlimited restoration', 'Cashless everywhere'],
  },
  {
    id: 'term',
    title: 'Term Life Insurance',
    description: 'High life cover at low premiums to secure your family’s financial future in your absence.',
    icon: Shield,
    accentClass: 'accent-term',
    iconBg: 'bg-blue-50',
    iconColor: 'text-blue-500',
    hoverShadow: 'hover:shadow-[0_12px_40px_rgba(37,99,235,0.1)]',
    href: '/life-insurance',
    stat: 'Up to ₹2 Cr cover',
    features: ['Critical illness rider', 'Return of premium', 'Flexible payout'],
  },
  {
    id: 'motor',
    title: 'Motor Insurance',
    description: 'Protect your car or two-wheeler against accidents, theft, and third-party liabilities.',
    icon: Car,
    accentClass: 'accent-motor',
    iconBg: 'bg-emerald-50',
    iconColor: 'text-emerald-500',
    hoverShadow: 'hover:shadow-[0_12px_40px_rgba(5,150,105,0.1)]',
    href: '/motor-insurance',
    stat: 'Zero depreciation',
    features: ['24/7 Roadside assist', 'Engine protection', 'Quick claim settlement'],
  },
];

const CategoryCards = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-20 md:py-28 bg-brand-white">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <SectionHeader
          eyebrow="Our Categories"
          title="Insurance Made Simple"
          subtitle="Explore our thoroughly researched categories to find the perfect plan for your specific needs."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={fadeInUp}>
              <Link
                to={category.href}
                className={`block h-full bg-white rounded-2xl p-8 shadow-soft ${category.hoverShadow} ${category.accentClass} transition-[box-shadow,transform,border-color] duration-300 group focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 outline-none hover:-translate-y-1`}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-12 h-12 sm:w-14 rounded-xl ${category.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className={`w-6 h-6 sm:w-7 sm:h-7 ${category.iconColor}`} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-data font-semibold text-brand-text-secondary bg-gray-50 px-3 py-1.5 rounded-full">
                    {category.stat}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl text-brand-navy mb-3">
                  {category.title}
                </h3>

                <p className="text-brand-text-secondary mb-6 line-clamp-3">
                  {category.description}
                </p>

                <ul className="space-y-2.5 mb-8" role="list">
                  {category.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-brand-navy font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-teal flex-shrink-0" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="flex items-center gap-2 text-brand-teal font-semibold group-hover:gap-3 transition-all duration-300">
                  <span>Compare Plans</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryCards;
