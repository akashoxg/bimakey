import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { List, X, ChevronRight } from 'lucide-react';

/**
 * Table of Contents component for long-form content pages
 * Sticky sidebar that highlights active section on scroll
 */
const TableOfContents = ({ headings = [] }) => {
  const [activeId, setActiveId] = useState('');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isDesktopVisible, setIsDesktopVisible] = useState(true);

  // Intersection observer to track active section
  const handleObserver = useCallback((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id);
      }
    });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      rootMargin: '-80px 0px -80% 0px',
      threshold: 0,
    });

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings, handleObserver]);

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for sticky header
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveId(id);
      setIsMobileOpen(false);
    }
  };

  // Show/hide on scroll (desktop only)
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 500) {
        setIsDesktopVisible(currentScrollY < lastScrollY);
      } else {
        setIsDesktopVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (headings.length === 0) return null;

  const tocContent = (
    <nav className="space-y-1" aria-label="Table of contents">
      <div className="text-label uppercase tracking-wider text-brand-text-secondary mb-4 font-semibold">
        On This Page
      </div>
      {headings.map((heading) => (
        <button
          key={heading.id}
          onClick={() => handleClick(heading.id)}
          className={`block w-full text-left text-sm py-2 px-3 rounded-lg transition-all duration-200 ${
            heading.depth === 3 ? 'pl-6' : ''
          } ${
            activeId === heading.id
              ? 'text-brand-teal font-semibold bg-brand-teal-light'
              : 'text-brand-text-secondary hover:text-brand-navy hover:bg-gray-50'
          }`}
        >
          {heading.text}
        </button>
      ))}
    </nav>
  );

  return (
    <>
      {/* Desktop Sidebar - Fixed position */}
      <motion.aside
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:block"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ 
            opacity: isDesktopVisible ? 1 : 0,
            y: isDesktopVisible ? 0 : -10
          }}
          transition={{ duration: 0.2 }}
          className="sticky top-28 w-64 max-h-[calc(100vh-8rem)] overflow-y-auto scrollbar-thin"
        >
          {tocContent}
        </motion.div>
      </motion.aside>

      {/* Mobile Toggle Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsMobileOpen(true)}
        className="lg:hidden fixed bottom-24 right-4 z-40 p-3 bg-brand-navy text-white rounded-full shadow-elevated hover:bg-brand-navy-light transition-colors"
        aria-label="Open table of contents"
      >
        <List className="w-5 h-5" />
      </motion.button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="lg:hidden fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="lg:hidden fixed right-0 top-0 bottom-0 w-72 bg-white z-50 shadow-dramatic"
            >
              <div className="flex items-center justify-between p-4 border-b border-brand-border">
                <span className="font-display font-bold text-brand-navy">On This Page</span>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto max-h-[calc(100%-64px)]">
                {tocContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default TableOfContents;
