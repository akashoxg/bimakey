import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HeartPulse, ArrowRight, ShieldCheck, Stethoscope } from 'lucide-react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import SectionHeader from '../../components/shared/SectionHeader';
import PlanRankTable from '../../components/insurance/PlanRankTable';
import RatingMethodology from '../../components/insurance/RatingMethodology';
import ConsultCTA from '../../components/consultation/ConsultCTA';
import { healthPlans, healthMethodology } from '../../data/healthPlans';
import { useScrollReveal, staggerContainer, fadeInUp } from '../../hooks/useScrollReveal';

const HealthIndex = () => {
  const { ref, controls } = useScrollReveal();

  const guides = [
    {
      title: 'Health Insurance Basics',
      description: 'Understand terms like Copay, Waiting Period, and Network Hospitals.',
      icon: Stethoscope,
      href: '/health-insurance/basics'
    },
    {
      title: 'Top Ranked Plans',
      description: 'Compare the best health insurance plans for 2026 based on our proprietary rating.',
      icon: ShieldCheck,
      href: '/health-insurance/plans'
    },
    {
      title: 'Family Coverage Guide',
      description: 'Learn how to cover your spouse, kids, and senior citizen parents effectively.',
      icon: HeartPulse,
      href: '/health-insurance/family-coverage'
    }
  ];

  return (
    <div className="min-h-screen">
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
          <Breadcrumb items={[{ label: 'Health Insurance', href: '/health-insurance' }]} />
          
          {/* Header Section */}
          <div className="mb-4">
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <HeartPulse className="w-8 h-8" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-6">
              Unbiased Health Insurance Advisory
            </h1>
            <p className="text-xl text-brand-text-secondary max-w-3xl leading-relaxed">
              Medical inflation is rising at 14% annually in India. A comprehensive health insurance plan is your only shield against a financial medical crisis. Let's find the right one for you.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-container mx-auto px-4 md:px-8 pt-12">
        {/* Quick Guides */}
        <motion.div 
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {guides.map((guide) => (
            <motion.div key={guide.title} variants={fadeInUp}>
              <Link 
                to={guide.href}
                className="block h-full bg-white border border-gray-200 rounded-2xl p-6 hover:shadow-card hover:border-brand-teal transition-[box-shadow,border-color] duration-300 group focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2 outline-none"
              >
                <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-brand-teal-light group-hover:text-brand-teal transition-colors">
                  <guide.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-brand-navy mb-2 group-hover:text-brand-teal transition-colors">
                  {guide.title}
                </h3>
                <p className="text-brand-text-secondary mb-4">
                  {guide.description}
                </p>
                <div className="flex items-center gap-2 text-brand-teal font-medium group-hover:gap-3 transition-[gap] duration-200">
                  Read Guide <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <ConsultCTA category="health" />

        {/* Top Plans Preview */}
        <div className="mt-20">
          <SectionHeader 
            eyebrow="2026 Rankings"
            title="Top 5 Health Insurance Plans"
            subtitle="Based on our analysis of 150+ plans across 30 insurers in India."
            align="left"
          />
          <PlanRankTable plans={healthPlans} category="health" />
          
          <div className="mt-8 text-center">
            <Link 
              to="/health-insurance/plans"
              className="inline-flex items-center gap-2 text-brand-teal font-bold hover:text-brand-teal-hover transition-colors"
            >
              View detailed plan analysis <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <RatingMethodology methodology={healthMethodology} />
      </div>
    </div>
  );
};

export default HealthIndex;
