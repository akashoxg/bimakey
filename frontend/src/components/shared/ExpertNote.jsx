import { motion } from 'framer-motion';
import { Lightbulb, AlertTriangle, Info } from 'lucide-react';

/**
 * Expert Note Callout component for highlighting important information
 * Used throughout content pages for expert insights
 */
const ExpertNote = ({ 
  type = 'info', // 'info' | 'tip' | 'warning'
  title,
  children,
  className = ''
}) => {
  const variants = {
    info: {
      bg: 'bg-brand-teal-light/50',
      border: 'border-l-brand-teal',
      icon: Info,
      iconColor: 'text-brand-teal',
      titleColor: 'text-brand-teal',
    },
    tip: {
      bg: 'bg-amber-50/50',
      border: 'border-l-brand-amber',
      icon: Lightbulb,
      iconColor: 'text-brand-amber',
      titleColor: 'text-brand-amber',
    },
    warning: {
      bg: 'bg-red-50/50',
      border: 'border-l-brand-red',
      icon: AlertTriangle,
      iconColor: 'text-brand-red',
      titleColor: 'text-brand-red',
    },
  };

  const variant = variants[type] || variants.info;
  const Icon = variant.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${variant.bg} border-l-4 ${variant.border} rounded-r-xl p-5 my-6 ${className}`}
      role="note"
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 mt-0.5 ${variant.iconColor}`}>
          <Icon className="w-5 h-5" aria-hidden="true" />
        </div>
        <div className="flex-1">
          {title && (
            <h4 className={`font-display font-semibold text-sm mb-2 ${variant.titleColor}`}>
              {title}
            </h4>
          )}
          <div className="text-brand-text-secondary text-sm leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpertNote;
