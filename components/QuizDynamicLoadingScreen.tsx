import React, { useEffect, useState } from 'react';

interface QuizDynamicLoadingScreenProps {
  onNext: () => void;
}

export const QuizDynamicLoadingScreen: React.FC<QuizDynamicLoadingScreenProps> = ({ onNext }) => {
  // Start with 23%, proceed to 29%, then 41%
  const [percent, setPercent] = useState(23);

  useEffect(() => {
    // Step 1: Wait 1.2s then go to 29%
    const t1 = setTimeout(() => {
        setPercent(29);
    }, 1200);

    // Step 2: Wait another 1.2s then go to 41%
    const t2 = setTimeout(() => {
        setPercent(41);
    }, 2400);

    // Step 3: Wait another 1.2s then finish (Auto advance)
    const t3 = setTimeout(() => {
        onNext();
    }, 3600);

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
    };
  }, [onNext]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0F7FA] to-white flex flex-col items-center justify-center">
      
      {/* Mobile-first fixed width container */}
      <div className="w-full max-w-md px-6 flex flex-col items-center text-center">
        
        {/* Message */}
        <h2 className="text-[#004D40] font-semibold text-xl sm:text-2xl mb-8">
          Analizando tu perfil...
        </h2>

        {/* Loading Indicator (Bar) */}
        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-6 relative">
             <div 
                className="h-full bg-[#009688] rounded-full transition-all duration-700 ease-out"
                style={{ width: `${percent}%` }}
             />
        </div>

        {/* Percentage */}
        <div className="text-[#009688] font-bold text-5xl sm:text-6xl transition-all duration-300">
            {percent} %
        </div>

      </div>
    </div>
  );
};