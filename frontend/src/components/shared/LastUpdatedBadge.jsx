import { RefreshCw } from 'lucide-react';

/**
 * Last Updated Badge component
 * Shows when data was last updated and the source
 */
const LastUpdatedBadge = ({ 
  date = new Date().toISOString().split('T')[0],
  source = 'IRDAI 2025-26 data',
  className = ''
}) => {
  const formattedDate = new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Kolkata'
  });

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 bg-brand-teal-light/50 rounded-full text-sm ${className}`}>
      <RefreshCw className="w-3.5 h-3.5 text-brand-teal" aria-hidden="true" />
      <span className="text-brand-teal">
        <span className="font-medium">Last updated:</span>{' '}
        <span>{formattedDate}</span>
        <span className="mx-2">•</span>
        <span>Based on {source}</span>
      </span>
    </div>
  );
};

export default LastUpdatedBadge;
