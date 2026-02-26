import React, { useState, useEffect } from 'react';
import { QuizGenderScreen } from './components/QuizGenderScreen';
import { QuizBodyShapeScreen } from './components/QuizBodyShapeScreen';
import { QuizAgeScreen } from './components/QuizAgeScreen';
import { QuizGoalScreen } from './components/QuizGoalScreen';
import { QuizValidationScreen } from './components/QuizValidationScreen';
import { QuizNameScreen } from './components/QuizNameScreen';
import { QuizThankYouScreen } from './components/QuizThankYouScreen';
import { QuizFastingKnowledgeScreen } from './components/QuizFastingKnowledgeScreen';
import { QuizFastingInfoScreen } from './components/QuizFastingInfoScreen';
import { QuizHungerScreen } from './components/QuizHungerScreen';
import { QuizBreakfastScreen } from './components/QuizBreakfastScreen';
import { QuizLunchScreen } from './components/QuizLunchScreen';
import { QuizDinnerScreen } from './components/QuizDinnerScreen';
import { QuizMealPrepScreen } from './components/QuizMealPrepScreen';
import { QuizActivityScreen } from './components/QuizActivityScreen';
import { QuizWorkScheduleScreen } from './components/QuizWorkScheduleScreen';
import { QuizPositiveReinforcementScreen } from './components/QuizPositiveReinforcementScreen';
import { QuizCommitmentScreen } from './components/QuizCommitmentScreen';
import { QuizEmotionalSupportScreen } from './components/QuizEmotionalSupportScreen';
import { QuizExactAgeScreen } from './components/QuizExactAgeScreen';
import { QuizHeightScreen } from './components/QuizHeightScreen';
import { QuizEmailScreen } from './components/QuizEmailScreen';
import { QuizWeightScreen } from './components/QuizWeightScreen';
import { QuizBMIScreen } from './components/QuizBMIScreen';
import { QuizTargetWeightScreen } from './components/QuizTargetWeightScreen';
import { QuizRecommendedWeightScreen } from './components/QuizRecommendedWeightScreen';
import { QuizProgressChartScreen } from './components/QuizProgressChartScreen';
import { QuizSocialProofScreen } from './components/QuizSocialProofScreen';
import { QuizWalkingScreen } from './components/QuizWalkingScreen';
import { QuizSleepScreen } from './components/QuizSleepScreen';
import { QuizPreviousMethodsScreen } from './components/QuizPreviousMethodsScreen';
import { QuizHydrationScreen } from './components/QuizHydrationScreen';
import { QuizMedicationScreen } from './components/QuizMedicationScreen';
import { QuizHealthConditionsScreen } from './components/QuizHealthConditionsScreen';
import { QuizThankYouComplianceScreen } from './components/QuizThankYouComplianceScreen';
import { QuizResultVisualizationScreen } from './components/QuizResultVisualizationScreen';
import { QuizSocialComparisonScreen } from './components/QuizSocialComparisonScreen';
import { QuizDynamicLoadingScreen } from './components/QuizDynamicLoadingScreen';
import { QuizLoadingResultsScreen } from './components/QuizLoadingResultsScreen';
import { QuizPsychologicalDoorScreen } from './components/QuizPsychologicalDoorScreen';
import { QuizCelebrationScreen } from './components/QuizCelebrationScreen';
import { QuizCommitmentContractScreen } from './components/QuizCommitmentContractScreen';
import { QuizResultBridgeScreen } from './components/QuizResultBridgeScreen';
import { QuizFinalReportScreen } from './components/QuizFinalReportScreen';
import { QuizTSLScreen } from './components/QuizTSLScreen';
import { AppScreen, Gender } from './types';
import { trackScreenView, trackEvent } from './utils/analytics';

