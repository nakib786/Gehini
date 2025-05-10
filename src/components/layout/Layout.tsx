import { type ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useTheme } from '../../contexts/ThemeContext';
import { WhatsAppChat } from '../ui/whatsapp-chat';

// ScrollToTop component to handle scrolling to the top when route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className={`flex flex-col min-h-screen overflow-x-hidden ${isDarkMode ? 'dark' : ''}`}>
      <ScrollToTop />
      <div className="dark:bg-[#111111] bg-background flex-grow">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
        <WhatsAppChat />
      </div>
    </div>
  );
};

export default Layout; 