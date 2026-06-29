import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Car, Truck, Bike, Phone, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import Breadcrumb from '../../components/shared/Breadcrumb';
import BookingModal from '../../components/consultation/BookingModal';
import { motorPlans } from '../../data/motorPlans';

const vehicleTypes = [
  { id: 'hatchback', icon: Car, label: 'Hatchback', examples: 'Maruti Swift, i20, Baleno', premiumRange: '₹7,500–9,000/yr', recommended: 'HDFC Ergo / Bajaj Allianz', addOns: 'Zero depreciation (must), engine protection, roadside assistance', tip: 'Hatchbacks are most affordable to insure. Always add zero depreciation for the first 3–5 years.', color: 'bg-blue-50 text-blue-600' },
  { id: 'sedan', icon: Car, label: 'Sedan', examples: 'Honda City, Ciaz, Verna', premiumRange: '₹11,500–13,500/yr', recommended: 'HDFC Ergo / ICICI Lombard', addOns: 'Zero depreciation (must), engine protection, return to invoice, NCB protection', tip: 'Sedans have higher part costs. Zero depreciation is critical — a bumper replacement without it can cost you 40% extra.', color: 'bg-indigo-50 text-indigo-600' },
  { id: 'suv', icon: Truck, label: 'SUV / MUV', examples: 'Creta, Seltos, XUV700', premiumRange: '₹13,800–16,000/yr', recommended: 'HDFC Ergo / Tata AIG', addOns: 'Zero depreciation (must), engine protection (must), return to invoice, consumables', tip: 'SUVs have expensive parts and high engine repair costs. Engine protection and zero depreciation are non-negotiable.', color: 'bg-emerald-50 text-emerald-600' },
  { id: 'twowheeler', icon: Bike, label: 'Two-Wheeler', examples: 'Activa, Splendor, Pulsar', premiumRange: '₹2,200–3,000/yr', recommended: 'Bajaj Allianz / HDFC Ergo', addOns: 'Zero depreciation, personal accident, roadside assistance', tip: 'Two-wheeler insurance is very affordable. The cost difference between third-party only and comprehensive is small — always go comprehensive.', color: 'bg-orange-50 text-orange-600' },
];

const ByVehicle = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);

  const selected = vehicleTypes.find(v => v.id === selectedVehicle);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16 bg-gradient-to-b from-emerald-50/50 to-transparent">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Motor Insurance', href: '/motor-insurance' }, { label: 'By Vehicle', href: '/motor-insurance/by-vehicle' }]} />
          <div className="max-w-3xl">
            <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">Insurance by Vehicle Type</h1>
            <p className="text-xl text-brand-text-secondary leading-relaxed">Select your vehicle type to get tailored insurance recommendations, add-on suggestions, and premium estimates.</p>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {vehicleTypes.map((vehicle) => (
              <button
                key={vehicle.id}
                type="button"
                onClick={() => setSelectedVehicle(vehicle.id)}
                className={`flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-200 text-center group ${
                  selectedVehicle === vehicle.id ? 'border-brand-teal bg-brand-teal-light shadow-glow' : 'border-gray-100 bg-white hover:border-brand-teal/30 hover:shadow-soft'
                }`}
              >
                <div className={`w-14 h-14 rounded-xl ${vehicle.color} flex items-center justify-center`}>
                  <vehicle.icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <div>
                  <p className="font-display font-bold text-brand-navy">{vehicle.label}</p>
                  <p className="text-xs text-brand-text-secondary mt-1">{vehicle.examples}</p>
                </div>
              </button>
            ))}
          </div>

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
                  <p className="text-brand-text-secondary text-sm">{selected.examples}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-brand-teal-light/50 rounded-xl p-4">
                  <p className="text-xs text-brand-text-secondary mb-1">Premium Range</p>
                  <p className="font-data font-bold text-xl text-brand-teal">{selected.premiumRange}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-brand-text-secondary mb-1">Top Recommended</p>
                  <p className="font-semibold text-brand-navy">{selected.recommended}</p>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="font-display font-bold text-brand-navy mb-2">Recommended Add-Ons</h4>
                <div className="flex flex-wrap gap-2">
                  {selected.addOns.split(', ').map((addon) => (
                    <span key={addon} className="text-xs px-3 py-1.5 rounded-full bg-brand-teal/5 text-brand-teal border border-brand-teal/10 font-medium">
                      {addon}
                    </span>
                  ))}
                </div>
              </div>

              <div className="callout-info mb-6">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-brand-teal flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <p className="text-sm text-brand-navy"><strong>Expert Tip:</strong> {selected.tip}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button type="button" onClick={() => setBookingOpen(true)} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-brand-teal text-white font-bold rounded-xl hover:bg-brand-teal-hover transition-colors shadow-sm">
                  <Phone className="w-4 h-4" aria-hidden="true" /> Get Expert Advice
                </button>
                <Link to="/motor-insurance/plans" className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 text-brand-navy font-semibold rounded-xl hover:bg-gray-50 transition-colors">
                  View Top Plans <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-16 text-brand-text-secondary bg-white rounded-2xl border border-gray-100 shadow-soft">
              <p className="text-lg font-medium mb-2">Select your vehicle type above</p>
              <p className="text-sm">We’ll show tailored insurance recommendations.</p>
            </div>
          )}
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} source="motor-vehicle-type" />
    </motion.div>
  );
};

export default ByVehicle;
