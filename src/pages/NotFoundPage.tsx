import React from 'react';
import { NotFound, Illustration } from '@/components/ui/not-found';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="relative flex flex-col w-full justify-center min-h-svh bg-background p-6 md:p-10">
      <div className="relative max-w-5xl mx-auto w-full">
        <Illustration className="absolute inset-0 w-full h-[50vh] opacity-[0.04] dark:opacity-[0.03] text-foreground" />
        <NotFound
          title="404 - Page not found"
          description="Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or never existed."
          searchPath="/search"
          homePath="/"
        />
      </div>
    </div>
  );
};

export default NotFoundPage; 