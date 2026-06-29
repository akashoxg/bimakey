import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Heart, Home, Briefcase, Baby, Clock, Phone, ArrowRight } from 'lucide-react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import BookingModal from '../../components/consultation/BookingModal';

const profiles = [
  { id: 'new-earner', icon: User, label: 'New Earner', age: '22–28 yrs', cover: '₹50L – ₹1 Cr', premium: '₹6,000–8,000/yr', recommendation: 'Start early when premiums are lowest. A basic term plan with ₹1 Cr cover is ideal. Add critical illness rider as your responsibilities grow.', color: 'bg-violet-50 text-violet-600' },
  { id: 'married', icon: Heart, label: 'Newly Married', age: '25–32 yrs', cover: '₹1–1.5 Cr', premium: '₹8,000–12,000/yr', recommendation: 'Your spouse depends on your income. Get ₹1 Cr minimum cover. Consider joint life cover if both are earning. Add waiver of premium rider.', color: 'bg-rose-50 text-rose-600' },
  { id: 'parent', icon: Baby, label: 'Parent with Young Kids', age: '30–40 yrs', cover: '₹1.5–2 Cr', premium: '₹10,000–18,000/yr', recommendation: 'Your kids need 15–20 more years of financial support. Cover should account for education costs, lifestyle, and any home loan. Add critical illness rider.', color: 'bg-amber-50 text-amber-600' },
  { id: 'home-loan', icon: Home, label: 'Home Loan Holder', age: 'Any age', cover: 'Loan amount + ₹1 Cr', premium: 'Varies', recommendation: 'Cover must be at least equal to your outstanding home loan plus family’s living expenses. Consider decreasing term plan for the loan portion to save on premium.', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'business', icon: Briefcase, label: 'Business Owner', age: 'Any age', cover: '₹2–5 Cr', premium: 'Varies', recommendation: 'Higher cover needed as income is variable. Consider keyman insurance for your business. Add accidental death and disability riders.', color: 'bg-blue-50 text-blue-600' },
  { id: 'near-retirement', icon: Clock, label: 'Nearing Retirement', age: '50–60 yrs', cover: '₹50L–1 Cr', premium: '₹30,000–60,000/yr', recommendation: 'If you have no dependents, you may not need term insurance. If you do, cover should handle any remaining debts and 5–10 years of expenses. Premiums are high at this age.', color: 'bg-gray-50 text-gray-600' },
];

const ForYourProfile = () => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const selected = profiles.find(p => p.id === selectedProfile);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-blue-50/50 to-transparent">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Life Insurance', href: '/life-insurance' }, { label: 'For Your Profile', href: '/life-insurance/for-your-profile' }]} />
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">Find the Right Plan for Your Life Stage</h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed">Select your current life stage below to get personalized term insurance recommendations.</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-container mx-auto px-4 md:px-8">
          {/* Profile Selector Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {profiles.map((profile) => (
              <button
                key={profile.id}
                type="button"
                onClick={() => setSelectedProfile(profile.id)}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all duration-200 text-center group ${
                  selectedProfile === profile.id
                    ? 'border-brand-teal bg-brand-teal-light shadow-glow'
                    : 'border-gray-100 bg-white hover:border-brand-teal/30 hover:shadow-soft'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl ${profile.color} flex items-center justify-center`}>
                  <profile.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-bold text-sm text-brand-navy">{profile.label}</p>
                  <p className="text-xs text-brand-text-secondary">{profile.age}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Recommendation Card */}
          {selected ? (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-10 max-w-3xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl ${selected.color} flex items-center justify-center`}>
                  <selected.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-brand-navy">{selected.label}</h3>
                  <p className="text-brand-text-secondary">{selected.age}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-brand-teal-light/50 rounded-xl p-4">
                  <p className="text-xs text-brand-text-secondary mb-1">Recommended Cover</p>
                  <p className="font-data font-bold text-xl text-brand-teal">{selected.cover}</p>
                </div>
                <div className="bg-brand-amber/5 rounded-xl p-4 border border-brand-amber/10">
                  <p className="text-xs text-brand-text-secondary mb-1">Estimated Premium</p>
                  <p className="font-data font-bold text-xl text-brand-amber">{selected.premium}</p>
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-display font-bold text-brand-navy mb-3">Our Recommendation</h4>
                <p className="text-brand-text-secondary leading-relaxed">{selected.recommendation}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setBookingOpen(true)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-hover transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4" aria-hidden="true" />
                  Get Expert Advice
                </button>
                <Link
                  to="/life-insurance/plans"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-brand-navy font-semibold rounded-xl hover:bg-gray-50 transition-colors"
                >
                  View Top Plans <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-brand-text-secondary bg-white rounded-2xl border border-gray-100 shadow-soft">
              <p className="text-lg font-medium mb-2">Select your life stage above</p>
              <p className="text-sm">We’ll show personalized recommendations based on your profile.</p>
            </div>
          )}
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} source="term-profile" />
    </motion.div>
  );
};

export default ForYourProfile;
