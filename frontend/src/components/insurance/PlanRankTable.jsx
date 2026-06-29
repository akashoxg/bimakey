import { useState, useMemo } from 'react';
import { ExternalLink, Check, Info, ArrowUpDown, Filter } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';
import PlanScoreBadge from './PlanScoreBadge';
import { formatNumber } from '../../utils/formatCurrency';

const PlanRankTable = ({ plans, category: _category }) => {
  const [sortBy, setSortBy] = useState('rank');
  const [filterInsurer, setFilterInsurer] = useState('all');

  const insurers = useMemo(() => ['all', ...new Set(plans.map((p) => p.insurer))], [plans]);

  const displayedPlans = useMemo(() => {
    let result = [...plans];
    if (filterInsurer !== 'all') {
      result = result.filter((p) => p.insurer === filterInsurer);
    }
    result.sort((a, b) => {
      if (sortBy === 'score') return b.score - a.score;
      if (sortBy === 'csr') return (b.claimSettlementRatio || 0) - (a.claimSettlementRatio || 0);
      return a.rank - b.rank;
    });
    return result;
  }, [plans, sortBy, filterInsurer]);

  return (
    <div className="space-y-4">
      {/* Interactive Sorting & Filtering Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 text-sm text-brand-navy font-semibold">
          <Filter className="w-4 h-4 text-brand-teal" />
          <span>Filter by Insurer:</span>
          <select
            value={filterInsurer}
            onChange={(e) => setFilterInsurer(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
          >
            <option value="all">All Insurers ({plans.length})</option>
            {insurers.filter((i) => i !== 'all').map((ins) => (
              <option key={ins} value={ins}>
                {ins}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2 text-sm text-brand-navy font-semibold">
          <ArrowUpDown className="w-4 h-4 text-brand-amber" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-teal"
          >
            <option value="rank">Overall Rank (Default)</option>
            <option value="score">Highest Score</option>
            <option value="csr">Claim Settlement Ratio</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 font-semibold text-brand-navy w-16 text-center">Rank</th>
                <th className="p-4 font-semibold text-brand-navy w-1/3">Plan & Insurer</th>
                <th className="p-4 font-semibold text-brand-navy">Our Score</th>
                <th className="p-4 font-semibold text-brand-navy">Key Strengths</th>
                <th className="p-4 font-semibold text-brand-navy w-32 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {displayedPlans.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-brand-text-secondary">
                    No plans found matching the selected filter.
                  </td>
                </tr>
              ) : (
                displayedPlans.map((plan) => (
                  <tr
                    key={plan.name}
                    className={`hover:bg-gray-50 transition-colors ${plan.rank === 1 && filterInsurer === 'all' && sortBy === 'rank' ? 'bg-brand-teal-light/20' : ''}`}
                  >
                    <td className="p-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold ${
                          plan.rank === 1 ? 'bg-brand-teal text-white' : plan.rank <= 3 ? 'bg-gray-200 text-brand-navy' : 'bg-gray-100 text-gray-500'
                        }`}
                      >
                        #{plan.rank}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="font-display font-bold text-lg text-brand-navy mb-1">{plan.name}</div>
                      <div className="text-sm text-brand-text-secondary">{plan.insurer}</div>

                      {/* Key metrics based on category */}
                      <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        <Tooltip.Provider delayDuration={200}>
                          <Tooltip.Root>
                            <Tooltip.Trigger asChild>
                              <div className="flex items-center gap-1 cursor-help border-b border-dashed border-gray-300 pb-0.5">
                                <Info className="w-3 h-3" />
                                CSR: {plan.claimSettlementRatio}%
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Portal>
                              <Tooltip.Content className="bg-brand-navy text-white text-xs rounded p-2 z-50">
                                Claim Settlement Ratio (Higher is better)
                                <Tooltip.Arrow className="fill-brand-navy" />
                              </Tooltip.Content>
                            </Tooltip.Portal>
                          </Tooltip.Root>
                        </Tooltip.Provider>

                        {plan.networkHospitals && (
                          <div className="flex items-center gap-1">
                            🏥 {formatNumber(plan.networkHospitals)} Hospitals
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <PlanScoreBadge
                        score={plan.score}
                        isRecommended={plan.isRecommended}
                        breakdown={plan.scoreBreakdown}
                      />
                    </td>
                    <td className="p-4">
                      <ul className="space-y-1.5" role="list">
                        {plan.keyFeatures.slice(0, 3).map((feature, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-sm text-brand-navy">
                            <Check className="w-4 h-4 text-brand-green flex-shrink-0 mt-0.5" aria-hidden="true" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="p-4 text-center">
                      <a
                        href={plan.externalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-brand-navy text-white text-sm font-medium rounded-lg hover:bg-brand-navy-light transition-colors focus-visible:ring-2 focus-visible:ring-brand-navy focus-visible:ring-offset-2"
                      >
                        View Plan
                        <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="bg-gray-50 p-4 border-t border-gray-200 text-xs text-brand-text-secondary text-center">
          Rankings are based on our independent research methodology and updated for {plans[0]?.year || new Date().getFullYear()}. We do not receive commissions from insurers for these rankings.
        </div>
      </div>
    </div>
  );
};

export default PlanRankTable;
