import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronDown, Shield, Phone } from 'lucide-react';
import { NAV_LINKS, BRAND } from '../../utils/constants';
import MobileDrawer from './MobileDrawer';
import BookingModal from '../consultation/BookingModal';
import LineHoverLink from '@/components/ui/line-hover-link';
import AnimatedButton from '@/components/ui/animated-button';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  // Close dropdown on route change
  useEffect(() => {
    setActiveDropdown(null);
    setMobileOpen(false);
  }, [location.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200/50 text-slate-900 transition-colors duration-300"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[98%] mx-auto px-3 sm:px-4 md:px-6">
          <div className="flex items-center justify-between h-16 md:h-20 lg:h-24 gap-2 md:gap-4">
            {/* Left: Logo + Brand Name on extreme left */}
            <Link
              to="/"
              className="flex items-center gap-1.5 md:gap-2.5 group flex-shrink-0"
              aria-label={`${BRAND.name} — Home`}
            >
              <img 
                src="/logo.png" 
                alt={`${BRAND.name} Logo`} 
                className="h-9 w-9 sm:h-10 sm:w-10 md:h-12 lg:h-14 w-auto object-contain transition-transform duration-200 group-hover:scale-110 drop-shadow-md" 
              />
              <span className="font-display font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl tracking-tight text-slate-900">
                {BRAND.name}
              </span>
            </Link>

            {/* Center: Desktop Nav Links with LineHoverLink */}
            <div className="hidden lg:flex items-center gap-7" ref={dropdownRef}>
              {NAV_LINKS.map((link) => (
                <div 
                  key={link.label} 
                  className="relative group py-2"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <LineHoverLink
                    to={link.href}
                    variant="slide"
                    className="flex items-center gap-1 text-base font-bold tracking-wide transition-colors duration-200 !text-slate-900 hover:!text-brand-teal"
                  >
                    <span>{link.label}</span>
                    {link.children && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 ml-0.5 inline transition-transform duration-200 ${
                          activeDropdown === link.label ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    )}
                  </LineHoverLink>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.children && activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-elevated border border-gray-100 overflow-hidden z-50"
                      >
                        <div className="p-1.5">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="block px-3.5 py-2.5 rounded-lg text-sm text-brand-text-secondary hover:bg-brand-teal-light/50 hover:text-brand-teal transition-colors duration-150 font-medium"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Right: CTA + Mobile Toggle */}
            <div className="flex items-center gap-3">
              {/* Claim Assistance Button */}
              <Link
                to="/claim-assistance"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2.5 text-xs md:text-sm font-bold rounded-xl transition-all duration-200 bg-brand-teal/10 text-brand-teal hover:bg-brand-teal hover:text-white border border-brand-teal/20"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                Claim Help
              </Link>

              <AnimatedButton
                onClick={() => setBookingOpen(true)}
                className="hidden md:inline-flex px-5 py-2.5 text-xs md:text-sm"
              >
                <Phone className="w-4 h-4 mr-1.5 inline" aria-hidden="true" />
                Buy Insurance
              </AnimatedButton>

              <button
                type="button"
                className="lg:hidden p-2 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal text-slate-900 hover:bg-gray-100"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onBooking={() => {
          setMobileOpen(false);
          setBookingOpen(true);
        }}
      />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />
    </>
  );
};

export default Navbar;
