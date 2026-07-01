import { motion } from 'framer-motion';
import { Phone, MessageCircle, Award, Clock, Shield, Heart, Users } from 'lucide-react';
import SEO from '../components/shared/SEO';
import ConsultCTA from '../components/consultation/ConsultCTA';
import { getWhatsAppUrl } from '../utils/constants';

/**
 * Expert profiles - in production, this would come from an API
 */
const EXPERTS = [
  {
    id: 1,
    name: 'Rajesh Agarwal',
    role: 'Chief Insurance Advisor',
    experience: 18,
    specializations: ['Health Insurance', 'Family Floater Plans', 'Senior Citizen Coverage'],
    certifications: ['IRDA Certified', 'Certified Financial Planner'],
    languages: ['English', 'Hindi', 'Bengali'],
    rating: 4.9,
    consultations: 2500,
    image: 'https://ui-avatars.com/api/?name=Rajesh+Agarwal&background=1B6B5A&color=fff&size=200',
    bio: 'With 18 years of experience in the insurance industry, Rajesh has helped over 2,500 families find the right coverage. His expertise in health insurance claim settlements makes him invaluable for families with senior members.',
  },
  {
    id: 2,
    name: 'Priya Sharma',
    role: 'Term Insurance Specialist',
    experience: 12,
    specializations: ['Term Life Insurance', 'Critical Illness Cover', 'Income Protection'],
    certifications: ['IRDA Certified', 'Life Insurance Specialist'],
    languages: ['English', 'Hindi', 'Marathi'],
    rating: 4.8,
    consultations: 1800,
    image: 'https://ui-avatars.com/api/?name=Priya+Sharma&background=1B6B5A&color=fff&size=200',
    bio: 'Priya specializes in term insurance planning for young professionals and families. She believes in creating comprehensive protection plans that give families true financial security.',
  },
  {
    id: 3,
    name: 'Amit Verma',
    role: 'Motor Insurance Expert',
    experience: 10,
    specializations: ['Car Insurance', 'Two-Wheeler Insurance', 'Commercial Vehicle'],
    certifications: ['IRDA Certified', 'Motor Insurance Specialist'],
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: 4.7,
    consultations: 1200,
    image: 'https://ui-avatars.com/api/?name=Amit+Verma&background=1B6B5A&color=fff&size=200',
    bio: 'Amit brings a decade of experience in motor insurance, helping vehicle owners understand comprehensive vs third-party coverage and navigate claim processes seamlessly.',
  },
  {
    id: 4,
    name: 'Neha Kapoor',
    role: 'Health Insurance Advisor',
    experience: 8,
    specializations: ['Individual Health Plans', 'Maternity Coverage', 'Diabetic Health Plans'],
    certifications: ['IRDA Certified', 'Health Insurance Specialist'],
    languages: ['English', 'Hindi', 'Tamil'],
    rating: 4.9,
    consultations: 950,
    image: 'https://ui-avatars.com/api/?name=Neha+Kapoor&background=1B6B5A&color=0fff&size=200',
    bio: 'Neha focuses on health insurance for individuals and small families. Her background in healthcare gives her unique insight into what coverage truly matters for different medical needs.',
  },
];

