import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, ArrowRight, Star, ShieldCheck, BadgeCheck, TrendingUp } from 'lucide-react';
import BookingModal from '../consultation/BookingModal';
import AnimatedButton from '@/components/ui/animated-button';
import AnimatedCounter from '@/components/ui/animated-counter';
import SideRays from '@/components/ui/SideRays';

const HeroSection = () => {
  const [bookingOpen, setBookingOpen] = useState(false);

  return (
    <>
      <section className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-36 md:pb-28 overflow-hidden min-h-[85dvh] sm:min-h-[90dvh] flex items-center bg-brand-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat" 
          style={{ backgroundImage: "url('/website_background.jpg')" }} 
          aria-hidden="true" 
        />
        {/* White fade overlay so text and components are clearly visible */}
        <div 
          className="absolute inset-0 z-0 bg-white/85 backdrop-blur-[3px]" 
          aria-hidden="true" 
        />
        {/* Glowing white radial spotlight behind the text column to ensure crystal clear contrast */}
        <div 
          className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.75)_55%,transparent_100%)]" 
          aria-hidden="true" 
        />
        {/* Bottom smooth fade into next section */}
        <div 
          className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-brand-white to-transparent z-0" 
          aria-hidden="true" 
        />

        {/* Subtle dot grid overlay */}
        <div className="absolute inset-0 dot-grid opacity-15 z-0" aria-hidden="true" />

        {/* SideRays Animated Background - Falling Light Rays */}
        <div className="absolute inset-0 z-0 pointer-events-auto overflow-hidden" aria-hidden="true">
          <SideRays
            speed={2.5}
            rayColor1="#1B6B5A"
            rayColor2="#E07A2F"
            intensity={1.5}
            spread={2}
            origin="top-right"
            tilt={0}
            saturation={1}
            blend={0.5}
            falloff={1.6}
            opacity={0.3}
          />
        </div>

        {/* Floating geometric shapes */}
        <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full border border-brand-teal/10 animate-float" aria-hidden="true" />
        <div className="absolute bottom-32 left-[10%] w-40 h-40 rounded-full border border-brand-teal/5 animate-float" style={{ animationDelay: '2s' }} aria-hidden="true" />
        <div className="absolute top-1/3 right-[8%] w-3 h-3 rounded-full bg-brand-amber/20" aria-hidden="true" />
        <div className="absolute top-2/3 left-[20%] w-2 h-2 rounded-full bg-brand-teal/20" aria-hidden="true" />

        <div className="max-w-container mx-auto px-4 md:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content — spans 7 columns */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 max-w-2xl"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 shadow-soft border border-brand-teal/30 text-brand-teal text-sm font-semibold mb-8">
                <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                <span>India&rsquo;s Only 100% Unbiased Platform</span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold text-brand-navy tracking-tight leading-[1.05] sm:leading-[1.1] mb-4 sm:mb-6 drop-shadow-[0_1px_1px_rgba(255,255,255,1)]">
                Find the Right Insurance.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-teal to-brand-amber">
                  Not the Highest Commission.
                </span>
              </h1>

              <p className="text-brand-navy/85 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-relaxed max-w-xl font-body font-medium">
                We compare 150+ health and term plans using a transparent rating methodology. No spam calls. No hidden fees. Just expert advice.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12 items-start sm:items-center">
                <AnimatedButton
                  onClick={() => setBookingOpen(true)}
                  className="w-full sm:w-auto text-base py-4 px-8 shadow-card"
                >
                  <Phone className="w-5 h-5 mr-1 inline" aria-hidden="true" />
                  Book Free Consultation
                </AnimatedButton>
                <Link
                  to="/health-insurance/plans"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/90 shadow-soft border border-brand-teal/25 text-brand-teal font-semibold rounded-xl hover:bg-brand-teal hover:text-white transition-all duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal/50"
                >
                  Compare Plans
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>

              {/* Trust badges strip */}
              <div className="flex flex-wrap items-center gap-3">
                <div className="stat-pill !bg-white/95 !shadow-soft !border-brand-teal/25">
                  <Star className="w-3.5 h-3.5 text-brand-amber fill-brand-amber" aria-hidden="true" />
                  <span className="font-data">4.7</span>
                  <span className="text-brand-text-secondary text-xs font-body">Google</span>
                </div>
                <div className="stat-pill !bg-white/95 !shadow-soft !border-brand-teal/25">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
                  <span className="text-xs font-body">Zero Commission</span>
                </div>
                <div className="stat-pill !bg-white/95 !shadow-soft !border-brand-teal/25">
                  <TrendingUp className="w-3.5 h-3.5 text-brand-green" aria-hidden="true" />
                  <AnimatedCounter end={10000} formatAsK={true} suffix="+" />
                  <span className="text-brand-text-secondary text-xs font-body">Families</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content — Live Plan Preview Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 hidden lg:block"
            >
              <div className="relative">
                {/* Main preview card */}
                <div className="glow-border animate-glow-pulse">
                  <div className="bg-white backdrop-blur-xl rounded-2xl border border-gray-100 p-8 relative overflow-hidden shadow-elevated">
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/80 to-transparent animate-shimmer" style={{ backgroundSize: '200% 100%' }} aria-hidden="true" />

                    <div className="relative z-10">
                      <div className="text-label uppercase tracking-widest text-brand-teal mb-6 font-data">
                        Top Pick — 2026
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="font-display font-bold text-xl text-brand-navy mb-1">
                            HDFC Ergo Optima Secure+
                          </h3>
                          <p className="text-brand-text-secondary text-sm">Health Insurance</p>
                        </div>
                        <div className="w-14 h-14 rounded-2xl bg-brand-teal-light border border-brand-teal/20 flex items-center justify-center">
                          <span className="font-data font-bold text-xl text-brand-teal">4.6</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-brand-bg-subtle rounded-xl p-3 border border-gray-100">
                          <p className="text-brand-text-secondary text-xs mb-1 font-body">Starting Premium</p>
                          <p className="font-data font-bold text-brand-navy text-lg">₹13,459<span className="text-brand-text-secondary text-xs font-body">/yr</span></p>
                        </div>
                        <div className="bg-brand-bg-subtle rounded-xl p-3 border border-gray-100">
                          <p className="text-brand-text-secondary text-xs mb-1 font-body">Claim Settlement</p>
                          <p className="font-data font-bold text-brand-navy text-lg">98.5%</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {['No Sub-Limits', 'Unlimited Restore', '10,000+ Hospitals'].map((tag) => (
                          <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-brand-teal-light text-brand-teal border border-brand-teal/20">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => setBookingOpen(true)}
                        className="w-full py-3 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-hover transition-colors duration-200 text-sm"
                      >
                        Get Expert Advice →
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating mini-card */}
                <motion.div
                  initial={{ opacity: 0, x: -20, y: 10 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  transition={{ delay: 1, duration: 0.5 }}
                  className="absolute -bottom-6 -left-8 bg-white px-5 py-3.5 rounded-xl shadow-card border border-gray-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 bg-brand-teal-light rounded-full flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-brand-teal" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs text-brand-text-secondary">Claims Support</p>
                    <p className="text-brand-navy font-bold font-display text-sm">Lifelong Free</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} source="hero" />
    </>
  );
};

export default HeroSection;
