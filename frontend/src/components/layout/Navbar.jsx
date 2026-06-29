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
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const isHome = location.pathname === '/';
  const useLightStyle = isScrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          useLightStyle
            ? 'bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 text-slate-900'
            : 'bg-gradient-to-b from-brand-navy/80 via-brand-navy/40 to-transparent backdrop-blur-[4px] border-b border-transparent text-white'
        }`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[98%] mx-auto px-2 sm:px-6">
          <div className="flex items-center justify-between h-20 md:h-24 gap-4">
            {/* Left: Logo + Brand Name on extreme left */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              aria-label={`${BRAND.name} — Home`}
            >
              <img 
                src="/logo.png" 
                alt={`${BRAND.name} Logo`} 
                className="h-14 md:h-16 w-auto object-contain transition-transform duration-200 group-hover:scale-110 drop-shadow-md" 
              />
              <span className={`font-display font-extrabold text-2xl md:text-3xl tracking-tight ${
                useLightStyle ? 'text-slate-900' : 'text-white drop-shadow-sm'
              }`}>
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
                    className={`flex items-center gap-1 text-base font-bold tracking-wide transition-colors duration-200 ${
                      useLightStyle ? '!text-slate-900 hover:!text-brand-teal' : '!text-white hover:!text-teal-300 drop-shadow-sm'
                    }`}
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
              <AnimatedButton
                onClick={() => setBookingOpen(true)}
                className="hidden md:inline-flex px-5 py-2.5 text-xs md:text-sm"
              >
                <Phone className="w-4 h-4 mr-1.5 inline" aria-hidden="true" />
                Buy Insurance
              </AnimatedButton>

              <button
                type="button"
                className={`lg:hidden p-2 rounded-lg transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-brand-teal ${
                  useLightStyle ? 'text-slate-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
                }`}
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