const App: React.FC = () => {
  // Start directly on Quiz Age (Q1)
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.QUIZ_AGE);
  
  // State for new questions (mapped to existing or new)
  const [userAge, setUserAge] = useState<string | null>(null); // Q1
  const [userGoal, setUserGoal] = useState<string | null>(null); // Q2
  const [userObstacle, setUserObstacle] = useState<string | null>(null); // Q3 (mapped to Hunger)
  const [userMorning, setUserMorning] = useState<string | null>(null); // Q4 (mapped to Breakfast)
  const [userBreakingPoint, setUserBreakingPoint] = useState<string | null>(null); // Q5 (mapped to Lunch)
  const [userDinner, setUserDinner] = useState<string | null>(null); // Q6
  const [userDigestion, setUserDigestion] = useState<string | null>(null); // Q7 (mapped to Fasting Info)
  const [userActivity, setUserActivity] = useState<string | null>(null); // Q8
  const [userWorkSchedule, setUserWorkSchedule] = useState<string | null>(null); // Q9
  const [userSleep, setUserSleep] = useState<string | null>(null); // Q10
  const [userPreviousMethods, setUserPreviousMethods] = useState<string[]>([]); // Q11
  const [userHydration, setUserHydration] = useState<string | null>(null); // Q12
  const [userCooking, setUserCooking] = useState<string | null>(null); // Q13 (mapped to Meal Prep)
  const [userCommitment, setUserCommitment] = useState<string | null>(null); // Q14
  const [userName, setUserName] = useState<string | null>(null); // Q15

  // Analytics Tracking
  useEffect(() => {
    trackScreenView(currentScreen);
  }, [currentScreen]);

  // Track start on mount
  useEffect(() => {
    trackEvent('quiz_start');
  }, []);

  const handleBack = () => {
    if (currentScreen === AppScreen.QUIZ_AGE) {
      // No back action
    } else if (currentScreen === AppScreen.QUIZ_GOAL) {
      setCurrentScreen(AppScreen.QUIZ_AGE);
    } else if (currentScreen === AppScreen.QUIZ_HUNGER) {
      setCurrentScreen(AppScreen.QUIZ_GOAL);
    } else if (currentScreen === AppScreen.QUIZ_BREAKFAST) {
      setCurrentScreen(AppScreen.QUIZ_HUNGER);
    } else if (currentScreen === AppScreen.QUIZ_LUNCH) {
      setCurrentScreen(AppScreen.QUIZ_BREAKFAST);
    } else if (currentScreen === AppScreen.QUIZ_DINNER) {
      setCurrentScreen(AppScreen.QUIZ_LUNCH);
    } else if (currentScreen === AppScreen.QUIZ_FASTING_INFO) {
      setCurrentScreen(AppScreen.QUIZ_DINNER);
    } else if (currentScreen === AppScreen.QUIZ_ACTIVITY) {
      setCurrentScreen(AppScreen.QUIZ_FASTING_INFO);
    } else if (currentScreen === AppScreen.QUIZ_WORK_SCHEDULE) {
      setCurrentScreen(AppScreen.QUIZ_ACTIVITY);
    } else if (currentScreen === AppScreen.QUIZ_SLEEP) {
      setCurrentScreen(AppScreen.QUIZ_WORK_SCHEDULE);
    } else if (currentScreen === AppScreen.QUIZ_PREVIOUS_METHODS) {
      setCurrentScreen(AppScreen.QUIZ_SLEEP);
    } else if (currentScreen === AppScreen.QUIZ_HYDRATION) {
      setCurrentScreen(AppScreen.QUIZ_PREVIOUS_METHODS);
    } else if (currentScreen === AppScreen.QUIZ_MEAL_PREP) {
      setCurrentScreen(AppScreen.QUIZ_HYDRATION);
    } else if (currentScreen === AppScreen.QUIZ_COMMITMENT) {
      setCurrentScreen(AppScreen.QUIZ_MEAL_PREP);
    } else if (currentScreen === AppScreen.QUIZ_NAME) {
      setCurrentScreen(AppScreen.QUIZ_COMMITMENT);
    } else if (currentScreen === AppScreen.QUIZ_FINAL_REPORT) {
      setCurrentScreen(AppScreen.QUIZ_NAME);
    } else if (currentScreen === AppScreen.TSL_SALES_SCREEN) {
      setCurrentScreen(AppScreen.QUIZ_FINAL_REPORT);
    }
  };

  // Q1: Age
  const handleAgeSelect = (ageRange: string) => {
    setUserAge(ageRange);
    setCurrentScreen(AppScreen.QUIZ_GOAL);
  };

  // Q2: Goal
  const handleGoalSelect = (goal: string) => {
    setUserGoal(goal);
    setCurrentScreen(AppScreen.QUIZ_HUNGER);
  };

  // Q3: Obstacle (Hunger Screen)
  const handleObstacleSelect = (obstacle: string) => {
    setUserObstacle(obstacle);
    setCurrentScreen(AppScreen.QUIZ_BREAKFAST);
  };

  // Q4: Morning (Breakfast Screen)
  const handleMorningSelect = (morning: string) => {
    setUserMorning(morning);
    setCurrentScreen(AppScreen.QUIZ_LUNCH);
  };

  // Q5: Breaking Point (Lunch Screen)
  const handleBreakingPointSelect = (point: string) => {
    setUserBreakingPoint(point);
    setCurrentScreen(AppScreen.QUIZ_DINNER);
  };

  // Q6: Dinner
  const handleDinnerSelect = (time: string) => {
    setUserDinner(time);
    setCurrentScreen(AppScreen.QUIZ_FASTING_INFO);
  };

  // Q7: Digestion (Fasting Info Screen)
  const handleDigestionSelect = (digestion: string) => {
    setUserDigestion(digestion);
    setCurrentScreen(AppScreen.QUIZ_ACTIVITY);
  };

  // Q8: Activity
  const handleActivitySelect = (activity: string) => {
    setUserActivity(activity);
    setCurrentScreen(AppScreen.QUIZ_WORK_SCHEDULE);
  };

  // Q9: Work Schedule
  const handleWorkScheduleSelect = (schedule: string) => {
    setUserWorkSchedule(schedule);
    setCurrentScreen(AppScreen.QUIZ_SLEEP);
  };

  // Q10: Sleep
  const handleSleepSelect = (sleep: string) => {
    setUserSleep(sleep);
    setCurrentScreen(AppScreen.QUIZ_PREVIOUS_METHODS);
  };

  // Q11: Previous Methods
  const handlePreviousMethodsSelect = (methods: string[]) => {
    setUserPreviousMethods(methods);
    setCurrentScreen(AppScreen.QUIZ_HYDRATION);
  };

  // Q12: Hydration
  const handleHydrationSelect = (hydration: string) => {
    setUserHydration(hydration);
    setCurrentScreen(AppScreen.QUIZ_MEAL_PREP);
  };

  // Q13: Cooking (Meal Prep Screen)
  const handleCookingSelect = (cooking: string) => {
    setUserCooking(cooking);
    setCurrentScreen(AppScreen.QUIZ_COMMITMENT);
  };

  // Q14: Commitment
  const handleCommitmentSelect = (commitment: string) => {
    setUserCommitment(commitment);
    setCurrentScreen(AppScreen.QUIZ_NAME);
  };

  // Q15: Name
  const handleNameSubmit = (name: string) => {
    setUserName(name);
    setCurrentScreen(AppScreen.QUIZ_FINAL_REPORT);
  };

  const handleFinalReportNext = () => {
    trackEvent('quiz_completed_success');
    setCurrentScreen(AppScreen.TSL_SALES_SCREEN);
  };

  const handleTSLFinish = () => {
    trackEvent('purchase_initiated', {
      value: 16999,
      currency: 'ARS'
    });
    alert(`¡Gracias ${userName}! Hemos registrado tu perfil completo. Fin de la demo.`);
  };

  return (
    <main>
      {currentScreen === AppScreen.QUIZ_AGE && (
        <QuizAgeScreen
          gender="female" // Defaulting to female as per persona context, or just ignore prop if updated
          onNext={handleAgeSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_GOAL && (
        <QuizGoalScreen
          onNext={handleGoalSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_HUNGER && (
        <QuizHungerScreen
          onNext={handleObstacleSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_BREAKFAST && (
        <QuizBreakfastScreen
          onNext={handleMorningSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_LUNCH && (
        <QuizLunchScreen
          onNext={handleBreakingPointSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_DINNER && (
        <QuizDinnerScreen
          onNext={handleDinnerSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_FASTING_INFO && (
        <QuizFastingInfoScreen
          onNext={handleDigestionSelect} // Updated prop name in component needed? Or just reuse onNext
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_ACTIVITY && (
        <QuizActivityScreen
          gender="female"
          onNext={handleActivitySelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_WORK_SCHEDULE && (
        <QuizWorkScheduleScreen
          onNext={handleWorkScheduleSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_SLEEP && (
        <QuizSleepScreen
          onNext={handleSleepSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_PREVIOUS_METHODS && (
        <QuizPreviousMethodsScreen
          onNext={handlePreviousMethodsSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_HYDRATION && (
        <QuizHydrationScreen
          onNext={handleHydrationSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_MEAL_PREP && (
        <QuizMealPrepScreen
          onNext={handleCookingSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_COMMITMENT && (
        <QuizCommitmentScreen
          gender="female"
          onNext={handleCommitmentSelect}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_NAME && (
        <QuizNameScreen
          onNext={handleNameSubmit}
          onBack={handleBack}
        />
      )}
      {currentScreen === AppScreen.QUIZ_FINAL_REPORT && userName && (
        <QuizFinalReportScreen
          userName={userName}
          obstacle={userObstacle || 'afternoon_slump'}
          criticalMoment={userBreakingPoint || 'afternoon_5pm'}
          digestion={userDigestion || 'bloated'}
          workSchedule={userWorkSchedule || 'office'}
          onNext={handleFinalReportNext}
        />
      )}
      {currentScreen === AppScreen.TSL_SALES_SCREEN && userName && (
        <QuizTSLScreen
          userName={userName}
          digestion={userDigestion || 'bloated'}
          onNext={handleTSLFinish}
        />
      )}
    </main>
  );
};

export default App;