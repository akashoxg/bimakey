import { motion } from 'framer-motion';
import { Users, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../../components/shared/Breadcrumb';
import SectionHeader from '../../components/shared/SectionHeader';
import ConsultCTA from '../../components/consultation/ConsultCTA';

const floaterVsIndividual = [
  { feature: 'Coverage Type', floater: 'Shared sum insured for entire family', individual: 'Separate sum insured per person' },
  { feature: 'Best For', floater: 'Young families (parents + kids)', individual: 'Senior citizens, high-risk members' },
  { feature: 'Premium', floater: 'Lower overall cost', individual: 'Higher per-person cost' },
  { feature: 'Claim Impact', floater: 'One large claim can exhaust cover for all', individual: 'Claims don’t affect others’ coverage' },
  { feature: 'Flexibility', floater: 'Less flexible', individual: 'More flexible per member' },
];

const familyScenarios = [
  { scenario: '2 Adults (age 30–35)', recommended: '₹10–15L floater', premium: '₹18,000–25,000/yr', note: 'A family floater is the most cost-effective. Ensure unlimited restoration.' },
  { scenario: '2 Adults + 1 Child', recommended: '₹15–20L floater', premium: '₹22,000–30,000/yr', note: 'Kids add minimal premium. Consider day-care procedure coverage for children.' },
  { scenario: '2 Adults + 2 Children', recommended: '₹20–25L floater', premium: '₹25,000–35,000/yr', note: 'Higher sum insured recommended. Look for plans covering newborns from day one.' },
  { scenario: 'Parents (age 55–65)', recommended: '₹10–15L individual each', premium: '₹40,000–80,000/yr each', note: 'Individual plans work better for seniors. Check copay clauses carefully.' },
  { scenario: 'Joint Family (4+ members)', recommended: 'Mix of floater + individual', premium: 'Varies significantly', note: 'Combine a floater for the younger family + individual plans for senior members.' },
];

const FamilyCoverage = () => {
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
            { label: 'Family Coverage', href: '/health-insurance/family-coverage' },
          ]} />
          <div className="max-w-3xl">
            <div className="w-14 h-14 bg-rose-50 text-rose-500 rounded-2xl flex items-center justify-center mb-6">
              <Users className="w-7 h-7" />
            </div>
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">
              Family Coverage Guide
            </h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed">
              Learn how to cover your spouse, kids, and senior citizen parents effectively with the right health insurance strategy.
            </p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* What is Family Floater */}
          <div className="max-w-3xl mb-16">
            <h2 className="font-display font-bold text-2xl text-brand-navy mb-4">What is a Family Floater Plan?</h2>
            <p className="text-brand-text-secondary leading-relaxed mb-4">
              A Family Floater health insurance plan covers your entire family — you, your spouse, and children — under a single sum insured. Instead of buying separate policies for each member, the sum insured is shared among all members.
            </p>
            <div className="callout-info">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-brand-navy">
                  <strong>Example:</strong> A ₹15L family floater for 2 adults + 1 child means any member can claim up to ₹15L. If one member claims ₹10L, only ₹5L remains for others that year (unless there’s a restoration benefit).
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <SectionHeader
            eyebrow="Comparison"
            title="Family Floater vs Individual Plans"
            subtitle="Choose the right approach based on your family’s age profile and health needs."
          />

          <div className="overflow-x-auto mb-16">
            <table className="w-full bg-white rounded-2xl shadow-soft border border-gray-100 overflow-hidden min-w-[500px]">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-4 text-left text-sm font-semibold text-brand-navy">Aspect</th>
                  <th className="p-4 text-left text-sm font-semibold text-brand-teal">Family Floater</th>
                  <th className="p-4 text-left text-sm font-semibold text-blue-600">Individual</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {floaterVsIndividual.map((row) => (
                  <tr key={row.feature} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-4 text-sm text-brand-navy font-medium">{row.feature}</td>
                    <td className="p-4 text-sm text-brand-text-secondary">{row.floater}</td>
                    <td className="p-4 text-sm text-brand-text-secondary">{row.individual}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ConsultCTA
            title="Not sure which approach suits your family?"
            subtitle="Our experts will analyze your family’s age profile, medical history, and budget to recommend the optimal combination."
            category="health-family"
          />

          {/* Family Scenarios */}
          <div className="mt-16">
            <SectionHeader
              eyebrow="Recommendations"
              title="Coverage by Family Size"
              subtitle="Our recommendations based on typical Indian family structures."
            />

            <div className="space-y-4">
              {familyScenarios.map((item, i) => (
                <motion.div
                  key={item.scenario}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-6 border border-gray-100 shadow-soft"
                >
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-3">
                    <h3 className="font-display font-bold text-lg text-brand-navy flex-1">{item.scenario}</h3>
                    <div className="flex gap-3">
                      <span className="stat-pill text-xs">{item.recommended}</span>
                      <span className="text-xs px-3 py-1.5 rounded-full bg-brand-amber/10 text-brand-amber font-data font-semibold border border-brand-amber/15">
                        {item.premium}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-brand-text-secondary">{item.note}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                to="/health-insurance/plans"
                className="inline-flex items-center gap-2 text-brand-teal font-bold hover:text-brand-teal-hover transition-colors"
              >
                See Our Top-Ranked Plans <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default FamilyCoverage;
