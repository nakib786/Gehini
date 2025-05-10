"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
    forwardRef,
    useImperativeHandle,
    useMemo,
    type ReactNode,
    type MouseEvent as ReactMouseEvent,
    type SVGProps,
} from 'react';
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
    type Transition,
    type VariantLabels,
    type Target,
    type AnimationControls,
    type TargetAndTransition,
    type Variants,
} from 'framer-motion';

function cn(...classes: (string | undefined | null | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}

interface RotatingTextRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

interface RotatingTextProps
  extends Omit<
    React.ComponentPropsWithoutRef<typeof motion.span>,
    "children" | "transition" | "initial" | "animate" | "exit"
  > {
  texts: string[];
  transition?: Transition;
  initial?: boolean | Target | VariantLabels;
  animate?: boolean | VariantLabels | AnimationControls | TargetAndTransition;
  exit?: Target | VariantLabels;
  animatePresenceMode?: "sync" | "wait";
  animatePresenceInitial?: boolean;
  rotationInterval?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "characters" | "words" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
}

const RotatingText = forwardRef<RotatingTextRef, RotatingTextProps>(
  (
    {
      texts,
      transition = { type: "spring", damping: 25, stiffness: 300 },
      initial = { y: "100%", opacity: 0 },
      animate = { y: 0, opacity: 1 },
      exit = { y: "-120%", opacity: 0 },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2200,
      staggerDuration = 0.01,
      staggerFrom = "last",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...rest
    },
    ref
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState<number>(0);

    const splitIntoCharacters = (text: string): string[] => {
      if (typeof Intl !== "undefined" && 'Segmenter' in Intl) {
        try {
           // @ts-ignore - Intl.Segmenter is available in newer browsers but TypeScript might not recognize it
           const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
           // @ts-ignore - segment is available when using Intl.Segmenter
           return Array.from(segmenter.segment(text), (segment) => segment.segment);
        } catch (error) {
           console.error("Intl.Segmenter failed, falling back to simple split:", error);
           return text.split('');
        }
      }
      return text.split('');
    };

    const elements = useMemo(() => {
        const currentText: string = texts[currentTextIndex] ?? '';
        if (splitBy === "characters") {
            const words = currentText.split(/(\s+)/);
            let charCount = 0;
            return words.filter(part => part.length > 0).map((part) => {
                const isSpace = /^\s+$/.test(part);
                const chars = isSpace ? [part] : splitIntoCharacters(part);
                const startIndex = charCount;
                charCount += chars.length;
                return { characters: chars, isSpace: isSpace, startIndex: startIndex };
            });
        }
        if (splitBy === "words") {
            return currentText.split(/(\s+)/).filter(word => word.length > 0).map((word, i) => ({
                characters: [word], isSpace: /^\s+$/.test(word), startIndex: i
            }));
        }
        if (splitBy === "lines") {
            return currentText.split('\n').map((line, i) => ({
                characters: [line], isSpace: false, startIndex: i
            }));
        }
        return currentText.split(splitBy).map((part, i) => ({
            characters: [part], isSpace: false, startIndex: i
        }));
    }, [texts, currentTextIndex, splitBy]);

    const totalElements = useMemo(() => elements.reduce((sum, el) => sum + el.characters.length, 0), [elements]);

    const getStaggerDelay = useCallback(
      (index: number, total: number): number => {
        if (total <= 1 || !staggerDuration) return 0;
        const stagger = staggerDuration;
        switch (staggerFrom) {
          case "first": return index * stagger;
          case "last": return (total - 1 - index) * stagger;
          case "center":
            const center = (total - 1) / 2;
            return Math.abs(center - index) * stagger;
          case "random": return Math.random() * (total - 1) * stagger;
          default:
            if (typeof staggerFrom === 'number') {
              const fromIndex = Math.max(0, Math.min(staggerFrom, total - 1));
              return Math.abs(fromIndex - index) * stagger;
            }
            return index * stagger;
        }
      },
      [staggerFrom, staggerDuration]
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext]
    );

    const next = useCallback(() => {
      const nextIndex = currentTextIndex === texts.length - 1 ? (loop ? 0 : currentTextIndex) : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex = currentTextIndex === 0 ? (loop ? texts.length - 1 : currentTextIndex) : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
      },
      [texts.length, currentTextIndex, handleIndexChange]
    );

     const reset = useCallback(() => {
        if (currentTextIndex !== 0) handleIndexChange(0);
     }, [currentTextIndex, handleIndexChange]);

    useImperativeHandle(ref, () => ({ next, previous, jumpTo, reset }), [next, previous, jumpTo, reset]);

    useEffect(() => {
      if (!auto || texts.length <= 1) return;
      const intervalId = setInterval(next, rotationInterval);
      return () => clearInterval(intervalId);
    }, [next, rotationInterval, auto, texts.length]);

    return (
      <motion.span
        className={cn("inline-flex flex-wrap whitespace-pre-wrap relative align-bottom pb-[10px]", mainClassName)}
        {...rest}
        layout
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>
        <AnimatePresence mode={animatePresenceMode} initial={animatePresenceInitial}>
          <motion.div
            key={currentTextIndex}
            className={cn(
               "inline-flex flex-wrap relative",
               splitBy === "lines" ? "flex-col items-start w-full" : "flex-row items-baseline"
            )}
            layout
            aria-hidden="true"
            initial="initial"
            animate="animate"
            exit="exit"
          >
             {elements.map((elementObj, elementIndex) => (
                <span
                    key={elementIndex}
                    className={cn("inline-flex", splitBy === 'lines' ? 'w-full' : '', splitLevelClassName)}
                    style={{ whiteSpace: 'pre' }}
                >
                    {elementObj.characters.map((char, charIndex) => {
                        const globalIndex = elementObj.startIndex + charIndex;
                        return (
                            <motion.span
                                key={`${char}-${charIndex}`}
                                initial={initial}
                                animate={animate}
                                exit={exit}
                                transition={{
                                    ...transition,
                                    delay: getStaggerDelay(globalIndex, totalElements),
                                }}
                                className={cn("inline-block leading-none tracking-tight", elementLevelClassName)}
                            >
                                {char === ' ' ? '\u00A0' : char}
                            </motion.span>
                        );
                     })}
                </span>
             ))}
          </motion.div>
        </AnimatePresence>
      </motion.span>
    );
  }
);
RotatingText.displayName = "RotatingText";

const ShinyText: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
    <span className={cn("relative overflow-hidden inline-block", className)}>
        {text}
        <span style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
            animation: 'shine 2s infinite linear',
            opacity: 0.5,
            pointerEvents: 'none'
        }}></span>
        <style>{`
            @keyframes shine {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
        `}</style>
    </span>
);

const ChevronDownIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3 h-3 ml-1 inline-block transition-transform duration-200 group-hover:rotate-180" {...props}>
     <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
   </svg>
);

const MenuIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
);

const CloseIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
);

const ExternalLinkIcon: React.FC<SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
  </svg>
);

interface NavLinkProps {
    href?: string;
    children: ReactNode;
    hasDropdown?: boolean;
    className?: string;
    onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
}

const NavLink: React.FC<NavLinkProps> = ({ href = "#", children, hasDropdown = false, className = "", onClick }) => (
   <motion.a
     href={href}
     onClick={onClick}
     className={cn("relative group text-sm font-medium text-gray-300 hover:text-white transition-colors duration-200 flex items-center py-1", className)}
     whileHover="hover"
   >
     {children}
     {hasDropdown && <ChevronDownIcon />}
     {!hasDropdown && (
         <motion.div
           className="absolute bottom-[-2px] left-0 right-0 h-[1px] bg-[#0CF2A0]"
           variants={{ initial: { scaleX: 0, originX: 0.5 }, hover: { scaleX: 1, originX: 0.5 } }}
           initial="initial"
           transition={{ duration: 0.3, ease: "easeOut" }}
         />
     )}
   </motion.a>
 );

interface DropdownMenuProps {
    children: ReactNode;
    isOpen: boolean;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ children, isOpen }) => (
   <AnimatePresence>
     {isOpen && (
       <motion.div
         initial={{ opacity: 0, y: 10, scale: 0.95 }}
         animate={{ opacity: 1, y: 0, scale: 1 }}
         exit={{ opacity: 0, y: 10, scale: 0.95, transition: { duration: 0.15 } }}
         transition={{ duration: 0.2, ease: "easeOut" }}
         className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-56 origin-top z-40"
       >
           <div className="bg-[#111111] border border-gray-700/50 rounded-md shadow-xl p-2">
               {children}
           </div>
       </motion.div>
     )}
   </AnimatePresence>
);

