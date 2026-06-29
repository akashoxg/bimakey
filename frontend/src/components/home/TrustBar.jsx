import { motion } from 'framer-motion';
import { Star, Shield, TrendingUp, Sparkles, HeartHandshake } from 'lucide-react';

const trustItems = [
  { icon: TrendingUp, label: '10,000+', suffix: 'Families Protected' },
  { icon: Star, label: '4.7★', suffix: 'Google Rating' },
  { icon: Shield, label: '150+', suffix: 'Plans Compared' },
  { icon: Sparkles, label: '0%', suffix: 'Commission' },
  { icon: HeartHandshake, label: 'Lifelong', suffix: 'Claims Support' },
];

// Duplicate for seamless marquee loop
const marqueeItems = [...trustItems, ...trustItems];

const TrustBar = () => {
  return (
    <section className="py-5 bg-white border-y border-brand-border/50 overflow-hidden">
      <motion.div
        className="marquee-container"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-12 animate-marquee w-max will-change-transform">
          {marqueeItems.map((item, index) => (
            <div key={index} className="flex items-center gap-3 whitespace-nowrap select-none">
              <item.icon className="w-4 h-4 text-brand-teal flex-shrink-0" aria-hidden="true" />
              <span className="font-data font-bold text-brand-navy text-sm">{item.label}</span>
              <span className="text-brand-text-secondary text-sm font-body">{item.suffix}</span>
              {index < marqueeItems.length - 1 && (
                <span className="text-brand-border mx-4 text-lg" aria-hidden="true">·</span>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default TrustBar;
