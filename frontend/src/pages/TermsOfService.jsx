import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/shared/Breadcrumb';
import { BRAND } from '../utils/constants';

const TermsOfService = () => {
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
          <Breadcrumb items={[{ label: 'Terms of Service', href: '/terms-of-service' }]} />
          <h1 className="font-display font-bold text-4xl md:text-5xl text-brand-navy mb-4">
            Terms of Service
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
                Welcome to {BRAND.name}. By accessing or using our website <a href="https://bimakey.in" className="text-brand-teal hover:underline">https://bimakey.in</a> and services, you agree to be bound by these Terms of Service ("Terms"). Please read them carefully.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">1. About Us</h2>
              <p className="mb-6">
                {BRAND.name} is an independent insurance advisory platform. We provide unbiased comparisons, rankings, and guidance on insurance products. We are not an insurance company, agent, or broker.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">2. Our Services</h2>
              <p className="mb-4">We provide the following services:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Insurance plan comparisons and rankings</li>
                <li>Expert advisory consultations</li>
                <li>Claims support assistance</li>
                <li>Insurance-related information and education</li>
              </ul>
              <p className="mb-6">
                <strong>Important:</strong> {BRAND.name} does not sell insurance policies directly. Any purchase of insurance is made directly between you and the insurance company.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">3. No Fees for Advisory Services</h2>
              <p className="mb-6">
                Our advisory services are provided free of charge. We do not charge consultation fees, processing fees, or any other charges for our guidance. Our business model is based on transparency, not commissions.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">4. No Insurance Distribution</h2>
              <p className="mb-4">
                {BRAND.name} is <strong>not an IRDAI-licensed insurance intermediary</strong>. We do not:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Sell, solicit, or negotiate insurance products</li>
                <li>Collect premiums on behalf of insurers</li>
                <li>Issue insurance policies</li>
                <li>Process claims directly</li>
              </ul>
              <p className="mb-6">
                Any insurance-related transactions are solely between you and the licensed insurance company.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">5. Information Disclaimer</h2>
              <p className="mb-6">
                The information provided on our platform is for general informational purposes only. While we strive to keep information accurate and up-to-date, we make no representations or warranties about the completeness, accuracy, or reliability of any information. Plan features, premiums, and terms may change. Always verify details directly with the insurance provider before making decisions.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">6. User Responsibilities</h2>
              <p className="mb-4">By using our services, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Provide accurate and truthful information</li>
                <li>Not misuse our platform for any unlawful purpose</li>
                <li>Not attempt to gain unauthorized access to our systems</li>
                <li>Respect other users and our team members</li>
                <li>Make independent decisions about insurance products</li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">7. Limitation of Liability</h2>
              <p className="mb-6">
                {BRAND.name} and its team shall not be liable for any direct, indirect, incidental, or consequential damages arising from:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Your use of or reliance on our advisory services</li>
                <li>Decisions made based on our recommendations</li>
                <li>Any insurance company's actions or inactions</li>
                <li>Errors or omissions in plan information</li>
              </ul>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">8. Third-Party Links</h2>
              <p className="mb-6">
                Our website may contain links to third-party websites, including insurance provider websites. We do not endorse or assume responsibility for any third-party content, products, or services.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">9. Intellectual Property</h2>
              <p className="mb-6">
                All content on this website, including text, graphics, logos, rankings, and methodology, is the property of {BRAND.name} and protected by applicable intellectual property laws. You may not reproduce, distribute, or create derivative works without our written permission.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">10. Privacy</h2>
              <p className="mb-6">
                Your use of our services is also governed by our Privacy Policy. Please review it at <Link to="/privacy-policy" className="text-brand-teal hover:underline">/privacy-policy</Link>.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">11. Modifications to Terms</h2>
              <p className="mb-6">
                We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting on this page. Your continued use of our services after changes constitutes acceptance of the modified Terms.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">12. Governing Law</h2>
              <p className="mb-6">
                These Terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">13. Disclaimer</h2>
              <p className="mb-6">
                IRDAI is not involved in any activities of this platform. Insurance is the subject matter of solicitation. {BRAND.name} provides advisory services only and does not engage in insurance distribution activities.
              </p>

              <h2 className="font-display font-bold text-2xl text-brand-navy mt-10 mb-4">14. Contact Us</h2>
              <p className="mb-6">
                If you have any questions about these Terms, please contact us:
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

export default TermsOfService;