interface DropdownItemProps {
    href?: string;
    children: ReactNode;
    icon?: React.ReactElement<SVGProps<SVGSVGElement>>;
}

const DropdownItem: React.FC<DropdownItemProps> = ({ href = "#", children, icon }) => (
 <a
   href={href}
   className="group flex items-center justify-between w-full px-3 py-2 text-sm text-gray-300 hover:bg-gray-700/30 hover:text-white rounded-md transition-colors duration-150"
 >
   <span>{children}</span>
   {icon && React.cloneElement(icon, { className: "w-4 h-4 ml-1 opacity-70 group-hover:opacity-100 transition-opacity" })}
 </a>
);

interface Dot {
    x: number;
    y: number;
    baseColor: string;
    targetOpacity: number;
    currentOpacity: number;
    opacitySpeed: number;
    baseRadius: number;
    currentRadius: number;
}

// Form Modal Component
const FormModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
}> = ({ isOpen, onClose }) => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.3, type: "spring" }}
                        className="relative w-full max-w-lg p-6 mx-4 rounded-xl shadow-2xl bg-[#1a1a1a] border border-gray-700/50 max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-5">
                            <h3 className="text-xl font-semibold text-white">Start Your Learning Journey</h3>
                            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
                                <CloseIcon />
                            </button>
                        </div>
                        
                        <form
                            className="flex flex-col gap-4"
                            action="https://formsubmit.co/info@gehinigurukul.com"
                            method="POST"
                        >
                            {/* FormSubmit configuration */}
                            <input type="hidden" name="_subject" value="New Enrollment Inquiry" />
                            <input type="hidden" name="_captcha" value="false" />
                            <input type="hidden" name="_next" value="/thank-you" />
                            <input type="hidden" name="_template" value="table" />

                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Your name"
                                    required
                                    aria-label="Name"
                                    className="flex-grow w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0CF2A0] focus:border-transparent transition-all"
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Your email address"
                                    required
                                    aria-label="Email Address"
                                    className="flex-grow w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0CF2A0] focus:border-transparent transition-all"
                                />
                            </div>
                            <select
                                name="program_interest"
                                required
                                aria-label="Program Interest"
                                defaultValue=""
                                className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0CF2A0] focus:border-transparent transition-all appearance-none"
                                style={{ 
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23ffffff' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'right 0.75rem center',
                                    backgroundSize: '1rem'
                                }}
                            >
                                <option value="" disabled>Select program of interest</option>
                                <option value="K-12 Tutoring">K-12 Tutoring</option>
                                <option value="Math Excellence">Math Excellence</option>
                                <option value="Science Programs">Science Programs</option>
                                <option value="Cybersecurity">Cybersecurity</option>
                                <option value="Other">Other (Please specify below)</option>
                            </select>
                            <textarea
                                name="message"
                                placeholder="Additional comments or questions"
                                rows={3}
                                className="w-full px-4 py-2 rounded-md bg-[#2a2a2a] border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0CF2A0] focus:border-transparent transition-all resize-none"
                            />
                            <motion.button
                                type="submit"
                                className="w-full bg-[#0CF2A0] text-[#111111] px-5 py-3 rounded-md text-sm font-semibold hover:bg-opacity-90 transition-colors duration-200 shadow-sm hover:shadow-md flex-shrink-0"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Submit
                            </motion.button>
                            <p className="text-xs text-gray-500 text-center mt-2">
                                Your information will be sent securely to our admissions team who will contact you shortly
                            </p>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Rainbow Button Component
const RainbowButton: React.FC<{
    children: ReactNode;
    onClick?: () => void;
    className?: string;
}> = ({ children, onClick, className = "" }) => {
    return (
        <div className={`relative group inline-block ${className}`}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 rounded-full blur opacity-60 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <button
                onClick={onClick}
                className="relative px-8 py-3 bg-black rounded-full leading-none flex items-center justify-center space-x-1 font-medium text-white"
            >
                {children}
            </button>
            <style dangerouslySetInnerHTML={{ __html: `
                @keyframes tilt {
                    0%, 100% {
                        transform: translateY(0);
                    }
                    25% {
                        transform: translateY(-1px) translateX(1px);
                    }
                    50% {
                        transform: translateY(-1px) translateX(-1px);
                    }
                    75% {
                        transform: translateY(1px) translateX(-1px);
                    }
                }
                .animate-tilt {
                    animation: tilt 10s infinite linear;
                }
            `}} />
        </div>
    );
};

