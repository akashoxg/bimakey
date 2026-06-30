import { Link } from 'react-router-dom';
import { Shield, Star, Phone, Mail, MessageCircle } from 'lucide-react';
import { BRAND, getWhatsAppUrl } from '../../utils/constants';

const footerSections = [
  {
    title: 'Insurance',
    links: [
      { label: 'Health Insurance', href: '/health-insurance' },
      { label: 'Term Life Insurance', href: '/life-insurance' },
      { label: 'Motor Insurance', href: '/motor-insurance' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Health Plans', href: '/health-insurance/plans' },
      { label: 'Term Plans', href: '/life-insurance/plans' },
      { label: 'Motor Plans', href: '/motor-insurance/plans' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Claim Assistance', href: '/claim-assistance' },
      { label: 'Talk to Experts', href: '/experts' },
      { label: 'Contact Us', href: '/contact-us' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Privacy Policy', href: '/privacy-policy' },
      { label: 'Terms of Service', href: '/terms-of-service' },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="bg-brand-navy text-white relative overflow-hidden" role="contentinfo">
      {/* Top gradient fade */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" aria-hidden="true" />
      <div className="absolute inset-0 dot-grid opacity-5" aria-hidden="true" />

      <div className="max-w-container mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-14 lg:py-16 relative z-10">
        {/* Top Section - Brand + Links */}
        <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-10 md:mb-12">

          {/* Brand Column - Full width on mobile, spans 2 on desktop */}
          <div className="col-span-1 xs:col-span-2 md:col-span-1 lg:col-span-1 sm:mb-4">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img
                src="/logo.png"
                alt={`${BRAND.name} Logo`}
                className="h-10 md:h-12 w-auto object-contain"
              />
              <span className="font-display font-extrabold text-xl md:text-2xl tracking-tight">{BRAND.name}</span>
            </Link>
            <p className="text-sm text-white/40 mb-4 leading-relaxed hidden sm:block">
              {BRAND.tagline}
            </p>

            {/* Google Rating */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-4">
              <Star className="w-3.5 h-3.5 text-brand-amber fill-brand-amber" aria-hidden="true" />
              <span className="text-sm font-data font-semibold">{BRAND.googleRating}</span>
              <span className="text-xs text-white/40">Google</span>
            </div>

            {/* Social/Contact */}
            <div className="space-y-2">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4" aria-hidden="true" />
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-4 h-4" aria-hidden="true" />
                {BRAND.email}
              </a>
              <a
                href={getWhatsAppUrl('general')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-green-400 hover:text-green-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-brand-teal mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-teal rounded block py-1"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <p className="text-center hidden md:block">
              IRDAI is not involved in any activities of this platform. Insurance is the subject matter of solicitation.
            </p>
            <div className="flex items-center gap-1.5 text-brand-teal font-medium">
              <Shield className="w-3 h-3" aria-hidden="true" />
              <span>No insurer commissions — ever.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
