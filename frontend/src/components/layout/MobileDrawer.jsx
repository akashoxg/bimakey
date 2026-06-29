import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, Phone, Shield } from 'lucide-react';
import { useState } from 'react';
import { NAV_LINKS, BRAND, getWhatsAppUrl, getPhoneUrl } from '../../utils/constants';

const MobileDrawer = ({ isOpen, onClose, onBooking }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-brand-border">
              <Link to="/" className="flex items-center gap-2" onClick={onClose}>
                <img 
                  src="/logo.png" 
                  alt={`${BRAND.name} Logo`} 
                  className="h-10 sm:h-12 w-auto object-contain drop-shadow-sm" 
                />
                <span className="font-display font-extrabold text-xl tracking-tight text-brand-navy">
                  {BRAND.name}
                </span>
              </Link>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5 text-brand-navy" />
              </button>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto py-4">
              {NAV_LINKS.map((link) => (
                <div key={link.label} className="px-4">
                  {link.children ? (
                    <div>
                      <button
                        type="button"
                        className="flex items-center justify-between w-full py-3 text-brand-navy font-medium text-base focus-visible:ring-2 focus-visible:ring-brand-teal rounded-lg px-2"
                        onClick={() =>
                          setExpandedItem(expandedItem === link.label ? null : link.label)
                        }
                        aria-expanded={expandedItem === link.label}
                      >
                        {link.label}
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            expandedItem === link.label ? 'rotate-180' : ''
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      <AnimatePresence>
                        {expandedItem === link.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pb-2 pl-4">
                              {link.children.map((child) => (
                                <Link
                                  key={child.href}
                                  to={child.href}
                                  className="block py-2.5 px-3 text-sm text-brand-text-secondary hover:text-brand-teal rounded-lg hover:bg-brand-teal-light transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal"
                                  onClick={onClose}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      to={link.href}
                      className="block py-3 px-2 text-brand-navy font-medium text-base hover:text-brand-teal transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal rounded-lg"
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom CTAs */}
            <div className="p-4 border-t border-brand-border space-y-2.5 sm:space-y-3">
              {/* Claim Assistance Button */}
              <Link
                to="/claim-assistance"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-navy text-white font-semibold rounded-xl hover:bg-brand-navy-light transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
              >
                <Shield className="w-4 h-4" aria-hidden="true" />
                🚨 Claim Assistance
              </Link>
              <button
                type="button"
                onClick={onBooking}
                className="w-full flex items-center justify-center gap-2 py-3 bg-brand-teal text-white font-semibold rounded-xl hover:bg-brand-teal-hover transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
              >
                <Phone className="w-4 h-4" aria-hidden="true" />
                Book Free Consultation
              </button>
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 border-2 border-brand-teal text-brand-teal font-semibold rounded-xl hover:bg-brand-teal-light transition-colors focus-visible:ring-2 focus-visible:ring-brand-teal focus-visible:ring-offset-2"
              >
                💬 WhatsApp Us
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileDrawer;
