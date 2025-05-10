import React from 'react';

interface BlogIllustrationProps {
  category: string;
  className?: string;
}

const BlogIllustration: React.FC<BlogIllustrationProps> = ({ category, className = "" }) => {
  // Icons for different blog categories
  const renderIcon = () => {
    switch (category.toLowerCase()) {
      case 'education philosophy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 20.94c1.5 0 2.75 1.06 4 1.06 3 0 6-8 6-12.22A4.91 4.91 0 0 0 17 5c-2.22 0-4 1.44-5 2-1-.56-2.78-2-5-2a4.9 4.9 0 0 0-5 4.78C2 14 5 22 8 22c1.25 0 2.5-1.06 4-1.06Z" />
            <path d="M12 8c1-.67 2.38-1.5 4-1.5 1 0 2 .08 2.2.08" />
          </svg>
        );
      case 'study tips':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
            <path d="M6 8h2" />
            <path d="M6 12h2" />
            <path d="M16 8h2" />
            <path d="M16 12h2" />
          </svg>
        );
      case 'cybersecurity':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            <circle cx="12" cy="16" r="1" />
          </svg>
        );
      case 'mathematics':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="16" y2="6" />
            <line x1="3" y1="18" x2="16" y2="18" />
            <line x1="18" y1="6" x2="21" y2="3" />
            <line x1="21" y1="9" x2="18" y2="6" />
            <line x1="18" y1="18" x2="21" y2="15" />
            <line x1="21" y1="21" x2="18" y2="18" />
          </svg>
        );
      case 'literacy':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
            <path d="M8 7h6" />
            <path d="M8 11h8" />
            <path d="M8 15h5" />
          </svg>
        );
      case 'college prep':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c3 3 9 3 12 0v-5" />
          </svg>
        );
      case 'science':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M8.5 2a6.5 6.5 0 0 1 6.5 6.5c0 1.5-.5 2.5-1.5 3.5L12 13.5a2 2 0 0 1 0 3l-1.5 1.5a2 2 0 0 1-3 0L2 12.5a2 2 0 0 1 0-3L3.5 8a2 2 0 0 1 3 0L8 9.5c1-.5 2.5-2 2.5-3.5a2 2 0 0 0-2-2 2 2 0 0 0-2 2" />
            <path d="M14.5 2a6.5 6.5 0 0 0-6.5 6.5c0 1.5.5 2.5 1.5 3.5l1.5 1.5a2 2 0 0 0 0 3l1.5 1.5a2 2 0 0 0 3 0l5.5-5.5a2 2 0 0 0 0-3L19.5 8a2 2 0 0 0-3 0L15 9.5c-1-.5-2.5-2-2.5-3.5a2 2 0 0 1 2-2 2 2 0 0 1 2 2" />
          </svg>
        );
      // Default icon
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className={`${className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        );
    }
  };

  return renderIcon();
};

export default BlogIllustration; 