import { Link } from 'react-router-dom';
import { Shield, Star, Phone, Mail, MapPin } from 'lucide-react';
import { BRAND } from '../../utils/constants';

const footerSections = [
  {
    title: 'Life Insurance',
    links: [
      { label: 'Life Insurance Basics', href: '/life-insurance/basics' },
      { label: 'Term Insurance Plans', href: '/life-insurance/plans' },
      { label: 'For Your Profile', href: '/life-insurance/for-your-profile' },
      { label: 'Benefits & Features', href: '/life-insurance/benefits' },
    ],
  },
  {
    title: 'Health Insurance',
    links: [
      { label: 'Health Insurance Basics', href: '/health-insurance/basics' },
      { label: 'Health Insurance Plans', href: '/health-insurance/plans' },
      { label: 'Family Coverage', href: '/health-insurance/family-coverage' },
      { label: 'Benefits & Features', href: '/health-insurance/benefits' },
    ],
  },
  {
    title: 'Motor Insurance',
    links: [
      { label: 'Motor Insurance Basics', href: '/motor-insurance/basics' },
      { label: 'Motor Insurance Plans', href: '/motor-insurance/plans' },
      { label: 'By Vehicle Type', href: '/motor-insurance/by-vehicle' },
      { label: 'Benefits & Features', href: '/motor-insurance/benefits' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Claim Assistance', href: '/claim-assistance' },
      { label: 'Book Consultation', href: '/contact-us' },
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

      <div className="max-w-container mx-auto px-4 md:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Brand Column — spans 2 */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img 
                src="/logo.png" 
                alt={`${BRAND.name} Logo`} 
                className="h-14 md:h-16 w-auto object-contain drop-shadow-sm" 
              />
              <span className="font-display font-extrabold text-2xl md:text-3xl tracking-tight">{BRAND.name}</span>
            </Link>
            <p className="text-sm text-white/40 mb-5 leading-relaxed max-w-xs">
              {BRAND.tagline}. We help you compare and choose the right insurance with zero bias.
            </p>

            {/* Google Rating Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5 mb-6">
              <Star className="w-3.5 h-3.5 text-brand-amber fill-brand-amber" aria-hidden="true" />
              <span className="text-sm font-data font-semibold">{BRAND.googleRating}</span>
              <span className="text-xs text-white/40">on Google</span>
            </div>

            {/* Contact info */}
            <div className="space-y-2.5">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                {BRAND.phone}
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2.5 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                {BRAND.email}
              </a>
              <p className="flex items-center gap-2.5 text-sm text-white/50">
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" aria-hidden="true" />
                {BRAND.address}
              </p>
            </div>
          </div>

          {/* Link Columns */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-brand-teal mb-5">
                {section.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-brand-teal rounded"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-container mx-auto px-4 md:px-8 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/30">
            <p>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <p className="text-center">
              IRDAI is not involved in any activities of this platform. Insurance is the subject matter of solicitation.
            </p>
            <div className="flex items-center gap-1.5 text-brand-teal font-medium text-xs">
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
