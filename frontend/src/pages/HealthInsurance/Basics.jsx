import { motion } from 'framer-motion';
import { BookOpen, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import SectionHeader from '../../components/shared/SectionHeader';
import ConsultCTA from '../../components/consultation/ConsultCTA';

const glossaryTerms = [
  { term: 'Sum Insured', definition: 'The maximum amount the insurer will pay for your medical expenses in a policy year. Choose based on your city’s hospital costs — ₹10L minimum for metros.' },
  { term: 'Copay', definition: 'The percentage of the claim amount you pay from your pocket. A 10% copay on a ₹1L bill means you pay ₹10,000. Look for plans with zero copay.' },
  { term: 'Waiting Period', definition: 'The initial period (usually 30 days for non-accidents, 2–4 years for pre-existing conditions) during which claims are not covered.' },
  { term: 'Room Rent Limit', definition: 'A cap on the daily room charge the insurer will cover. If your room costs more, all related expenses are reduced proportionally. Best plans have no room rent limit.' },
  { term: 'Cashless Treatment', definition: 'Treatment at a network hospital where the insurer pays the hospital directly. You don’t need to arrange funds upfront.' },
  { term: 'Restoration Benefit', definition: 'If your sum insured is exhausted, the insurer restores it (fully or partially) for subsequent claims in the same year. Unlimited restoration is ideal.' },
  { term: 'Sub-Limits', definition: 'Caps on specific treatments or expenses within your sum insured. For example, a ₹5,000 limit on ambulance charges. Fewer sub-limits = better plan.' },
  { term: 'No Claim Bonus', definition: 'A reward for not making claims. Your sum insured increases (typically 10–50%) for each claim-free year, without extra premium.' },
];

const commonMistakes = [
  'Choosing the cheapest plan without reading the fine print',
  'Ignoring the room rent limit — it can reduce your entire claim proportionally',
  'Not disclosing pre-existing conditions (claims can be rejected)',
  'Buying through a commission-based agent who recommends biased plans',
  'Waiting until you’re older or have health issues to buy coverage',
  'Not checking the insurer’s claim settlement ratio',
];

const Basics = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-rose-50/50 to-transparent">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumb items={[
            { label: 'Health Insurance', href: '/health-insurance' },
            { label: 'Basics', href: '/health-insurance/basics' },
          ]} />
          <div className="max-w-3xl">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
              <BookOpen className="w-7 h-7" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">
              Health Insurance Basics
            </h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed">
              A complete beginner’s guide to understanding health insurance in India. Learn the key terms, how to read your policy, and avoid common mistakes.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <div className="max-w-3xl">
            {/* What is Health Insurance */}
            <div className="mb-16">
              <h2 className="font-display font-bold text-2xl text-brand-navy mb-4">What is Health Insurance?</h2>
              <p className="text-brand-text-secondary leading-relaxed mb-4">
                Health insurance is a contract between you and an insurance company. You pay a yearly premium, and in return, the insurer covers your medical expenses — hospitalization, surgeries, day-care procedures, and sometimes even outpatient costs.
              </p>
              <p className="text-brand-text-secondary leading-relaxed mb-4">
                With medical inflation in India running at 14% annually, a single hospitalization can easily cost ₹5–10 lakhs in a metro city. Without insurance, this can wipe out years of savings.
              </p>
              <div className="callout-info">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-brand-navy">
                    <strong>Key fact:</strong> 65% of out-of-pocket medical expenses in India are paid by individuals without insurance. A comprehensive health plan starting at ₹10,000–15,000/year can protect your family from financial medical crises.
                  </p>
                </div>
              </div>
            </div>

            {/* Why You Need It */}
            <div className="mb-16">
              <h2 className="font-display font-bold text-2xl text-brand-navy mb-4">Why Do You Need It?</h2>
              <ul className="space-y-3">
                {[
                  'Rising medical costs: a heart bypass can cost ₹3–8 lakhs',
                  'Tax benefits under Section 80D (up to ₹25,000 for self + ₹50,000 for senior citizen parents)',
                  'Cashless treatment at 10,000+ network hospitals',
                  'Protection against catastrophic illnesses without depleting savings',
                  'Peace of mind for your entire family with a single policy',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-text-secondary">
                    <CheckCircle className="w-5 h-5 text-brand-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ConsultCTA
              title="Not sure how much coverage you need?"
              subtitle="Our experts can help you calculate the right sum insured based on your city, age, and family size."
              category="health-basics"
            />

            {/* Key Terms Glossary */}
            <div className="mb-16 mt-16">
              <SectionHeader
                eyebrow="Glossary"
                title="Key Terms You Must Know"
                subtitle="Understanding these terms will help you compare plans effectively."
                align="left"
              />
              <div className="space-y-4">
                {glossaryTerms.map((item) => (
                  <div key={item.term} className="bg-white rounded-xl p-5 border border-gray-100 shadow-soft">
                    <h4 className="font-display font-bold text-brand-navy mb-1.5">{item.term}</h4>
                    <p className="text-sm text-brand-text-secondary leading-relaxed">{item.definition}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Common Mistakes */}
            <div className="mb-16">
              <h2 className="font-display font-bold text-2xl text-brand-navy mb-6">Common Mistakes to Avoid</h2>
              <div className="callout-warning mb-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-brand-amber flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-brand-navy">
                    <strong>Warning:</strong> These mistakes can lead to claim rejections or inadequate coverage when you need it most.
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {commonMistakes.map((mistake, i) => (
                  <li key={i} className="flex items-start gap-3 text-brand-text-secondary">
                    <span className="w-6 h-6 rounded-full bg-brand-red/10 text-brand-red font-data font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{mistake}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ConsultCTA
              title="Have questions about your health insurance?"
              subtitle="Talk to our experts and get clarity on any policy terms, exclusions, or coverage details."
              category="health-basics-bottom"
            />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Basics;
