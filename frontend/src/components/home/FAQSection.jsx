import { useState } from 'react';
import { Search } from 'lucide-react';
import { FAQS } from '../../utils/constants';
import SectionHeader from '../shared/SectionHeader';
import { FaqAccordion } from '@/components/ui/faq-accordion';

const FAQSection = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const generalFaqs = FAQS.filter(faq => faq.category === 'general');
  const filteredFaqs = searchQuery
    ? generalFaqs.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : generalFaqs;

  return (
    <section className="py-14 sm:py-16 md:py-20 lg:py-28 bg-gray-50/80 border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 md:px-8">
        <SectionHeader
          eyebrow="Got Questions?"
          title="Frequently Asked Questions"
          subtitle="Everything you need to know about our platform and how we help you find the right insurance."
        />

        {/* Search filter */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-text-secondary pointer-events-none" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search questions…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-teal focus:border-transparent text-sm transition-shadow placeholder:text-brand-text-secondary/50"
            aria-label="Search frequently asked questions"
          />
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12 text-brand-text-secondary">
            <p className="mb-2 font-medium">No matching questions found.</p>
            <p className="text-sm">Try a different search term or browse all questions below.</p>
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mt-4 text-sm text-brand-teal font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <FaqAccordion items={filteredFaqs} />
        )}
      </div>
    </section>
  );
};

export default FAQSection;
