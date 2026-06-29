import { motion } from 'framer-motion';
import Breadcrumb from '../components/shared/Breadcrumb';
import { BRAND } from '../utils/constants';

const PrivacyPolicy = () => {
  const lastUpdated = 'January 15, 2026';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-20 bg-gradient-to-b from-brand-teal-light/30 to-transparent">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <Breadcrumb items={[{ label: 'Privacy Policy', href: '/privacy-policy' }]} />
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">
            Privacy Policy
          </h1>
          <p className="text-brand-text-secondary">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20 md:pb-28">
        <div className="max-w-container mx-auto px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg max-w-none text-brand-text-secondary">
              
              <p className="text-lg leading-relaxed mb-8">
                At {BRAND.name} ("we," "our," or "us"), we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://bimakey.in" className="text-brand-teal hover:underline">https://bimakey.in</a> and use our services.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">1. Information We Collect</h2>
              <p className="mb-4">We collect information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Fill out our consultation booking form</li>
                <li>Contact us via phone, email, or WhatsApp</li>
                <li>Subscribe to our newsletter</li>
              </ul>
              <p className="mb-4">The information we may collect includes:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and any other information you provide</li>
                <li><strong>Usage Data:</strong> IP address, browser type, pages visited, time spent on pages, and other diagnostic data</li>
                <li><strong>Communication Data:</strong> Records of your correspondence with us</li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">2. How We Use Your Information</h2>
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Provide and maintain our services</li>
                <li>Schedule and follow up on consultation requests</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Send you relevant insurance information (with your consent)</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We <strong>never sell</strong> your personal information to third parties. We may share your information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>With Insurance Partners:</strong> Only with your explicit consent when you choose to purchase a policy</li>
                <li><strong>Service Providers:</strong> Companies that help us operate our website (hosting, email delivery) under strict confidentiality</li>
                <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">4. Data Security</h2>
              <p className="mb-6">
                We implement appropriate technical and organizational measures to protect your personal information, including encryption, secure servers, and access controls. However, no method of transmission over the Internet is 100% secure.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">5. Your Rights</h2>
              <p className="mb-4">Under applicable data protection laws, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Withdraw consent at any time</li>
                <li>Opt out of marketing communications</li>
              </ul>
              <p className="mb-6">
                To exercise these rights, contact us at <a href={`mailto:${BRAND.email}`} className="text-brand-teal hover:underline">{BRAND.email}</a>.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">6. Cookies</h2>
              <p className="mb-6">
                Our website uses cookies to enhance your browsing experience. You can control cookie settings through your browser preferences. We use only essential and analytics cookies that do not track personal information.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">7. Third-Party Links</h2>
              <p className="mb-6">
                Our website may contain links to third-party websites (e.g., insurance provider sites). We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">8. Children's Privacy</h2>
              <p className="mb-6">
                Our services are not intended for individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">9. Changes to This Policy</h2>
              <p className="mb-6">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">10. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-none space-y-2 mb-8">
                <li><strong>Email:</strong> <a href={`mailto:${BRAND.email}`} className="text-brand-teal hover:underline">{BRAND.email}</a></li>
                <li><strong>Phone:</strong> <a href={`tel:${BRAND.phone}`} className="text-brand-teal hover:underline">{BRAND.phone}</a></li>
                <li><strong>Address:</strong> {BRAND.address}</li>
              </ul>

            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default PrivacyPolicy;