const ExpertCard = ({ expert, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-2xl p-6 shadow-card border border-gray-100 hover:shadow-card-hover hover:border-brand-teal/20 transition-all duration-300"
    >
      <div className="flex items-start gap-4 mb-4">
        <img
          src={expert.image}
          alt={expert.name}
          className="w-16 h-16 rounded-full object-cover ring-2 ring-brand-teal/20"
        />
        <div className="flex-1">
          <h3 className="font-display font-bold text-lg text-brand-navy">{expert.name}</h3>
          <p className="text-brand-teal text-sm font-medium">{expert.role}</p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-brand-amber">★</span>
            <span className="font-semibold text-sm text-brand-navy">{expert.rating}</span>
            <span className="text-brand-text-secondary text-sm">({expert.consultations}+ consultations)</span>
          </div>
        </div>
      </div>

      <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
        {expert.bio}
      </p>

      <div className="space-y-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-brand-text-secondary mb-2">
            <Award className="w-3.5 h-3.5" />
            <span className="font-medium uppercase tracking-wide">Specializations</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {expert.specializations.map((spec) => (
              <span
                key={spec}
                className="text-xs px-2.5 py-1 bg-brand-teal-light/50 text-brand-teal rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 text-xs text-brand-text-secondary mb-2">
            <Shield className="w-3.5 h-3.5" />
            <span className="font-medium uppercase tracking-wide">Certifications</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {expert.certifications.map((cert) => (
              <span
                key={cert}
                className="text-xs px-2.5 py-1 bg-gray-100 text-brand-text-secondary rounded-full"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-brand-text-secondary">
          <Users className="w-3.5 h-3.5" />
          <span>Speaks: {expert.languages.join(', ')}</span>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 flex gap-3">
        <a
          href={getWhatsAppUrl('contact')}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          WhatsApp
        </a>
        <a
          href="tel:+919717427154"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-brand-navy text-white rounded-xl font-semibold text-sm hover:bg-brand-navy-light transition-colors"
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
      </div>
    </motion.div>
  );
};

const Experts = () => {
  return (
    <>
      <SEO
        title="Meet Our Insurance Experts"
        description="Connect with certified insurance advisors at BimaKey. Get personalized guidance on health, term, and motor insurance from our experienced team."
      />

      <div className="min-h-screen">
        <section className="relative pt-28 pb-16 md:pt-36 md:pb-20 overflow-hidden bg-brand-white">
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
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-3xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-soft border border-brand-teal/20 text-brand-teal text-sm font-semibold mb-6">
                <Heart className="w-4 h-4" />
                <span>Meet Our Advisors</span>
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-6">
                Expert Guidance,<br />
                <span className="text-brand-teal">Every Step of the Way</span>
              </h1>
              <p className="text-lg text-brand-text-secondary leading-relaxed">
                Our team of certified insurance advisors brings decades of combined experience. 
                Unlike agents who earn commissions, our experts are committed to finding the 
                right coverage for your needs — not the most expensive plan.
              </p>
            </motion.div>
          </div>
        </section>

        <div className="max-w-container mx-auto px-4 md:px-8 pt-12">

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16"
          >
            {[
              { icon: Users, label: 'Expert Advisors', value: '4+' },
              { icon: Clock, label: 'Combined Experience', value: '48+ Years' },
              { icon: Award, label: 'Families Helped', value: '6,000+' },
              { icon: Heart, label: 'Zero Commission', value: '100%' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-4 text-center shadow-soft border border-gray-100"
              >
                <stat.icon className="w-6 h-6 text-brand-teal mx-auto mb-2" />
                <div className="font-display font-bold text-2xl text-brand-navy">{stat.value}</div>
                <div className="text-sm text-brand-text-secondary">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* Expert Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {EXPERTS.map((expert, index) => (
              <ExpertCard key={expert.id} expert={expert} index={index} />
            ))}
          </div>

          {/* Why Our Experts Are Different */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-card border border-gray-100 mb-16"
          >
            <h2 className="font-display font-bold text-2xl text-brand-navy text-center mb-8">
              Why Our Experts Are Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Zero Commission-Driven Advice',
                  description: 'Our advisors don\'t earn commissions from insurers. Their success is measured by your satisfaction, not your premium.',
                  icon: Shield,
                },
                {
                  title: 'Claims-Side Experience',
                  description: 'Many of our experts have worked on the claims side of insurance. They know what coverage actually pays when you need it.',
                  icon: Award,
                },
                {
                  title: 'Ongoing Support Forever',
                  description: 'Our relationship doesn\'t end at purchase. Get help with renewals, claims, and policy changes for the life of your policy.',
                  icon: Heart,
                },
              ].map((item) => (
                <div key={item.title} className="text-center">
                  <div className="w-14 h-14 bg-brand-teal-light rounded-xl flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-brand-teal" />
                  </div>
                  <h3 className="font-display font-semibold text-lg text-brand-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-text-secondary">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <ConsultCTA category="contact" title="Ready to speak with an expert?" />
        </div>
      </div>
    </>
  );
};

export default Experts;
