import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { useScrollReveal, fadeInUp } from '../../hooks/useScrollReveal';
import SectionHeader from '../shared/SectionHeader';
import { COMPARISON_DATA, BRAND } from '../../utils/constants';

const ComparisonBanner = () => {
  const { ref, controls } = useScrollReveal();

  return (
    <section className="py-12 sm:py-14 md:py-16 lg:py-28 bg-brand-bg-subtle relative overflow-hidden">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh-light" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden="true" />

      <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="The Unbiased Difference"
          subtitle="See how we stack up against traditional agents and commission-driven platforms."
          theme="light"
          className="text-brand-navy"
        />

        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={fadeInUp}
          className="max-w-5xl mx-auto bg-white backdrop-blur-sm rounded-2xl overflow-hidden shadow-card border border-gray-100"
        >
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-5 lg:p-6 text-brand-text-secondary font-medium text-xs lg:text-sm uppercase tracking-wider w-[35%]">Features</th>
                  <th className="p-5 lg:p-6 text-base lg:text-xl w-[32%] border-b border-brand-teal/20 relative">
                    <div className="absolute inset-0 bg-brand-teal/5" aria-hidden="true" />
                    <span className="relative font-display font-bold text-brand-teal">{BRAND.name}</span>
                  </th>
                  <th className="p-5 lg:p-6 text-brand-text-secondary font-display font-bold text-base lg:text-xl w-[32%]">
                    Others
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_DATA.map((row, index) => (
                  <tr
                    key={index}
                    className="group hover:bg-brand-teal-light/50 transition-colors duration-200"
                  >
                    <td className="p-5 lg:p-6 text-brand-text-secondary font-medium text-xs lg:text-sm border-b border-gray-100">{row.feature}</td>
                    <td className="p-5 lg:p-6 border-b border-gray-100 relative">
                      <div className="absolute inset-0 bg-brand-teal/5" aria-hidden="true" />
                      <div className="relative flex items-start gap-2 lg:gap-3">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-brand-teal" aria-hidden="true" />
                        </div>
                        <span className="text-brand-navy font-medium text-xs lg:text-sm leading-relaxed">{row.us}</span>
                      </div>
                    </td>
                    <td className="p-5 lg:p-6 text-brand-text-secondary border-b border-gray-100">
                      <div className="flex items-start gap-2 lg:gap-3">
                        <div className="w-4 h-4 lg:w-5 lg:h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <X className="w-2.5 h-2.5 lg:w-3 lg:h-3 text-brand-text-secondary" aria-hidden="true" />
                        </div>
                        <span className="text-xs lg:text-sm leading-relaxed">{row.them}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden">
            <div className="grid grid-cols-1 gap-3 p-4">
              {COMPARISON_DATA.map((row, index) => (
                <div
                  key={index}
                  className="bg-brand-bg-subtle rounded-xl p-4 border border-gray-100"
                >
                  <p className="text-brand-text-secondary text-xs font-medium mb-3 uppercase tracking-wide">{row.feature}</p>
                  
                  <div className="space-y-3">
                    {/* Us */}
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-brand-teal/20 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-brand-teal" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="text-brand-teal font-bold text-xs mb-0.5">{BRAND.name}</p>
                        <p className="text-brand-navy text-sm leading-snug">{row.us}</p>
                      </div>
                    </div>
                    
                    {/* Them */}
                    <div className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                        <X className="w-3 h-3 text-brand-text-secondary" aria-hidden="true" />
                      </div>
                      <div className="flex-1">
                        <p className="text-brand-text-secondary font-bold text-xs mb-0.5">Others</p>
                        <p className="text-brand-text-secondary text-sm leading-snug">{row.them}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonBanner;
