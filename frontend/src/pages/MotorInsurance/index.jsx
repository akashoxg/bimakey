import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Car, ArrowRight, ShieldCheck, BookOpen, Truck } from 'lucide-react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import SectionHeader from '../../components/shared/SectionHeader';
import PlanRankTable from '../../components/insurance/PlanRankTable';
import RatingMethodology from '../../components/insurance/RatingMethodology';
import ConsultCTA from '../../components/consultation/ConsultCTA';
import { motorPlans, motorMethodology } from '../../data/motorPlans';
import { useScrollReveal, staggerContainer, fadeInUp } from '../../hooks/useScrollReveal';

const MotorIndex = () => {
  const { ref, controls } = useScrollReveal();
  const guides = [
    { title: 'Motor Insurance Basics', description: 'Understand comprehensive vs third-party, NCB, and add-on covers.', icon: BookOpen, href: '/motor-insurance/basics' },
    { title: 'Top Ranked Plans', description: 'Compare the best car and bike insurance plans for 2026.', icon: ShieldCheck, href: '/motor-insurance/plans' },
    { title: 'By Vehicle Type', description: 'Get recommendations based on your car, SUV, or two-wheeler.', icon: Truck, href: '/motor-insurance/by-vehicle' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 overflow-hidden bg-brand-white">
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
          <Breadcrumb items={[{ label: 'Motor Insurance', href: '/motor-insurance' }]} />
          <div className="mb-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm"><Car className="w-8 h-8" /></div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-6">Unbiased Motor Insurance Advisory</h1>
            <p className="text-xl text-brand-text-secondary max-w-3xl leading-relaxed">Motor insurance is mandatory in India. But choosing the right plan with the right add-ons can save you lakhs during a claim.</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {guides.map((guide) => (
              <motion.div key={guide.title} variants={fadeInUp}>
                <Link to={guide.href} className="block h-full bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-card hover:border-brand-teal transition-[box-shadow,border-color] duration-300 group focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 outline-none">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-teal-light group-hover:text-brand-teal transition-colors"><guide.icon className="w-6 h-6" /></div>
                  <h3 className="font-display font-bold text-xl text-brand-navy mb-2 group-hover:text-brand-teal transition-colors">{guide.title}</h3>
                  <p className="text-brand-text-secondary mb-4">{guide.description}</p>
                  <div className="flex items-center gap-2 text-brand-teal font-medium group-hover:gap-3 transition-[gap] duration-200">Read Guide <ArrowRight className="w-4 h-4" /></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <ConsultCTA category="motor" title="Need help choosing car or bike insurance?" subtitle="Our experts can compare add-ons, garage networks, and claim turnaround times." />

          <div className="mt-20">
            <SectionHeader eyebrow="2026 Rankings" title="Top 5 Motor Insurance Plans" subtitle="Based on features, insurer reliability, and premium pricing." align="left" />
            <PlanRankTable plans={motorPlans} category="motor" />
            <div className="mt-8 text-center">
              <Link to="/motor-insurance/plans" className="inline-flex items-center gap-2 text-brand-teal font-bold hover:text-brand-teal-hover transition-colors">View detailed plan analysis <ArrowRight className="w-4 h-4" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-20"><RatingMethodology methodology={motorMethodology} /></div>
      </section>
    </motion.div>
  );
};

export default MotorIndex;
