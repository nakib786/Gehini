import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface Command {
  text: string;
  delay: number;
  isCommand: boolean;
}

const CyberTerminal: React.FC = () => {
  const [commands, setCommands] = useState<Command[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [blinkCursor, setBlinkCursor] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<number | null>(null);
  const cursorIntervalRef = useRef<number | null>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  
  const hackingSequence: Command[] = [
    { text: 'root@kali:~# nmap -sS -sV -p- 192.168.1.1', delay: 600, isCommand: true },
    { text: 'Starting Nmap scan...', delay: 800, isCommand: false },
    { text: 'Scanning 65535 ports on target...', delay: 1200, isCommand: false },
    { text: 'PORT     STATE SERVICE    VERSION', delay: 600, isCommand: false },
    { text: '22/tcp   open  ssh        OpenSSH 8.4', delay: 500, isCommand: false },
    { text: '80/tcp   open  http       nginx 1.18.0', delay: 500, isCommand: false },
    { text: '443/tcp  open  https      nginx 1.18.0', delay: 500, isCommand: false },
    { text: '3306/tcp open  mysql      MySQL 8.0.27', delay: 500, isCommand: false },
    { text: 'Nmap scan completed in 12.45 seconds', delay: 1000, isCommand: false },
    { text: 'root@kali:~# dirb https://192.168.1.1', delay: 1500, isCommand: true },
    { text: 'DIRB v2.22', delay: 800, isCommand: false },
    { text: 'Scanning for directories and files...', delay: 1000, isCommand: false },
    { text: 'FOUND: /admin', delay: 700, isCommand: false },
    { text: 'FOUND: /login', delay: 600, isCommand: false },
    { text: 'FOUND: /dashboard', delay: 600, isCommand: false },
    { text: 'FOUND: /backup', delay: 600, isCommand: false },
    { text: 'root@kali:~# hydra -l root -P /usr/share/wordlists/rockyou.txt 192.168.1.1 http-post-form "/login:username=^USER^&password=^PASS^:Invalid credentials"', delay: 1800, isCommand: true },
    { text: 'Hydra starting...', delay: 800, isCommand: false },
    { text: '[DATA] attacking http-post-form://192.168.1.1:80/login', delay: 1000, isCommand: false },
    { text: '[STATUS] 52.00 tries/min, 52 tried, 10389432 to go', delay: 1000, isCommand: false },
    { text: '[80][http-post-form] host: 192.168.1.1   login: root   password: secure123', delay: 1500, isCommand: false },
    { text: '[STATUS] attack finished for 192.168.1.1', delay: 800, isCommand: false },
    { text: 'root@kali:~# ssh root@192.168.1.1', delay: 1200, isCommand: true },
    { text: 'root@192.168.1.1\'s password: ', delay: 800, isCommand: false },
    { text: 'Last login: Thu Jul 15 21:14:23 2023 from 192.168.1.5', delay: 1200, isCommand: false },
    { text: 'Welcome to CyberOS 4.2.1', delay: 800, isCommand: false },
    { text: 'root@server:~# sudo -l', delay: 1200, isCommand: true },
    { text: '[sudo] password for root: ', delay: 800, isCommand: false },
    { text: 'Matching Defaults entries for root on server:', delay: 1000, isCommand: false },
    { text: 'User root may run the following commands on server:', delay: 800, isCommand: false },
    { text: '    (ALL : ALL) ALL', delay: 600, isCommand: false },
    { text: 'root@server:~# cat /etc/shadow', delay: 1200, isCommand: true },
    { text: 'root:$6$tPuRrLlH$CzKDG...X/JxUj/:18955:0:99999:7:::', delay: 800, isCommand: false },
    { text: 'user:$6$ZlsLg5FN$xQAM...dVcCb3/:18956:0:99999:7:::', delay: 800, isCommand: false },
  ];

  // Function to start the animation sequence
  const startAnimation = () => {
    if (isAnimating) return;
    
    // Clear previous state and timers
    setCommands([]);
    setCurrentIndex(0);
    setIsAnimating(true);
    
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    // Start new animation
    intervalRef.current = window.setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        
        if (nextIndex < hackingSequence.length) {
          setCommands(prev => [...prev, hackingSequence[prevIndex]]);
          
          // Scroll to bottom
          if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
          }
          
          return nextIndex;
        } else {
          // End of sequence
          if (intervalRef.current) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          
          // Reset after delay
          if (resetTimeoutRef.current) {
            window.clearTimeout(resetTimeoutRef.current);
            resetTimeoutRef.current = null;
          }
          
          resetTimeoutRef.current = window.setTimeout(() => {
            setCommands([]);
            setCurrentIndex(0);
            setIsAnimating(false);
            // Restart animation
            startAnimation();
          }, 5000);
          
          return prevIndex;
        }
      });
    }, 1000); // Base interval speed
  };

  // Initial animation start and cursor blink effect
  useEffect(() => {
    startAnimation();
    
    // Blinking cursor effect
    cursorIntervalRef.current = window.setInterval(() => {
      setBlinkCursor(prev => !prev);
    }, 500);
    
    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (cursorIntervalRef.current) {
        window.clearInterval(cursorIntervalRef.current);
        cursorIntervalRef.current = null;
      }
      if (resetTimeoutRef.current) {
        window.clearTimeout(resetTimeoutRef.current);
        resetTimeoutRef.current = null;
      }
    };
  }, []);

  // Handle command execution with appropriate delays
  useEffect(() => {
    if (currentIndex > 0 && currentIndex < hackingSequence.length && intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
      
      const delay = hackingSequence[currentIndex - 1].delay;
      
      intervalRef.current = window.setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = prevIndex + 1;
          
          if (nextIndex < hackingSequence.length) {
            setCommands(prev => [...prev, hackingSequence[prevIndex]]);
            
            // Scroll to bottom
            if (terminalRef.current) {
              terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
            }
            
            return nextIndex;
          } else {
            // End of sequence
            if (intervalRef.current) {
              window.clearInterval(intervalRef.current);
              intervalRef.current = null;
            }
            
            // Reset after delay
            if (resetTimeoutRef.current) {
              window.clearTimeout(resetTimeoutRef.current);
              resetTimeoutRef.current = null;
            }
            
            resetTimeoutRef.current = window.setTimeout(() => {
              setCommands([]);
              setCurrentIndex(0);
              setIsAnimating(false);
              // Restart animation
              startAnimation();
            }, 5000);
            
            return prevIndex;
          }
        });
      }, delay);
    }
    
    return () => {
      if (intervalRef.current && currentIndex === hackingSequence.length) {
        window.clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [currentIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-full h-auto rounded-lg shadow-2xl overflow-hidden bg-black border border-gray-800"
    >
      <div className="flex items-center bg-gray-900 p-2 border-b border-gray-800">
        <div className="flex gap-2 ml-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="mx-auto text-xs text-gray-400 font-mono">
          root@gehini-cybersec: ~ [Hack Simulation Demo]
        </div>
      </div>
      <div 
        ref={terminalRef} 
        className="text-xs sm:text-sm bg-black text-green-400 font-mono p-4 overflow-auto h-[350px] scrollbar-thin scrollbar-thumb-gray-800"
      >
        {commands.map((cmd, index) => (
          <div 
            key={index} 
            className={`mb-1 ${cmd.isCommand ? 'text-white' : 'text-green-400'}`}
          >
            {cmd.text}
          </div>
        ))}
        {blinkCursor && <span className="inline-block w-2 h-4 bg-green-400 ml-1"></span>}
      </div>
    </motion.div>
  );
};

export default CyberTerminal; 