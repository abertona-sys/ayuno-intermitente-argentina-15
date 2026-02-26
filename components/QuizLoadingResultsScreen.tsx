import React, { useEffect } from 'react';

interface QuizLoadingResultsScreenProps {
  onNext: () => void;
}

const CheckIcon = () => (
  <svg className="w-5 h-5 text-[#009688] flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

export const QuizLoadingResultsScreen: React.FC<QuizLoadingResultsScreenProps> = ({ onNext }) => {
  
  useEffect(() => {
    // Auto-advance after 4 seconds
    const timer = setTimeout(() => {
        onNext();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white flex flex-col items-center justify-center">
      
      {/* Mobile-first fixed width container */}
      <div className="w-full max-w-md px-6 flex flex-col items-center text-center">
        
        {/* Intro Message */}
        <h2 className="text-[#004D40] font-semibold text-xl sm:text-2xl mb-6">
          Tu perfil indica que:
        </h2>

        {/* Results Card */}
        <div className="w-full bg-white rounded-2xl p-8 shadow-sm border border-slate-50 flex flex-col items-start space-y-6 animate-in fade-in zoom-in duration-500">
            
            {/* Item 1 */}
            <div className="flex items-center space-x-3 text-left">
                <CheckIcon />
                <span className="text-[#004D40] font-medium text-lg">
                    Tu metabolismo es flexible
                </span>
            </div>

            {/* Item 2 */}
            <div className="flex items-center space-x-3 text-left">
                <CheckIcon />
                <span className="text-[#004D40] font-medium text-lg">
                    Tus hábitos son compatibles
                </span>
            </div>

             {/* Item 3 */}
             <div className="flex items-center space-x-3 text-left">
                <CheckIcon />
                <span className="text-[#004D40] font-medium text-lg">
                    Alta probabilidad de éxito
                </span>
            </div>

        </div>

      </div>
    </div>
  );
};