import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface LearningStep {
  id: number;
  concept: string;
  explanation: string;
  example: string;
  mastery: number; // 0-100 percentage
  delay: number;
}

const LearningAnimation: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [showingConcept, setShowingConcept] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState<boolean>(true);
  const animationRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);

  const learningSteps: LearningStep[] = [
    {
      id: 1,
      concept: "1. Initial Assessment",
      explanation: "We begin by understanding each student's unique strengths and areas for improvement.",
      example: "Math Skills Evaluation: Algebra Readiness ✓ | Geometry Concepts ✓ | Calculus Prerequisites ⚠",
      mastery: 10,
      delay: 3500
    },
    {
      id: 2,
      concept: "2. Custom Learning Plan",
      explanation: "We create a personalized curriculum tailored to each student's learning style and goals.",
      example: "Weekly Plan: Monday-Algebra, Wednesday-Geometry, Friday-Problem Solving",
      mastery: 25,
      delay: 3500
    },
    {
      id: 3,
      concept: "3. Building Foundations",
      explanation: "We ensure strong foundational concepts are in place before advancing to more complex ideas.",
      example: "Mastering multiplication tables before tackling algebraic expressions",
      mastery: 40,
      delay: 3500
    },
    {
      id: 4,
      concept: "4. Interactive Practice",
      explanation: "Students apply concepts through engaging exercises that make learning enjoyable.",
      example: "Using real-world scenarios to practice percentage calculations",
      mastery: 60,
      delay: 3500
    },
    {
      id: 5,
      concept: "5. Guided Reflection",
      explanation: "Students review their work and identify areas of success and improvement.",
      example: "Self-assessment: 'I understand how to solve equations, but need more practice with word problems'",
      mastery: 75,
      delay: 3500
    },
    {
      id: 6,
      concept: "6. Mastery Achievement",
      explanation: "Students demonstrate confident understanding and application of learned concepts.",
      example: "Successfully applying algebraic concepts to new, unfamiliar problems independently",
      mastery: 95,
      delay: 4000
    },
  ];

  // Function to animate progress bar
  const animateProgress = (from: number, to: number, duration: number) => {
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      setProgress(from + (to - from) * progress);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  };

  // Progress through the learning steps
  useEffect(() => {
    if (isAnimating) {
      const step = learningSteps[currentStep];
      
      // Show concept
      setShowingConcept(true);
      animateProgress(
        currentStep > 0 ? learningSteps[currentStep - 1].mastery : 0,
        step.mastery,
        1500
      );
      
      // Cycle through steps
      const timer = setTimeout(() => {
        const nextStep = (currentStep + 1) % learningSteps.length;
        
        if (nextStep === 0) {
          // Reset after completing cycle
          setIsAnimating(false);
          setProgress(0);
          
          resetTimeoutRef.current = window.setTimeout(() => {
            setCurrentStep(0);
            setIsAnimating(true);
          }, 2000);
        } else {
          setCurrentStep(nextStep);
        }
      }, step.delay);
      
      return () => clearTimeout(timer);
    }
  }, [currentStep, isAnimating]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const currentLearningStep = learningSteps[currentStep];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full h-auto rounded-lg shadow-2xl overflow-hidden bg-white dark:bg-[#0D1117] border border-gray-200 dark:border-gray-800"
      ref={animationRef}
    >
      {/* Header */}
      <div className="flex items-center bg-primary p-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-2 ml-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-sm text-[#111111] font-medium">
          K-12 Learning Process Visualization
        </div>
      </div>

      {/* Content */}
      <div className="p-6 bg-white dark:bg-[#0D1117]">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="dark:text-gray-300 text-gray-600">Learning Journey Progress</span>
            <span className="font-semibold dark:text-white">{Math.round(progress)}%</span>
          </div>
          <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Current step */}
        <motion.div
          key={currentLearningStep.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <h3 className="text-xl font-bold mb-3 text-primary">{currentLearningStep.concept}</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-4">{currentLearningStep.explanation}</p>
          
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md border-l-4 border-primary">
            <h4 className="font-medium mb-2 dark:text-white">Example:</h4>
            <p className="text-gray-700 dark:text-gray-300">{currentLearningStep.example}</p>
          </div>
        </motion.div>

        {/* Learning stage visualization */}
        <div className="flex justify-between mt-8">
          {learningSteps.map((step) => (
            <div 
              key={step.id} 
              className={`relative flex flex-col items-center ${
                currentStep + 1 >= step.id ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div 
                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                  currentStep + 1 === step.id 
                    ? 'bg-primary ring-4 ring-primary/20' 
                    : currentStep + 1 > step.id 
                      ? 'bg-primary' 
                      : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                {currentStep + 1 > step.id && (
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
              <span className="text-xs mt-2 text-center dark:text-gray-400 text-gray-500 max-w-[60px]">
                {step.id}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LearningAnimation; 