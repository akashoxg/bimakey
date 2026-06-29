// Brand Configuration
export const BRAND = {
  name: 'BimaKey',
  tagline: "India's only 100% unbiased insurance platform",
  phone: '+919717427154',
  whatsapp: '919717427154',
  email: 'hello@bimakey.in',
  address: 'New Delhi, India',
  googleRating: 4.7,
};

// WhatsApp URL builder with context-specific pre-filled messages
export const getWhatsAppUrl = (context = 'general') => {
  const messages = {
    general: 'Hi, I need help with insurance advice',
    health: 'Hi, I need help choosing a health insurance plan',
    term: 'Hi, I want to compare term insurance plans',
    motor: 'Hi, I need help with motor insurance',
    contact: "Hi, I'd like to book a free consultation",
  };
  const message = messages[context] || messages.general;
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(message)}`;
};

// Phone URL
export const getPhoneUrl = () => `tel:${BRAND.phone}`;

// Navigation Links
export const NAV_LINKS = [
  {
    label: 'Life Insurance',
    href: '/life-insurance',
    children: [
      { label: 'Life Insurance Basics', href: '/life-insurance/basics' },
      { label: 'Term Insurance Plans', href: '/life-insurance/plans' },
      { label: 'For Your Profile', href: '/life-insurance/for-your-profile' },
      { label: 'Benefits & Features', href: '/life-insurance/benefits' },
    ],
  },
  {
    label: 'Health Insurance',
    href: '/health-insurance',
    children: [
      { label: 'Health Insurance Basics', href: '/health-insurance/basics' },
      { label: 'Health Insurance Plans', href: '/health-insurance/plans' },
      { label: 'Family Coverage', href: '/health-insurance/family-coverage' },
      { label: 'Benefits & Features', href: '/health-insurance/benefits' },
    ],
  },
  {
    label: 'Motor Insurance',
    href: '/motor-insurance',
    children: [
      { label: 'Motor Insurance Basics', href: '/motor-insurance/basics' },
      { label: 'Motor Insurance Plans', href: '/motor-insurance/plans' },
      { label: 'By Vehicle Type', href: '/motor-insurance/by-vehicle' },
      { label: 'Benefits & Features', href: '/motor-insurance/benefits' },
    ],
  },
  {
    label: 'Claim Help',
    href: '/claim-assistance',
    children: null,
  },
  {
    label: 'Talk to Experts',
    href: '/experts',
    children: null,
  },
];

// Insurance Types for forms
export const INSURANCE_TYPES = [
  { value: 'health', label: 'Health Insurance' },
  { value: 'term', label: 'Term Life Insurance' },
  { value: 'motor', label: 'Motor Insurance' },
  { value: 'other', label: 'Other' },
];

// Trust Bar items
export const TRUST_ITEMS = [
  {
    icon: 'Zap',
    title: 'Fast & Hassle-Free Claim Support',
    description: 'Quick claim processing with dedicated expert guidance at every step.',
  },
  {
    icon: 'Shield',
    title: 'Trusted Protection for Every Need',
    description: 'Comprehensive coverage options tailored to your unique requirements.',
  },
  {
    icon: 'IndianRupee',
    title: 'Affordable Premium Plans',
    description: 'Best-value plans that fit your budget without compromising coverage.',
  },
  {
    icon: 'Headphones',
    title: '24/7 Customer Assistance',
    description: 'Round-the-clock support whenever you need guidance or help.',
  },
];

// Testimonials data
export const TESTIMONIALS = [
  {
    name: 'Rahul Sharma',
    city: 'Mumbai',
    rating: 5,
    text: 'The team helped me find the perfect health insurance for my family. Their unbiased approach gave me confidence in my choice. Highly recommend!',
    plan: 'Health Insurance',
  },
  {
    name: 'Priya Singh',
    city: 'Delhi',
    rating: 5,
    text: 'I was confused between term plans, but the expert consultation made everything crystal clear. Got my policy within 48 hours!',
    plan: 'Term Life Insurance',
  },
  {
    name: 'Amit Verma',
    city: 'Delhi',
    rating: 5,
    text: 'No pushy sales calls, just genuine advice. They compared every plan feature by feature and helped me save ₹8,000 annually.',
    plan: 'Health Insurance',
  },
  {
    name: 'Nehal Gupta',
    city: 'Pune',
    rating: 5,
    text: "Best insurance advisory I've experienced. The methodology is transparent and the experts truly care about your needs, not commissions.",
    plan: 'Term Life Insurance',
  },
  {
    name: 'Sandeep Kumar',
    city: 'Hyderabad',
    rating: 5,
    text: 'Filed a claim recently and the team helped me through the entire process. Having ongoing support post-purchase is a game changer.',
    plan: 'Health Insurance',
  },
  {
    name: 'Anjali Mehta',
    city: 'Ahmedabad',
    rating: 5,
    text: "The free consultation was incredibly detailed. The advisor spent 45 minutes explaining every clause. I've never felt more informed.",
    plan: 'Motor Insurance',
  },
  {
    name: 'Vikram Patel',
    city: 'Noida',
    rating: 5,
    text: 'Switched from a commission-based agent to these folks. The difference is night and day — truly unbiased and thorough research.',
    plan: 'Health Insurance',
  },
  {
    name: 'Pooja Roy',
    city: 'Kolkata',
    rating: 5,
    text: 'As a first-time insurance buyer, I had so many questions. The team was patient and helped me understand every detail.',
    plan: 'Term Life Insurance',
  },
  {
    name: 'Rakesh Nair',
    city: 'Kochi',
    rating: 4,
    text: 'Great platform with transparent ratings. I could see exactly how each plan was scored. The premium comparison tables are super helpful.',
    plan: 'Health Insurance',
  },
  {
    name: 'Sneha Joshi',
    city: 'Jaipur',
    rating: 5,
    text: 'My family floater plan recommendation was spot-on. The advisor considered our ages, medical history, and budget to find the best fit.',
    plan: 'Health Insurance',
  },
];

// Comparison table data
export const COMPARISON_DATA = [
  { feature: 'Commission from insurers', us: 'Zero', them: 'Earn commissions + marketing fees' },
  { feature: 'Plans covered', us: 'All online plans — widest research', them: 'Limited by insurer partnerships' },
  { feature: 'Expert experience', us: 'Up to 20 yrs, claims-qualified', them: '3-week trained call center agents' },
  { feature: 'Claims support', us: 'Personal, ongoing, forever', them: 'Cold, transactional toll-free' },
  { feature: 'Cost to user', us: '100% Free', them: 'Hidden charges' },
  { feature: 'Independence', us: '100% unbiased', them: 'Biased by partnerships' },
];

// FAQ Data
export const FAQS = [
  {
    question: `What is ${BRAND.name}?`,
    answer: `${BRAND.name} is India's only 100% unbiased insurance advisory platform. We help you compare and choose the right insurance plans — health, term life, and motor — with expert guidance and zero insurer commissions. Our recommendations are based entirely on independent research and transparent methodology.`,
    category: 'general',
  },
  {
    question: 'What types of insurance do you cover?',
    answer: 'We cover three major categories: Health Insurance (individual, family floater, senior citizen), Term Life Insurance (pure protection plans), and Motor Insurance (car and two-wheeler). Each category has detailed plan comparisons, ratings, and expert reviews.',
    category: 'general',
  },
  {
    question: 'How do you find the right policy for me?',
    answer: 'Our experts analyze your specific needs — age, family size, health conditions, income, and coverage goals. We then compare plans across 100+ parameters using our proprietary rating methodology (Feature Rating + Insurer Rating + Premium Rating) to shortlist the best options for your profile.',
    category: 'general',
  },
  {
    question: 'Is your service free?',
    answer: 'Yes, 100% free. We do not charge any consultation fees, processing charges, or hidden costs. Our business model does not rely on insurer commissions. We believe in providing unbiased guidance that truly serves your interests.',
    category: 'general',
  },
  {
    question: 'Are you affiliated with any insurance company?',
    answer: 'No. We are completely independent and do not have any partnerships, sponsorships, or revenue-sharing agreements with any insurance company. This independence is what allows us to give truly unbiased recommendations.',
    category: 'general',
  },
  {
    question: 'How do I book a consultation?',
    answer: 'You can book a free consultation through any "Book Free Consultation" button on our website, call us directly, or message us on WhatsApp. Our online advisors typically respond promptly and schedule a detailed session at your convenience.',
    category: 'general',
  },
  {
    question: 'What happens after I book a consultation?',
    answer: 'After booking, an expert advisor will call or WhatsApp you within 24 hours. During the session (typically 30–45 minutes), they will understand your needs, explain relevant plans, compare options transparently, and help you shortlist the best policy. A follow-up session can be scheduled for final decision-making.',
    category: 'general',
  },
  {
    question: 'Do you help with claims?',
    answer: 'Yes! Unlike other platforms, we provide ongoing post-purchase support. If you need help filing a claim, understanding your policy benefits, or dealing with your insurer, our advisors are available to guide you — for free, forever.',
    category: 'general',
  },
];