// Replace the EduTechAnimation component with this SmartBoardAnimation component
const SmartBoardAnimation: React.FC = () => {
    const boardRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentTool, setCurrentTool] = useState<'pen' | 'eraser' | 'pointer'>('pointer');
    const [penColor, setPenColor] = useState('#0CF2A0');
    const [penSize, setPenSize] = useState(3);
    const [drawingHistory, setDrawingHistory] = useState<ImageData[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const [activeTopic, setActiveTopic] = useState<string | null>(null);
    
    // Formula display states
    const [showMathFormula, setShowMathFormula] = useState(false);
    const [showCodingSnippet, setShowCodingSnippet] = useState(false);
    const [showScienceFormula, setShowScienceFormula] = useState(false);
    const [showCyberSecurityCode, setShowCyberSecurityCode] = useState(false);
    const [showEnglishContent, setShowEnglishContent] = useState(false);
    const [showRegionalContent, setShowRegionalContent] = useState(false);
    const [showEVSContent, setShowEVSContent] = useState(false);
    const [showSocialContent, setShowSocialContent] = useState(false);
    const [showArtContent, setShowArtContent] = useState(false);
    const [showMusicContent, setShowMusicContent] = useState(false);
    const [showPEContent, setShowPEContent] = useState(false);
    const [showMoralContent, setShowMoralContent] = useState(false);
    const [showGKContent, setShowGKContent] = useState(false);
    
    const [notes, setNotes] = useState('');
    const [showTutorial, setShowTutorial] = useState(false);
    
    const lastPos = useRef({ x: 0, y: 0 });
    const ctx = useRef<CanvasRenderingContext2D | null>(null);
    
    const topics = [
        { id: 'english', title: 'English', icon: '🔤', color: '#0EA5E9', content: 'Develop language skills through reading, writing, listening, and speaking activities.' },
        { id: 'regional', title: 'Regional Language', icon: 'अ', color: '#F43F5E', content: 'Learn Hindi or regional languages with vocabulary, grammar, and cultural context.' },
        { id: 'math', title: 'Mathematics', icon: '∑', color: '#EC4899', content: 'Algebraic equations, geometry, calculus, and mathematical reasoning to build strong foundations.' },
        { id: 'evs', title: 'Environmental Studies', icon: '🌿', color: '#22C55E', content: 'Learn about nature, environment, and our responsibility towards sustainable living.' },
        { id: 'science', title: 'Science', icon: '⚗️', color: '#8B5CF6', content: 'Virtual experiments in physics, chemistry, and biology with interactive simulations.' },
        { id: 'social', title: 'Social Studies', icon: '🌎', color: '#F97316', content: 'History, geography, civics, and economics for a well-rounded understanding of society.' },
        { id: 'coding', title: 'Computer Science', icon: '</>', color: '#3B82F6', content: 'Learn coding fundamentals through interactive projects in Python, JavaScript, and more.' },
        { id: 'art', title: 'Art & Craft', icon: '🎨', color: '#FB7185', content: 'Express creativity through various art forms and hands-on craft activities.' },
        { id: 'music', title: 'Music', icon: '🎵', color: '#06B6D4', content: 'Explore musical concepts, instruments, and cultural traditions in music.' },
        { id: 'pe', title: 'Physical Education', icon: '🏃', color: '#14B8A6', content: 'Develop physical fitness, sports skills, and health awareness through active learning.' },
        { id: 'moral', title: 'Moral Education', icon: '🧠', color: '#A855F7', content: 'Value-based education to develop ethics, character, and social responsibility.' },
        { id: 'gk', title: 'General Knowledge', icon: '💡', color: '#EAB308', content: 'Current affairs, trivia, and general awareness across various domains.' },
        { id: 'cyber', title: 'Cybersecurity', icon: '🔒', color: '#0CF2A0', content: 'Network security, ethical hacking, digital citizenship, and online safety practices.' }
    ];
    
    const mathFormula = `f(x) = \\int_{a}^{b} \\frac{1}{x^2} \\, dx = -\\frac{1}{x}\\big|_{a}^{b} = \\frac{1}{a} - \\frac{1}{b}`;
    
    const codingSnippet = `function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[0];
  const left = [];
  const right = [];
  
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }
  
  return [...quickSort(left), pivot, ...quickSort(right)];
}`;

    const scienceFormula = `E = mc² ⟹ m = E/c²
PV = nRT
F = G(m₁m₂)/r²
λ = h/p
ΔG = ΔH - TΔS`;

    const cyberSecurityCode = `function encryptData(data, key) {
  const algorithm = 'AES-256-GCM';
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(
    algorithm, key, iv);
    
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted,
    authTag: cipher.getAuthTag().toString('hex')
  };
}`;

    // Content for additional subjects
    const englishContent = `Parts of Speech:
• Nouns - person, place, thing, or idea
• Verbs - action or state of being
• Adjectives - describe nouns
• Adverbs - modify verbs, adjectives
• Pronouns - replace nouns
• Prepositions - show relationships
• Conjunctions - connect words or phrases
• Interjections - express emotion!`;

    const regionalContent = `हिंदी व्याकरण के मुख्य अंग:
• संज्ञा - किसी व्यक्ति, वस्तु, स्थान का नाम
• सर्वनाम - संज्ञा के स्थान पर प्रयोग
• विशेषण - संज्ञा की विशेषता बताता है
• क्रिया - कार्य या भाव का बोध
• अव्यय - जिसका रूप नहीं बदलता`;

    const evsContent = `Our Environment:
🌍 Air - Oxygen, nitrogen, carbon dioxide
🌊 Water - H₂O, essential for life
🏞️ Land - Soil, rocks, minerals
🌿 Living beings - Plants, animals
♻️ Conservation - Reduce, reuse, recycle`;

    const socialContent = `Important Historical Periods:
• Ancient Civilizations (3000 BCE-500 CE)
• Medieval Period (500-1500 CE)
• Renaissance (1300-1600 CE)
• Industrial Revolution (1760-1840)
• Modern Era (1900-present)

Geography Concepts:
• Continents, oceans, and major landforms
• Climate zones and weather patterns
• Natural resources and conservation`;

    const artContent = `🎨 Color Theory:
• Primary: Red, Yellow, Blue
• Secondary: Orange, Green, Purple
• Tertiary: Mix of primary & secondary
• Complementary: Opposite on color wheel
• Analogous: Adjacent on color wheel

✏️ Drawing Techniques:
• Contour Drawing
• Shading
• Perspective
• Proportion
• Texture`;

    const musicContent = `🎵 Music Notation:
𝄞 Treble Clef (G clef)
𝄢 Bass Clef (F clef)
𝄽 Quarter Note = 1 beat
𝅗𝅥 Half Note = 2 beats
𝅝 Whole Note = 4 beats

🎹 Major Scale: Do Re Mi Fa Sol La Ti Do
C  D  E  F  G  A  B  C`;

    const peContent = `Fitness Components:
• Cardiovascular Endurance
• Muscular Strength
• Muscular Endurance
• Flexibility
• Body Composition

Sports Skills:
• Locomotor: running, jumping
• Non-locomotor: bending, twisting
• Manipulative: throwing, catching`;

    const moralContent = `Core Values:
• Respect - For self and others
• Honesty - Truth and integrity
• Responsibility - Duty and accountability
• Compassion - Kindness and empathy
• Perseverance - Determination

"The best way to find yourself
is to lose yourself in the
service of others."
- Mahatma Gandhi`;

    const gkContent = `World Facts:
• 7 Continents: Asia, Africa, North America,
  South America, Antarctica, Europe, Australia
• 5 Oceans: Pacific, Atlantic, Indian,
  Southern, Arctic
• Tallest Mountain: Mount Everest (8,848m)
• Largest Country: Russia (17.1M km²)
• Most Populated: China & India (~1.4B each)`;
    
    useEffect(() => {
        if (canvasRef.current) {
            ctx.current = canvasRef.current.getContext('2d', { willReadFrequently: true });
            
            const resizeCanvas = () => {
                if (canvasRef.current && boardRef.current) {
                    const { width, height } = boardRef.current.getBoundingClientRect();
                    canvasRef.current.width = width;
                    canvasRef.current.height = height;
                    
                    // Restore the canvas state after resize
                    if (historyIndex >= 0 && drawingHistory.length > 0) {
                        const imageData = drawingHistory[historyIndex];
                        ctx.current?.putImageData(imageData, 0, 0);
                    } else {
                        // Clear the canvas if no history
                        ctx.current?.clearRect(0, 0, width, height);
                    }
                }
            };
            
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
            
            return () => {
                window.removeEventListener('resize', resizeCanvas);
            };
        }
    }, [drawingHistory, historyIndex]);
    
    const saveCurrentState = useCallback(() => {
        if (ctx.current && canvasRef.current) {
            const imageData = ctx.current.getImageData(
                0, 0, canvasRef.current.width, canvasRef.current.height
            );
            
            // Remove any states after the current index if we're in the middle of history
            const newHistory = drawingHistory.slice(0, historyIndex + 1);
            setDrawingHistory([...newHistory, imageData]);
            setHistoryIndex(newHistory.length);
        }
    }, [drawingHistory, historyIndex]);
    
    const startDrawing = useCallback((x: number, y: number) => {
        if (!ctx.current || currentTool === 'pointer') return;
        
        setIsDrawing(true);
        lastPos.current = { x, y };
        
        ctx.current.beginPath();
        ctx.current.moveTo(x, y);
        
        if (currentTool === 'pen') {
            ctx.current.strokeStyle = penColor;
            ctx.current.lineWidth = penSize;
            ctx.current.lineCap = 'round';
            ctx.current.lineJoin = 'round';
        } else if (currentTool === 'eraser') {
            ctx.current.strokeStyle = '#223344';
            ctx.current.lineWidth = penSize * 3;
            ctx.current.lineCap = 'round';
            ctx.current.lineJoin = 'round';
        }
    }, [currentTool, penColor, penSize]);
    
    const draw = useCallback((x: number, y: number) => {
        if (!isDrawing || !ctx.current) return;
        
        if (currentTool === 'pen') {
            ctx.current.lineTo(x, y);
            ctx.current.stroke();
        } else if (currentTool === 'eraser') {
            ctx.current.clearRect(x - penSize * 3, y - penSize * 3, penSize * 6, penSize * 6);
        }
        
        lastPos.current = { x, y };
    }, [isDrawing, currentTool, penSize]);
    
    const stopDrawing = useCallback(() => {
        if (isDrawing) {
            setIsDrawing(false);
            saveCurrentState();
        }
    }, [isDrawing, saveCurrentState]);
    
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        startDrawing(x, y);
    }, [startDrawing]);
    
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        draw(x, y);
    }, [draw]);
    
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!canvasRef.current || e.touches.length === 0) return;
        e.preventDefault();
        
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        startDrawing(x, y);
    }, [startDrawing]);
    
    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!canvasRef.current || e.touches.length === 0) return;
        e.preventDefault();
        
        const rect = canvasRef.current.getBoundingClientRect();
        const touch = e.touches[0];
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;
        
        draw(x, y);
    }, [draw]);
    
    const handleUndo = () => {
        if (historyIndex > 0) {
            setHistoryIndex(historyIndex - 1);
            if (ctx.current && canvasRef.current) {
                ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                ctx.current.putImageData(drawingHistory[historyIndex - 1], 0, 0);
            }
        } else if (historyIndex === 0) {
            // Clear canvas if at first state
            if (ctx.current && canvasRef.current) {
                ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                setHistoryIndex(-1);
            }
        }
    };
    
    const handleRedo = () => {
        if (historyIndex < drawingHistory.length - 1) {
            setHistoryIndex(historyIndex + 1);
            if (ctx.current) {
                ctx.current.putImageData(drawingHistory[historyIndex + 1], 0, 0);
            }
        }
    };
    
    const clearCanvas = () => {
        if (ctx.current && canvasRef.current) {
            ctx.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            saveCurrentState();
        }
    };
    
    const handleTopicSelect = (topicId: string) => {
        setActiveTopic(topicId === activeTopic ? null : topicId);
        
        // Reset all formula/snippet displays
        setShowMathFormula(false);
        setShowCodingSnippet(false);
        setShowScienceFormula(false);
        setShowCyberSecurityCode(false);
        setShowEnglishContent(false);
        setShowRegionalContent(false);
        setShowEVSContent(false);
        setShowSocialContent(false);
        setShowArtContent(false);
        setShowMusicContent(false);
        setShowPEContent(false);
        setShowMoralContent(false);
        setShowGKContent(false);
        
        // Set the appropriate formula/snippet display if selecting a new topic
        if (topicId !== activeTopic) {
            switch(topicId) {
                case 'math': 
                    setShowMathFormula(true);
                    break;
                case 'coding':
                    setShowCodingSnippet(true);
                    break;
                case 'science':
                    setShowScienceFormula(true);
                    break;
                case 'cyber':
                    setShowCyberSecurityCode(true);
                    break;
                case 'english':
                    setShowEnglishContent(true);
                    break;
                case 'regional':
                    setShowRegionalContent(true);
                    break;
                case 'evs':
                    setShowEVSContent(true);
                    break;
                case 'social':
                    setShowSocialContent(true);
                    break;
                case 'art':
                    setShowArtContent(true);
                    break;
                case 'music':
                    setShowMusicContent(true);
                    break;
                case 'pe':
                    setShowPEContent(true);
                    break;
                case 'moral':
                    setShowMoralContent(true);
                    break;
                case 'gk':
                    setShowGKContent(true);
                    break;
            }
        }
    };
    
    // Icon components
    const PenIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    
    const EraserIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1M15 7l2 2m1 1l2 2m-6-6l2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    
    const PointerIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 15l3-3m0 0l-3-3m3 3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    
    const UndoIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    
    const RedoIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    
    const TrashIcon = () => (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    );
    
    return (
        <div className="w-full h-[500px] rounded-xl relative bg-[#223344] overflow-hidden shadow-2xl border border-gray-700/50 flex flex-col">
            {/* Smart Board Header */}
            <div className="bg-[#1B2B3A] h-10 flex items-center justify-between px-4 border-b border-gray-700/50">
                <div className="flex items-center space-x-1">
                    <span className="text-white text-sm font-medium">Gehini Gurukul Interactive Board</span>
                    <span className="text-xs text-emerald-400 bg-emerald-900/30 px-1.5 py-0.5 rounded">Live</span>
                </div>
                <div className="flex items-center">
                    <button 
                        onClick={() => setShowTutorial(!showTutorial)}
                        className="text-xs text-gray-300 hover:text-white"
                    >
                        {showTutorial ? 'Hide' : 'Show'} Tutorial
                    </button>
                </div>
            </div>
            
            {/* Main Board Area */}
            <div className="flex flex-1 relative">
                {/* Left Tools Panel */}
                <div className="w-14 bg-[#1B2B3A] border-r border-gray-700/50 flex flex-col items-center py-3 gap-4">
                    <motion.button
                        className={`p-2 rounded-lg transition-colors ${currentTool === 'pointer' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                        onClick={() => setCurrentTool('pointer')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PointerIcon />
                    </motion.button>
                    
                    <motion.button
                        className={`p-2 rounded-lg transition-colors ${currentTool === 'pen' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                        onClick={() => setCurrentTool('pen')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PenIcon />
                    </motion.button>
                    
                    <motion.button
                        className={`p-2 rounded-lg transition-colors ${currentTool === 'eraser' ? 'bg-gray-600 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
                        onClick={() => setCurrentTool('eraser')}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <EraserIcon />
                    </motion.button>
                    
                    <div className="border-t border-gray-700/50 w-10 my-2"></div>
                    
                    {currentTool === 'pen' && (
                        <div className="flex flex-col items-center gap-2">
                            {['#0CF2A0', '#3B82F6', '#EC4899', '#8B5CF6', '#F97316'].map((color) => (
                                <motion.button
                                    key={color}
                                    className={`w-8 h-8 rounded-full border-2 ${penColor === color ? 'border-white' : 'border-transparent'}`}
                                    style={{ backgroundColor: color }}
                                    onClick={() => setPenColor(color)}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                />
                            ))}
                            
                            <div className="border-t border-gray-700/50 w-10 my-2"></div>
                            
                            {[2, 4, 6].map((size) => (
                                <motion.button
                                    key={size}
                                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${penSize === size ? 'bg-gray-600' : 'hover:bg-gray-700/50'}`}
                                    onClick={() => setPenSize(size)}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div 
                                        className="rounded-full bg-white" 
                                        style={{ width: size * 1.5, height: size * 1.5 }}
                                    ></div>
                                </motion.button>
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Main Drawing Area */}
                <div 
                    ref={boardRef} 
                    className="flex-1 relative bg-[#223344] group"
                >
                    <canvas
                        ref={canvasRef}
                        className={`absolute inset-0 ${currentTool === 'pointer' ? 'cursor-default' : ''} ${currentTool === 'pen' ? 'cursor-crosshair' : ''} ${currentTool === 'eraser' ? 'cursor-grab' : ''}`}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={stopDrawing}
                    />
                    
                    {/* Educational Topic Blocks with improved responsive layout */}
                    <div className="absolute top-4 left-4 right-4 flex flex-wrap gap-2 sm:gap-3 z-10">
                        <div className="w-full grid grid-cols-4 sm:grid-cols-6 md:flex md:flex-wrap gap-2 sm:gap-3">
                            {topics.map((topic) => (
                                <motion.div
                                    key={topic.id}
                                    className={`py-1 px-2 sm:px-3 sm:py-2 rounded-lg ${activeTopic === topic.id ? 'bg-white text-gray-800' : 'bg-gray-800/70 hover:bg-gray-700/80 text-white'} cursor-pointer flex items-center gap-1 sm:gap-2 justify-center`}
                                    onClick={() => handleTopicSelect(topic.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span style={{ color: topic.color }} className="text-lg sm:text-xl">{topic.icon}</span>
                                    <span className="hidden sm:inline text-sm font-medium truncate">{topic.title}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Animated Math Formula */}
                    {showMathFormula && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-pink-500/50 shadow-lg max-w-[90%] sm:max-w-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm sm:text-lg font-mono overflow-x-auto">
                                {mathFormula.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.03, duration: 0.3 }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Animated Coding Snippet with mobile optimization */}
                    {showCodingSnippet && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-blue-500/50 shadow-lg max-w-[90%] sm:max-w-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-xs sm:text-sm font-mono whitespace-pre overflow-x-auto code-scrollbar">
                                {codingSnippet.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.01, duration: 0.3 }}
                                        style={{
                                            color: 
                                                /function|return|for|if|else/.test(char + codingSnippet.slice(i+1).match(/^\w+/)?.[0] || '') ? '#3B82F6' :
                                                /\(|\)|{|}|\[|\]|;|,|\./.test(char) ? '#EC4899' :
                                                /\d/.test(char) ? '#F97316' :
                                                /\/\//.test(char + codingSnippet.slice(i+1).match(/^\/[\w]+/)?.[0] || '') ? '#9CA3AF' :
                                                '#0CF2A0'
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Animated Science Formula */}
                    {showScienceFormula && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-purple-500/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-lg font-mono space-y-1">
                                {scienceFormula.split('\n').map((line, lineIndex) => (
                                    <div key={lineIndex}>
                                        {line.split('').map((char, i) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 10 + i) * 0.02, duration: 0.3 }}
                                                style={{
                                                    color: 
                                                        /=/.test(char) ? '#F97316' :
                                                        /[΄²₁₂⟹]/.test(char) ? '#EC4899' :
                                                        /[EPVRTFG]/.test(char) ? '#3B82F6' :
                                                        /[Δλh]/.test(char) ? '#8B5CF6' :
                                                        /[cm\-]/.test(char) ? '#0CF2A0' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Animated Cybersecurity Code */}
                    {showCyberSecurityCode && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-green-500/50 shadow-lg max-w-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-mono whitespace-pre overflow-x-auto code-scrollbar">
                                {cyberSecurityCode.split('').map((char, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.01, duration: 0.3 }}
                                        style={{
                                            color: 
                                                /function|return|let|const|if|else/.test(char + cyberSecurityCode.slice(i+1).match(/^\w+/)?.[0] || '') ? '#0CF2A0' :
                                                /'[^']*'|"[^"]*"/.test(char + cyberSecurityCode.slice(i+1).match(/^['"][^'"]*['"]|^[^\s;,)]+/)?.[0] || '') ? '#F97316' :
                                                /crypto|createCipheriv|getAuthTag|toString|update|final/.test(char + cyberSecurityCode.slice(i+1).match(/^\w+/)?.[0] || '') ? '#3B82F6' :
                                                /\(|\)|{|}|\[|\]|;|,|\./.test(char) ? '#EC4899' :
                                                '#FFF'
                                        }}
                                    >
                                        {char}
                                    </motion.span>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* English Content */}
                    {showEnglishContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#0EA5E9]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {englishContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} className={lineIndex === 0 ? "text-[#0EA5E9] font-bold mb-2" : "ml-2"}>
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /•/.test(char) ? '#0EA5E9' :
                                                        /[-]/.test(char) ? '#F97316' :
                                                        line.includes('•') && line.indexOf(char) < line.indexOf('•') ? '#22C55E' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Regional Language Content with improved mobile display */}
                    {showRegionalContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-[#F43F5E]/50 shadow-lg max-w-[90%] sm:max-w-md"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-xs sm:text-sm font-medium max-w-md">
                                {regionalContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} className={lineIndex === 0 ? "text-[#F43F5E] font-bold mb-2" : "ml-2"}>
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /•/.test(char) ? '#F43F5E' :
                                                        /[-]/.test(char) ? '#F97316' :
                                                        line.includes('•') && line.indexOf(char) < line.indexOf('•') ? '#22C55E' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* EVS Content */}
                    {showEVSContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#22C55E]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {evsContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} className={lineIndex === 0 ? "text-[#22C55E] font-bold mb-2" : ""}>
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /[🌍🌊🏞️🌿♻️]/.test(char) ? '#22C55E' :
                                                        /[₂₃₄]/.test(char) ? '#F97316' :
                                                        /O|H|C/.test(char) ? '#0EA5E9' :
                                                        /-/.test(char) ? '#EC4899' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Social Studies Content */}
                    {showSocialContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#F97316]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {socialContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} 
                                        className={
                                            line.endsWith(':') ? "text-[#F97316] font-bold mt-2 mb-1" : 
                                            line.startsWith('•') ? "ml-2" : ""
                                        }
                                    >
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /•/.test(char) ? '#F97316' :
                                                        /\d/.test(char) ? '#3B82F6' :
                                                        /[(]/.test(char) ? '#8B5CF6' :
                                                        /[)]/.test(char) ? '#8B5CF6' :
                                                        /[-]/.test(char) ? '#EC4899' :
                                                        line.includes('•') && line.indexOf(char) < line.indexOf('•') ? '#22C55E' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Art & Craft Content */}
                    {showArtContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#FB7185]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {artContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} 
                                        className={
                                            line.includes('Color Theory') || line.includes('Drawing Techniques') ? "text-[#FB7185] font-bold mt-2 mb-1" : 
                                            line.startsWith('•') ? "ml-2" : ""
                                        }
                                    >
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /[🎨✏️]/.test(char) ? '#FB7185' :
                                                        /•/.test(char) ? '#FB7185' :
                                                        /Red|Orange/.test(char + artContent.slice(i+1).match(/^[A-Za-z]+/)?.[0] || '') ? '#F43F5E' :
                                                        /Yellow/.test(char + artContent.slice(i+1).match(/^[A-Za-z]+/)?.[0] || '') ? '#EAB308' :
                                                        /Blue|Tertiary/.test(char + artContent.slice(i+1).match(/^[A-Za-z]+/)?.[0] || '') ? '#0EA5E9' :
                                                        /Green/.test(char + artContent.slice(i+1).match(/^[A-Za-z]+/)?.[0] || '') ? '#22C55E' :
                                                        /Purple/.test(char + artContent.slice(i+1).match(/^[A-Za-z]+/)?.[0] || '') ? '#A855F7' :
                                                        /:/.test(char) ? '#FFF' :
                                                        line.includes(':') && line.indexOf(char) < line.indexOf(':') ? '#FB7185' :
                                                        /,/.test(char) ? '#EC4899' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Music Content */}
                    {showMusicContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#06B6D4]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {musicContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} 
                                        className={
                                            line.includes('Music Notation') || line.includes('Major Scale') ? "text-[#06B6D4] font-bold mt-2 mb-1" : 
                                            ""
                                        }
                                    >
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /[𝄞𝄢𝄽𝅗𝅥𝅝🎵🎹]/.test(char) ? '#06B6D4' :
                                                        /[CDEFGAB]/.test(char) ? '#F97316' :
                                                        /Do|Re|Mi|Fa|Sol|La|Ti/.test(char + musicContent.slice(i+1).match(/^[A-Za-z]+/)?.[0] || '') ? '#0EA5E9' :
                                                        /[=]/.test(char) ? '#22C55E' :
                                                        /[0-9]/.test(char) ? '#FB7185' :
                                                        /:/.test(char) ? '#FFF' :
                                                        line.includes(':') && line.indexOf(char) < line.indexOf(':') ? '#06B6D4' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Physical Education Content */}
                    {showPEContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#14B8A6]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {peContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} 
                                        className={
                                            line.endsWith(':') ? "text-[#14B8A6] font-bold mt-2 mb-1" : 
                                            line.startsWith('•') ? "ml-2" : ""
                                        }
                                    >
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /•/.test(char) ? '#14B8A6' :
                                                        /:/.test(char) ? '#FFF' :
                                                        line.includes(':') && line.indexOf(char) < line.indexOf(':') ? '#14B8A6' :
                                                        /Cardiovascular|Muscular|Flexibility|Body|Locomotor|Non-locomotor|Manipulative/.test(char + peContent.slice(i+1).match(/^[A-Za-z-]+/)?.[0] || '') ? '#0EA5E9' :
                                                        /[-,:]/.test(char) ? '#FB7185' :
                                                        line.includes('•') && line.indexOf(char) < line.indexOf('•') ? '#F97316' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Moral Education Content */}
                    {showMoralContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#A855F7]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {moralContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} 
                                        className={
                                            line.endsWith(':') ? "text-[#A855F7] font-bold mt-2 mb-1" : 
                                            line.startsWith('"') ? "mt-3 text-center italic" :
                                            line.startsWith('-') ? "text-right text-xs" :
                                            line.startsWith('•') ? "ml-2" : ""
                                        }
                                    >
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /•/.test(char) ? '#A855F7' :
                                                        /["-]/.test(char) ? '#FB7185' :
                                                        line.includes('-') ? '#FB7185' :
                                                        /Respect|Honesty|Responsibility|Compassion|Perseverance/.test(char + moralContent.slice(i+1).match(/^[A-Za-z]+/)?.[0] || '') ? '#0EA5E9' :
                                                        line.includes('•') && line.indexOf(char) < line.indexOf('•') ? '#F97316' :
                                                        /:/.test(char) ? '#FFF' :
                                                        line.includes(':') && line.indexOf(char) < line.indexOf(':') ? '#A855F7' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* General Knowledge Content */}
                    {showGKContent && (
                        <motion.div 
                            className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm p-4 rounded-xl border border-[#EAB308]/50 shadow-lg"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", bounce: 0.4 }}
                        >
                            <div className="text-white text-sm font-medium max-w-md">
                                {gkContent.split('\n').map((line: string, lineIndex: number) => (
                                    <div key={lineIndex} 
                                        className={
                                            line.endsWith(':') ? "text-[#EAB308] font-bold mt-2 mb-1" : 
                                            line.startsWith('•') ? "ml-2" : ""
                                        }
                                    >
                                        {line.split('').map((char: string, i: number) => (
                                            <motion.span
                                                key={`${lineIndex}-${i}`}
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: (lineIndex * 5 + i) * 0.01, duration: 0.2 }}
                                                style={{
                                                    color: 
                                                        /•/.test(char) ? '#EAB308' :
                                                        /\d/.test(char) ? '#0EA5E9' :
                                                        /[(),:]/.test(char) ? '#FB7185' :
                                                        /~|km²|m/.test(char + gkContent.slice(i+1).match(/^[A-Za-z0-9²]+/)?.[0] || '') ? '#22C55E' :
                                                        /Asia|Africa|North America|South America|Antarctica|Europe|Australia|Pacific|Atlantic|Indian|Southern|Arctic|Russia|China|India|Everest/.test(char + gkContent.slice(i+1).match(/^[A-Za-z ]+/)?.[0] || '') ? '#3B82F6' :
                                                        line.includes(':') && line.indexOf(char) < line.indexOf(':') ? '#EAB308' :
                                                        '#FFF'
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                    
                    {/* Topic content box with better mobile display */}
                    {activeTopic && (
                        <motion.div 
                            className="absolute bottom-4 left-4 right-4 bg-gray-900/70 backdrop-blur-sm p-3 sm:p-4 rounded-lg border border-gray-700/50"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                        >
                            <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2" style={{ color: topics.find(t => t.id === activeTopic)?.color }}>
                                {topics.find(t => t.id === activeTopic)?.title}
                            </h3>
                            <p className="text-gray-300 text-xs sm:text-sm">
                                {topics.find(t => t.id === activeTopic)?.content}
                            </p>
                        </motion.div>
                    )}
                    
                    {/* Tutorial overlay */}
                    {showTutorial && (
                        <motion.div
                            className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-20"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.div 
                                className="bg-gray-900 p-4 sm:p-6 rounded-xl max-w-[90%] sm:max-w-md text-center border border-[#0CF2A0]/50"
                                initial={{ scale: 0.9 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", bounce: 0.4 }}
                            >
                                <h3 className="text-[#0CF2A0] text-lg sm:text-xl font-bold mb-3 sm:mb-4">Welcome to the Interactive Smart Board</h3>
                                <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">
                                    Explore our educational content by clicking the topic buttons at the top.
                                    Use the drawing tools to interact with the board.
                                </p>
                                <ul className="text-left text-gray-300 mb-4 space-y-2 text-xs sm:text-sm">
                                    <li className="flex items-center gap-2">
                                        <span className="bg-gray-800 p-1 rounded"><PointerIcon /></span>
                                        <span>Select and interact with content</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="bg-gray-800 p-1 rounded"><PenIcon /></span>
                                        <span>Draw on the board</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <span className="bg-gray-800 p-1 rounded"><EraserIcon /></span>
                                        <span>Erase your drawings</span>
                                    </li>
                                </ul>
                                <motion.button
                                    className="bg-[#0CF2A0] text-gray-900 px-4 py-2 rounded-lg font-medium text-sm sm:text-base"
                                    onClick={() => setShowTutorial(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Start Exploring
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    )}
                </div>
                
                {/* Topic Information Panel with mobile optimization - hidden on mobile */}
                <div className="hidden sm:flex w-64 bg-[#1B2B3A] border-l border-gray-700/50 flex-col p-3">
                    <h3 className="text-white font-medium mb-2 text-sm">
                        {activeTopic ? `${topics.find(t => t.id === activeTopic)?.title} Information` : 'Subject Information'}
                    </h3>
                    
                    <div className="flex-1 bg-gray-800/50 border border-gray-700/50 rounded-lg p-3 text-gray-300 text-sm overflow-y-auto mb-3">
                        {!activeTopic ? (
                            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                                <svg className="w-8 h-8 mb-2 opacity-50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <p>Select a subject above to see details</p>
                            </div>
                        ) : (
                            <div className="space-y-3">
                                <div className="flex items-center">
                                    <span className="text-2xl mr-2" style={{ color: topics.find(t => t.id === activeTopic)?.color }}>
                                        {topics.find(t => t.id === activeTopic)?.icon}
                                    </span>
                                    <span className="font-medium" style={{ color: topics.find(t => t.id === activeTopic)?.color }}>
                                        {topics.find(t => t.id === activeTopic)?.title}
                                    </span>
                                </div>
                                
                                <p className="text-gray-300 text-xs">
                                    {topics.find(t => t.id === activeTopic)?.content}
                                </p>
                                
                                <div className="pt-2">
                                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2">Key Learning Points</h4>
                                    <ul className="space-y-1 text-xs">
                                        {activeTopic === 'english' && (
                                            <>
                                                <li>• Reading comprehension and analysis</li>
                                                <li>• Writing skills and composition</li>
                                                <li>• Grammar and vocabulary building</li>
                                                <li>• Speech and communication</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'regional' && (
                                            <>
                                                <li>• भाषा कौशल और व्याकरण</li>
                                                <li>• शब्द भंडार और वाक्य रचना</li>
                                                <li>• साहित्य और संस्कृति</li>
                                                <li>• अभिव्यक्ति और संचार</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'math' && (
                                            <>
                                                <li>• Numbers and operations</li>
                                                <li>• Algebra and functions</li>
                                                <li>• Geometry and measurement</li>
                                                <li>• Data analysis and probability</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'evs' && (
                                            <>
                                                <li>• Natural resources and conservation</li>
                                                <li>• Ecosystems and biodiversity</li>
                                                <li>• Environmental problems and solutions</li>
                                                <li>• Sustainable development</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'science' && (
                                            <>
                                                <li>• Scientific method and inquiry</li>
                                                <li>• Physics and physical sciences</li>
                                                <li>• Chemistry and material sciences</li>
                                                <li>• Biology and life sciences</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'social' && (
                                            <>
                                                <li>• History and civilization studies</li>
                                                <li>• Geography and spatial awareness</li>
                                                <li>• Political science and governance</li>
                                                <li>• Economics and resource management</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'coding' && (
                                            <>
                                                <li>• Programming fundamentals</li>
                                                <li>• Algorithms and problem-solving</li>
                                                <li>• Web development basics</li>
                                                <li>• App development introduction</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'art' && (
                                            <>
                                                <li>• Visual elements and principles</li>
                                                <li>• Drawing and painting techniques</li>
                                                <li>• Craft making and 3D design</li>
                                                <li>• Art history and appreciation</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'music' && (
                                            <>
                                                <li>• Music theory and notation</li>
                                                <li>• Instrumental basics</li>
                                                <li>• Vocal training fundamentals</li>
                                                <li>• Music history and genres</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'pe' && (
                                            <>
                                                <li>• Physical fitness development</li>
                                                <li>• Motor skills and coordination</li>
                                                <li>• Sports rules and gameplay</li>
                                                <li>• Health and nutrition</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'moral' && (
                                            <>
                                                <li>• Character development</li>
                                                <li>• Ethical decision making</li>
                                                <li>• Social responsibility</li>
                                                <li>• Emotional intelligence</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'gk' && (
                                            <>
                                                <li>• Current affairs and world events</li>
                                                <li>• Places, people, and cultures</li>
                                                <li>• Science and technology advancements</li>
                                                <li>• Arts, sports, and entertainment</li>
                                            </>
                                        )}
                                        
                                        {activeTopic === 'cyber' && (
                                            <>
                                                <li>• Online safety and privacy</li>
                                                <li>• Cybersecurity basics</li>
                                                <li>• Digital citizenship</li>
                                                <li>• Ethical computing</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                                
                                <div className="pt-2">
                                    <h4 className="text-xs uppercase tracking-wide text-gray-500 font-medium mb-2">Teaching Methodology</h4>
                                    <div className="flex flex-wrap gap-1 text-xs">
                                        <span className="px-2 py-1 bg-gray-700/50 rounded-md">Interactive</span>
                                        <span className="px-2 py-1 bg-gray-700/50 rounded-md">Hands-on</span>
                                        <span className="px-2 py-1 bg-gray-700/50 rounded-md">Visual</span>
                                        <span className="px-2 py-1 bg-gray-700/50 rounded-md">Project-based</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    
                    <div className="flex gap-2 justify-between">
                        <motion.button
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
                            onClick={handleUndo}
                            disabled={historyIndex < 0}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <UndoIcon />
                        </motion.button>
                        
                        <motion.button
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
                            onClick={handleRedo}
                            disabled={historyIndex >= drawingHistory.length - 1}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <RedoIcon />
                        </motion.button>
                        
                        <motion.button
                            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
                            onClick={clearCanvas}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <TrashIcon />
                        </motion.button>
                    </div>
                </div>
                
                {/* Mobile-only floating action buttons */}
                <div className="sm:hidden absolute bottom-4 right-4 flex gap-2 bg-gray-900/70 backdrop-blur-sm p-2 rounded-lg border border-gray-700/50">
                    <motion.button
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
                        onClick={handleUndo}
                        disabled={historyIndex < 0}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <UndoIcon />
                    </motion.button>
                    
                    <motion.button
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
                        onClick={handleRedo}
                        disabled={historyIndex >= drawingHistory.length - 1}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <RedoIcon />
                    </motion.button>
                    
                    <motion.button
                        className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-700/50"
                        onClick={clearCanvas}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <TrashIcon />
                    </motion.button>
                </div>
            </div>
            <style dangerouslySetInnerHTML={{ __html: `
                .code-scrollbar::-webkit-scrollbar {
                    height: 4px;
                    width: 4px;
                }
                .code-scrollbar::-webkit-scrollbar-thumb {
                    background-color: rgba(255,255,255,0.1);
                    border-radius: 2px;
                }
                .code-scrollbar::-webkit-scrollbar-track {
                    background-color: transparent;
                }
                @media (max-width: 640px) {
                    .code-scrollbar {
                        font-size: 10px;
                    }
                }
            `}} />
        </div>
    );
};

const InteractiveHero: React.FC = () => {
   const canvasRef = useRef<HTMLCanvasElement>(null);
   const animationFrameId = useRef<number | null>(null);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const [isScrolled, setIsScrolled] = useState<boolean>(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isMobile, setIsMobile] = useState<boolean>(false);

   const { scrollY } = useScroll();
   useMotionValueEvent(scrollY, "change", (latest) => {
       setIsScrolled(latest > 10);
   });

   const dotsRef = useRef<Dot[]>([]);
   const gridRef = useRef<Record<string, number[]>>({});
   const canvasSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
   const mousePositionRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });

   // Adjust spacing and parameters for mobile
   const getResponsiveValues = useCallback(() => {
     if (isMobile) {
       return {
         dotSpacing: 35,
         baseOpacityMin: 0.35,
         baseOpacityMax: 0.45,
         baseRadius: 1,
         interactionRadius: 100,
         opacityBoost: 0.5,
         radiusBoost: 2,
         gridCellSize: 50
       };
     }
     return {
       dotSpacing: 25,
       baseOpacityMin: 0.40,
       baseOpacityMax: 0.50,
       baseRadius: 1,
       interactionRadius: 150,
       opacityBoost: 0.6,
       radiusBoost: 2.5,
       gridCellSize: Math.max(50, Math.floor(150 / 1.5))
     };
   }, [isMobile]);

   const {
     dotSpacing: DOT_SPACING,
     baseOpacityMin: BASE_OPACITY_MIN,
     baseOpacityMax: BASE_OPACITY_MAX,
     baseRadius: BASE_RADIUS,
     interactionRadius: INTERACTION_RADIUS,
     opacityBoost: OPACITY_BOOST,
     radiusBoost: RADIUS_BOOST,
     gridCellSize: GRID_CELL_SIZE
   } = getResponsiveValues();

   const INTERACTION_RADIUS_SQ = INTERACTION_RADIUS * INTERACTION_RADIUS;

   const updateInteractionPosition = useCallback((clientX: number, clientY: number) => {
        const canvas = canvasRef.current;
        if (!canvas) {
            mousePositionRef.current = { x: null, y: null };
            return;
        }
        const rect = canvas.getBoundingClientRect();
        const canvasX = clientX - rect.left;
        const canvasY = clientY - rect.top;
        mousePositionRef.current = { x: canvasX, y: canvasY };
   }, []);

   const handleMouseMove = useCallback((event: globalThis.MouseEvent) => {
        updateInteractionPosition(event.clientX, event.clientY);
   }, [updateInteractionPosition]);

   const handleTouchMove = useCallback((event: TouchEvent) => {
        if (event.touches && event.touches.length > 0) {
            const touch = event.touches[0];
            updateInteractionPosition(touch.clientX, touch.clientY);
        }
   }, [updateInteractionPosition]);

   const handleTouchStart = useCallback((event: TouchEvent) => {
        if (event.touches && event.touches.length > 0) {
            const touch = event.touches[0];
            updateInteractionPosition(touch.clientX, touch.clientY);
        }
   }, [updateInteractionPosition]);

   const handleTouchEnd = useCallback(() => {
        mousePositionRef.current = { x: null, y: null };
   }, []);

   const createDots = useCallback(() => {
       const { width, height } = canvasSizeRef.current;
       if (width === 0 || height === 0) return;

       // Reduce number of dots for mobile to improve performance
       const spacing = isMobile ? DOT_SPACING * 1.5 : DOT_SPACING;
       
       const newDots: Dot[] = [];
       const newGrid: Record<string, number[]> = {};
       const cols = Math.ceil(width / spacing);
       const rows = Math.ceil(height / spacing);

       for (let i = 0; i < cols; i++) {
           for (let j = 0; j < rows; j++) {
               const x = i * spacing + spacing / 2;
               const y = j * spacing + spacing / 2;
               const cellX = Math.floor(x / GRID_CELL_SIZE);
               const cellY = Math.floor(y / GRID_CELL_SIZE);
               const cellKey = `${cellX}_${cellY}`;

               if (!newGrid[cellKey]) {
                   newGrid[cellKey] = [];
               }

               const dotIndex = newDots.length;
               newGrid[cellKey].push(dotIndex);

               const baseOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
               newDots.push({
                   x,
                   y,
                   baseColor: `rgba(87, 220, 205, ${BASE_OPACITY_MAX})`,
                   targetOpacity: baseOpacity,
                   currentOpacity: baseOpacity,
                   opacitySpeed: (Math.random() * 0.005) + 0.002,
                   baseRadius: BASE_RADIUS,
                   currentRadius: BASE_RADIUS,
               });
           }
       }
       dotsRef.current = newDots;
       gridRef.current = newGrid;
   }, [DOT_SPACING, GRID_CELL_SIZE, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS, isMobile]);

   const handleResize = useCallback(() => {
       const canvas = canvasRef.current;
       if (!canvas) return;
       const container = canvas.parentElement;
       const width = container ? container.clientWidth : window.innerWidth;
       const height = container ? container.clientHeight : window.innerHeight;

       // Check if viewport is mobile
       const newIsMobile = window.innerWidth < 768;
       if (newIsMobile !== isMobile) {
           setIsMobile(newIsMobile);
       }

       if (canvas.width !== width || canvas.height !== height ||
           canvasSizeRef.current.width !== width || canvasSizeRef.current.height !== height)
       {
           canvas.width = width;
           canvas.height = height;
           canvasSizeRef.current = { width, height };
           createDots();
       }
   }, [createDots, isMobile]);

   const animateDots = useCallback(() => {
       const canvas = canvasRef.current;
       const ctx = canvas?.getContext('2d');
       const dots = dotsRef.current;
       const grid = gridRef.current;
       const { width, height } = canvasSizeRef.current;
       const { x: mouseX, y: mouseY } = mousePositionRef.current;

       if (!ctx || !dots || !grid || width === 0 || height === 0) {
           animationFrameId.current = requestAnimationFrame(animateDots);
           return;
       }

       ctx.clearRect(0, 0, width, height);

       // Optimize for mobile: only animate dots when interacting or based on proximity to viewport center
       const shouldAnimate = !isMobile || mouseX !== null || mouseY !== null;
       
       // For mobile, create gentle animation near the viewport center when not touching
       const centerX = isMobile && mouseX === null ? width / 2 : mouseX;
       const centerY = isMobile && mouseY === null ? height / 2 : mouseY;
       
       const activeDotIndices = new Set<number>();
       if (centerX !== null && centerY !== null) {
           const mouseCellX = Math.floor(centerX / GRID_CELL_SIZE);
           const mouseCellY = Math.floor(centerY / GRID_CELL_SIZE);
           const searchRadius = Math.ceil(INTERACTION_RADIUS / GRID_CELL_SIZE);
           for (let i = -searchRadius; i <= searchRadius; i++) {
               for (let j = -searchRadius; j <= searchRadius; j++) {
                   const checkCellX = mouseCellX + i;
                   const checkCellY = mouseCellY + j;
                   const cellKey = `${checkCellX}_${checkCellY}`;
                   if (grid[cellKey]) {
                       grid[cellKey].forEach(dotIndex => activeDotIndices.add(dotIndex));
                   }
               }
           }
       }

       // For mobile, animate fewer dots for better performance
       const dotStep = isMobile ? 2 : 1;
       for (let i = 0; i < dots.length; i += dotStep) {
           const dot = dots[i];
           
           dot.currentOpacity += dot.opacitySpeed;
           if (dot.currentOpacity >= dot.targetOpacity || dot.currentOpacity <= BASE_OPACITY_MIN) {
               dot.opacitySpeed = -dot.opacitySpeed;
               dot.currentOpacity = Math.max(BASE_OPACITY_MIN, Math.min(dot.currentOpacity, BASE_OPACITY_MAX));
               dot.targetOpacity = Math.random() * (BASE_OPACITY_MAX - BASE_OPACITY_MIN) + BASE_OPACITY_MIN;
           }

           let interactionFactor = 0;
           dot.currentRadius = dot.baseRadius;

           if (shouldAnimate && centerX !== null && centerY !== null && activeDotIndices.has(i)) {
               const dx = dot.x - centerX;
               const dy = dot.y - centerY;
               const distSq = dx * dx + dy * dy;

               if (distSq < INTERACTION_RADIUS_SQ) {
                   const distance = Math.sqrt(distSq);
                   
                   // For mobile auto-animation (no touch), use gentler effect
                   if (isMobile && mouseX === null && mouseY === null) {
                       // Create subtle pulsing effect
                       const time = performance.now() / 1000;
                       const pulseScale = (Math.sin(time + dot.x * 0.01 + dot.y * 0.01) + 1) / 2;
                       interactionFactor = Math.max(0, 0.3 - distance / INTERACTION_RADIUS) * pulseScale;
                   } else {
                       interactionFactor = Math.max(0, 1 - distance / INTERACTION_RADIUS);
                       interactionFactor = interactionFactor * interactionFactor;
                   }
               }
           }

           const finalOpacity = Math.min(1, dot.currentOpacity + interactionFactor * OPACITY_BOOST);
           dot.currentRadius = dot.baseRadius + interactionFactor * RADIUS_BOOST;

           const colorMatch = dot.baseColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
           const r = colorMatch ? colorMatch[1] : '87';
           const g = colorMatch ? colorMatch[2] : '220';
           const b = colorMatch ? colorMatch[3] : '205';

           ctx.beginPath();
           ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity.toFixed(3)})`;
           ctx.arc(dot.x, dot.y, dot.currentRadius, 0, Math.PI * 2);
           ctx.fill();
       }

       animationFrameId.current = requestAnimationFrame(animateDots);
   }, [GRID_CELL_SIZE, INTERACTION_RADIUS, INTERACTION_RADIUS_SQ, OPACITY_BOOST, RADIUS_BOOST, BASE_OPACITY_MIN, BASE_OPACITY_MAX, BASE_RADIUS, isMobile]);

   useEffect(() => {
       handleResize();
       const canvasElement = canvasRef.current;
       
       const handleMouseLeave = () => {
           mousePositionRef.current = { x: null, y: null };
       };

       // Add event listeners for both mouse and touch events
       window.addEventListener('mousemove', handleMouseMove, { passive: true });
       window.addEventListener('touchmove', handleTouchMove, { passive: true });
       window.addEventListener('touchstart', handleTouchStart, { passive: true });
       window.addEventListener('touchend', handleTouchEnd, { passive: true });
       window.addEventListener('resize', handleResize);
       document.documentElement.addEventListener('mouseleave', handleMouseLeave);

       // Create auto animation
       animationFrameId.current = requestAnimationFrame(animateDots);

       return () => {
           window.removeEventListener('resize', handleResize);
           window.removeEventListener('mousemove', handleMouseMove);
           window.removeEventListener('touchmove', handleTouchMove);
           window.removeEventListener('touchstart', handleTouchStart);
           window.removeEventListener('touchend', handleTouchEnd);
           document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
           if (animationFrameId.current) {
               cancelAnimationFrame(animationFrameId.current);
           }
       };
   }, [handleResize, handleMouseMove, handleTouchMove, handleTouchStart, handleTouchEnd, animateDots]);

   useEffect(() => {
       // Apply mobile optimization whenever isMobile changes
       createDots();
   }, [isMobile, createDots]);

   useEffect(() => {
       if (isMobileMenuOpen) {
           document.body.style.overflow = 'hidden';
       } else {
           document.body.style.overflow = 'unset';
       }
       return () => { document.body.style.overflow = 'unset'; };
   }, [isMobileMenuOpen]);

   const headerVariants: Variants = {
       top: {
           backgroundColor: "rgba(17, 17, 17, 0.8)",
           borderBottomColor: "rgba(55, 65, 81, 0.5)",
           position: 'fixed',
           boxShadow: 'none',
       },
       scrolled: {
           backgroundColor: "rgba(17, 17, 17, 0.95)",
           borderBottomColor: "rgba(75, 85, 99, 0.7)",
           boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
           position: 'fixed'
       }
   };

   const mobileMenuVariants: Variants = {
       hidden: { opacity: 0, y: -20 },
       visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
       exit: { opacity: 0, y: -20, transition: { duration: 0.15, ease: "easeIn" } }
   };

    const contentDelay = 0.3;
    const itemDelayIncrement = 0.1;

    const bannerVariants: Variants = {
        hidden: { opacity: 0, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: contentDelay } }
    };
   const headlineVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement } }
    };
    const subHeadlineVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 2 } }
    };
    const formVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 3 } }
    };
    const trialTextVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 4 } }
    };
    const worksWithVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5, delay: contentDelay + itemDelayIncrement * 5 } }
    };
    const imageVariants: Variants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, delay: contentDelay + itemDelayIncrement * 6, ease: [0.16, 1, 0.3, 1] } }
    };

  return (
    <div className="pt-[100px] relative bg-[#111111] text-gray-300 min-h-screen flex flex-col overflow-hidden">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-80" />
        <div className="absolute inset-0 z-1 pointer-events-none" style={{
            background: 'linear-gradient(to bottom, transparent 0%, #111111 90%), radial-gradient(ellipse at center, transparent 40%, #111111 95%)'
        }}></div>

        <FormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

        <main className="flex-grow flex flex-col items-center justify-center text-center px-4 pt-8 pb-16 relative z-10">

            <motion.div
                variants={bannerVariants}
                initial="hidden"
                animate="visible"
                className="mb-6"
            >
                <ShinyText text="Nurturing Minds, Building Futures" className="bg-[#1a1a1a] border border-gray-700 text-[#0CF2A0] px-4 py-1 rounded-full text-xs sm:text-sm font-medium cursor-pointer hover:border-[#0CF2A0]/50 transition-colors" />
            </motion.div>

            <motion.h1
                variants={headlineVariants}
                initial="hidden"
                animate="visible"
                className="text-4xl sm:text-5xl lg:text-[64px] font-semibold text-white leading-tight max-w-4xl mb-4"
            >
                Education with a<br />{' '}
                <span className="inline-block h-[1.2em] sm:h-[1.2em] lg:h-[1.2em] overflow-hidden align-bottom">
                    <RotatingText
                        texts={['Mother\'s Touch', 'Patient Approach', 'Nurturing Care', 'Personal Attention', 'Strong Foundation']}
                        mainClassName="text-[#0CF2A0] mx-1"
                        staggerFrom={"last"}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: "110%", opacity: 0 }}
                        staggerDuration={0.01}
                        transition={{ type: "spring", damping: 18, stiffness: 250 }}
                        rotationInterval={2200}
                        splitBy="characters"
                        auto={true}
                        loop={true}
                    />
                </span>
            </motion.h1>

            <motion.p
                variants={subHeadlineVariants}
                initial="hidden"
                animate="visible"
                className="text-base sm:text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto mb-8"
            >
                At Gehini Gurukul, we believe in the power of nurturing education – from comprehensive K-12 tutoring to specialized cybersecurity training, all delivered with the care and patience of a mother.
            </motion.p>

            <motion.div
                variants={formVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md mx-auto mb-4 flex justify-center"
            >
                <RainbowButton onClick={() => setIsModalOpen(true)}>
                    Start Learning Journey
                </RainbowButton>
            </motion.div>

            <motion.p
                variants={trialTextVariants}
                initial="hidden"
                animate="visible"
                className="text-xs text-gray-500 mb-10"
            >
                Click here for a free consultation
            </motion.p>

            <motion.div
                variants={worksWithVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center justify-center space-y-2 mb-10"
            >
                <span className="text-xs uppercase text-gray-500 tracking-wider font-medium">Our Programs</span>
                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-gray-400">
                    <span className="flex items-center whitespace-nowrap">K-12 Tutoring</span>
                    <span className="flex items-center whitespace-nowrap">Math Excellence</span>
                    <span className="flex items-center whitespace-nowrap">Science Programs</span>
                    <span className="flex items-center whitespace-nowrap">Cybersecurity</span>
                    <span className="flex items-center whitespace-nowrap">Personalized Learning</span>
                </div>
            </motion.div>

            <motion.div
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-4xl mx-auto px-4 sm:px-0 overflow-hidden"
            >
                <SmartBoardAnimation />
            </motion.div>
        </main>

    </div>
  );
};

export default InteractiveHero;