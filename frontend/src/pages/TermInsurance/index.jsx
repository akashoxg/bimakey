import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, ArrowRight, ShieldCheck, BookOpen, Users } from 'lucide-react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import SEO from '../../components/shared/SEO';
import SectionHeader from '../../components/shared/SectionHeader';
import PlanRankTable from '../../components/insurance/PlanRankTable';
import RatingMethodology from '../../components/insurance/RatingMethodology';
import ConsultCTA from '../../components/consultation/ConsultCTA';
import { termPlans, termMethodology } from '../../data/termPlans';
import { useScrollReveal, staggerContainer, fadeInUp } from '../../hooks/useScrollReveal';

const TermIndex = () => {
  const { ref, controls } = useScrollReveal();

  const guides = [
    { title: 'Term Insurance Basics', description: 'Understand pure protection plans, riders, and why term insurance is essential.', icon: BookOpen, href: '/life-insurance/basics' },
    { title: 'Top Ranked Plans', description: 'Compare the best term insurance plans for 2026 based on our proprietary rating.', icon: ShieldCheck, href: '/life-insurance/plans' },
    { title: 'For Your Profile', description: 'Get plan recommendations based on your age, income, and life stage.', icon: Users, href: '/life-insurance/for-your-profile' },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <SEO 
        title="Term Life Insurance Advisory | Compare Top Protection Plans"
        description="Compare affordable term life insurance policies with high claim settlement ratios. Get expert, zero-commission guidance."
      />
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
          <Breadcrumb items={[{ label: 'Life Insurance', href: '/life-insurance' }]} />
          <div className="mb-4">
            <div className="w-16 h-16 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-6">Unbiased Term Insurance Advisory</h1>
            <p className="text-xl text-brand-text-secondary max-w-3xl leading-relaxed">
              Term insurance is the most affordable way to secure your family’s financial future. We analyze every plan’s fine print so you can choose with confidence.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <motion.div ref={ref} initial="hidden" animate={controls} variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {guides.map((guide) => (
              <motion.div key={guide.title} variants={fadeInUp}>
                <Link to={guide.href} className="block h-full bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-card hover:border-brand-teal transition-[box-shadow,border-color] duration-300 group focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 outline-none">
                  <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-teal-light group-hover:text-brand-teal transition-colors">
                    <guide.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-display font-bold text-xl text-brand-navy mb-2 group-hover:text-brand-teal transition-colors">{guide.title}</h3>
                  <p className="text-brand-text-secondary mb-4">{guide.description}</p>
                  <div className="flex items-center gap-2 text-brand-teal font-medium group-hover:gap-3 transition-[gap] duration-200">Read Guide <ArrowRight className="w-4 h-4" /></div>
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <ConsultCTA category="term" title="Need help choosing between term plans?" subtitle="Our experts have analyzed every plan’s claim settlement data and rider options." />

          <div className="mt-20">
            <SectionHeader eyebrow="2026 Rankings" title="Top 5 Term Insurance Plans" subtitle="Based on insurer reliability, product features, and pricing analysis." align="left" />
            <PlanRankTable plans={termPlans} category="term" />
            <div className="mt-8 text-center">
              <Link to="/life-insurance/plans" className="inline-flex items-center gap-2 text-brand-teal font-bold hover:text-brand-teal-hover transition-colors">
                View detailed plan analysis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-20"><RatingMethodology methodology={termMethodology} /></div>
      </section>
    </motion.div>
  );
};

export default TermIndex;
