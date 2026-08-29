import React from 'react';
import { Calculator } from 'lucide-react';
import { Language } from '../types';
import BudgetEstimator, { EstimateData } from './BudgetEstimator';

interface BudgetEstimatorSectionProps {
  lang: Language;
  onLockEstimate?: (data: EstimateData) => void;
}

export const BudgetEstimatorSection: React.FC<BudgetEstimatorSectionProps> = ({
  lang,
  onLockEstimate,
}) => {
  return (
    <section
      id="budget-estimator"
      className="py-20 sm:py-28 bg-[#1A2421] text-[#FDFBF7] relative overflow-hidden border-t border-[#C9A96E]/20"
    >
      {/* Background Lighting Gradients */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#C9A96E]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <BudgetEstimator lang={lang} onLockEstimate={onLockEstimate} />
      </div>
    </section>
  );
};
