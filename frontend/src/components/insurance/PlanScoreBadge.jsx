import { ShieldCheck, ShieldAlert, Shield } from 'lucide-react';
import * as Tooltip from '@radix-ui/react-tooltip';

const PlanScoreBadge = ({ score, isRecommended, breakdown }) => {
  // Determine color and icon based on score
  const getScoreInfo = (s) => {
    if (s >= 4.5) return { color: 'text-brand-green bg-green-50 border-green-200', icon: ShieldCheck, label: 'Excellent' };
    if (s >= 4.0) return { color: 'text-brand-teal bg-teal-50 border-teal-200', icon: Shield, label: 'Good' };
    return { color: 'text-brand-amber bg-amber-50 border-amber-200', icon: ShieldAlert, label: 'Average' };
  };

  const { color, icon: Icon, label } = getScoreInfo(score);

  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <div className="flex items-center gap-3 cursor-help">
            <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl border ${color}`}>
              <span className="font-display font-bold text-xl leading-none">{score}</span>
              <span className="text-[10px] font-medium uppercase tracking-wider">/ 5.0</span>
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Icon className="w-4 h-4" />
                <span className={`font-semibold ${color.split(' ')[0]}`}>{label}</span>
              </div>
              {isRecommended && (
                <span className="text-xs font-medium text-brand-teal bg-brand-teal-light px-2 py-0.5 rounded-full mt-1 w-max">
                  Recommended
                </span>
              )}
            </div>
          </div>
        </Tooltip.Trigger>
        
        <Tooltip.Portal>
          <Tooltip.Content
            className="bg-brand-navy text-white text-sm rounded-lg p-3 shadow-xl z-50 max-w-xs animate-fade-in"
            sideOffset={5}
          >
            <div className="font-semibold mb-2">Score Breakdown:</div>
            <ul className="space-y-1 text-gray-300">
              <li className="flex justify-between gap-4">
                <span>Features:</span>
                <span className="font-medium text-white">{breakdown.featureRating}/5</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Insurer Reliability:</span>
                <span className="font-medium text-white">{breakdown.insurerRating}/5</span>
              </li>
              <li className="flex justify-between gap-4">
                <span>Premium Value:</span>
                <span className="font-medium text-white">{breakdown.premiumRating}/5</span>
              </li>
            </ul>
            <Tooltip.Arrow className="fill-brand-navy" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default PlanScoreBadge;
