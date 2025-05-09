import React from 'react';

export const RupeeIcon: React.FC<{ className?: string }> = ({ className = "h-5 w-5" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 3h12M6 8h12M6 13l8.5 8M12 7a4 4 0 1 0 0 8" />
    </svg>
  );
};

export const BasicPlanIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 3L4 9v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9l-8-6z" />
      <path d="M16 13H8M12 3v10" />
    </svg>
  );
};

export const StandardPlanIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  );
};

export const PremiumPlanIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <circle cx="12" cy="8" r="5" />
      <path d="M20 21a8 8 0 0 0-16 0" />
      <path d="m15 11 1.5 4.5" />
      <path d="M17 13.5 22 15" />
      <path d="M9 11 7.5 15.5" />
      <path d="M7 13.5 2 15" />
    </svg>
  );
};

export const AssessmentIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <path d="M2 10h20" />
      <path d="m7 15 2 2 6-6" />
    </svg>
  );
};

export const CollegePackageIcon: React.FC<{ className?: string }> = ({ className = "h-12 w-12" }) => {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}; 