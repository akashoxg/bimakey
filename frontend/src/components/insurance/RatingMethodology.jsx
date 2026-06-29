import { motion } from 'framer-motion';
import { useScrollReveal, staggerContainer, fadeInUp } from '../../hooks/useScrollReveal';
import SectionHeader from '../shared/SectionHeader';
import { Target, Scale, Calculator } from 'lucide-react';

const iconMap = {
  'Feature Rating': Target,
  'Insurer Rating': Scale,
  'Premium Rating': Calculator,
};

const RatingMethodology = ({ methodology }) => {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-20 bg-gray-50 border-y border-gray-200">
      <div className="max-w-container mx-auto px-4 md:px-8">
        <SectionHeader
          eyebrow="Transparent Scoring"
          title="How We Rate Plans"
          subtitle="Our proprietary algorithm evaluates every plan across 100+ parameters to give you a single, unbiased score."
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {methodology.criteria.map((item) => {
            const Icon = iconMap[item.name] || Target;
            
            return (
              <motion.div
                key={item.name}
                variants={fadeInUp}
                className="bg-white rounded-2xl p-8 shadow-card border border-gray-100 relative overflow-hidden group"
              >
                {/* Decorative background weight indicator */}
                <div 
                  className={`absolute -right-6 -top-6 w-32 h-32 rounded-full opacity-5 group-hover:scale-150 transition-transform duration-500 bg-brand-${item.color}`} 
                  aria-hidden="true" 
                />

                <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-${item.color}-50 text-brand-${item.color}`}>
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>

                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-bold text-xl text-brand-navy">
                    {item.name}
                  </h3>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold bg-${item.color}-50 text-brand-${item.color}`}>
                    {item.weight}% Weight
                  </div>
                </div>

                <p className="text-brand-text-secondary text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default RatingMethodology;
