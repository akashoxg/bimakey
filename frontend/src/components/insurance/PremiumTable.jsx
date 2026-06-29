import { Info } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

const PremiumTable = ({ plans }) => {
  // Extract all unique profiles from the plans
  const profiles = [...new Set(plans.flatMap(p => p.premiums.map(pr => pr.profile)))];

  // Find the lowest premium for each profile to highlight it
  const lowestPremiums = profiles.reduce((acc, profile) => {
    const premiumsForProfile = plans
      .map(p => p.premiums.find(pr => pr.profile === profile)?.amount)
      .filter(amount => amount !== undefined);
    
    acc[profile] = premiumsForProfile.length > 0 ? Math.min(...premiumsForProfile) : null;
    return acc;
  }, {});

  return (
    <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h3 className="font-display font-bold text-xl text-brand-navy">Premium Comparison</h3>
          <p className="text-sm text-brand-text-secondary mt-1">Annual premium estimates including GST</p>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <div className="w-3 h-3 rounded-full bg-brand-teal-light border border-brand-teal" />
          <span className="text-brand-text-secondary">Best Value</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-semibold text-brand-navy w-1/3">Profile & Coverage</th>
              {plans.map(plan => (
                <th key={plan.name} className="p-4 font-semibold text-brand-navy text-center border-l border-gray-200">
                  <div className="text-sm">{plan.name}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {profiles.map((profile, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="p-4 text-brand-navy font-medium border-r border-gray-100">
                  {profile}
                </td>
                {plans.map(plan => {
                  const premiumEntry = plan.premiums.find(p => p.profile === profile);
                  const amount = premiumEntry?.amount;
                  const isLowest = amount === lowestPremiums[profile];

                  return (
                    <td 
                      key={`${plan.name}-${profile}`} 
                      className={`p-4 text-center border-r border-gray-100 last:border-r-0 ${
                        isLowest ? 'bg-brand-teal-light/30' : ''
                      }`}
                    >
                      {amount ? (
                        <div className="flex flex-col items-center">
                          <span className={`font-mono text-lg ${isLowest ? 'font-bold text-brand-teal' : 'text-brand-navy'}`}>
                            {formatCurrency(amount)}
                          </span>
                          <span className="text-xs text-gray-400">/ year</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-4 border-t border-gray-200 flex items-start gap-2 text-xs text-brand-text-secondary">
        <Info className="w-4 h-4 flex-shrink-0 mt-0.5" aria-hidden="true" />
        <p>
          Disclaimer: Premiums shown are indicative base rates for standard health profiles living in Metro cities. Actual premiums may vary based on medical underwriting, lifestyle habits (smoking), exact location, and opted riders.
        </p>
      </div>
    </div>
  );
};

export default PremiumTable;
