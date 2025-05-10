import * as React from "react";
import { useEffect, useState } from "react";
import { Book, ChevronDown, ChevronRight, GraduationCap, Menu, School, Shield, Sunset, Trees, Zap, Sparkles } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  image?: string;
  label?: string;
  items?: MenuItem[];
}

interface Navbar1Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
  isDarkMode?: boolean;
}

// TypewriterEffect component for animating text
const TypewriterEffect = ({ text, loop = true }: { text: string, loop?: boolean }) => {
  const [displayText, setDisplayText] = useState("");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState("forward");
  
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    
    if (direction === "forward") {
      if (index < text.length) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev + text[index]);
          setIndex(prevIndex => prevIndex + 1);
        }, 150); // typing speed
      } else {
        timer = setTimeout(() => {
          setDirection("backward");
        }, 2000); // pause at full text
      }
    } else {
      if (index > 0) {
        timer = setTimeout(() => {
          setDisplayText(prev => prev.slice(0, -1));
          setIndex(prevIndex => prevIndex - 1);
        }, 75); // erasing speed (faster than typing)
      } else {
        if (loop) {
          timer = setTimeout(() => {
            setDirection("forward");
          }, 1000); // pause before restarting
        }
      }
    }
    
    return () => clearTimeout(timer);
  }, [index, direction, text, loop]);
  
  return (
    <span className="relative">
      {displayText}
      <span className="absolute right-[-2px] top-0 h-full w-[2px] bg-[#0CF2A0] animate-blink"></span>
    </span>
  );
};

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://www.shadcnblocks.com/images/block/block-1.svg",
    alt: "logo",
    title: "Gehini",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Services",
      url: "#",
      items: [
        {
          title: "K-12 Tutoring",
          description: "Personalized tutoring for K-12 students",
          icon: <GraduationCap className="size-5 shrink-0" />,
          url: "/services/tutoring",
        },
        {
          title: "Cybersecurity",
          description: "Cybersecurity education and training",
          icon: <Shield className="size-5 shrink-0" />,
          url: "/services/cybersecurity",
        },
        {
          title: "Online Courses",
          description: "Self-paced online learning programs",
          icon: <Book className="size-5 shrink-0" />,
          url: "/services/courses",
        },
        {
          title: "Career Guidance",
          description: "Expert career counseling and planning",
          icon: <Sparkles className="size-5 shrink-0" />,
          url: "/services/career",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Help Center",
          description: "Get all the answers you need right here",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/help",
        },
        {
          title: "Contact Us",
          description: "We are here to help you with any questions you have",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/contact",
        },
        {
          title: "Status",
          description: "Check the current status of our services and APIs",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/status",
        },
        {
          title: "Documentation",
          description: "Detailed guides and API documentation",
          icon: <Book className="size-5 shrink-0" />,
          url: "/docs",
        },
      ],
    },
    {
      title: "Pricing",
      url: "/pricing",
    },
    {
      title: "About",
      url: "/about",
    },
  ],
  mobileExtraLinks = [
    { name: "Legal", url: "/legal" },
    { name: "Privacy", url: "/privacy" },
    { name: "Terms", url: "/terms" },
    { name: "FAQ", url: "/faq" },
  ],
  auth = {
    login: { text: "Log in", url: "/login" },
    signup: { text: "Sign up", url: "/signup" },
  },
  isDarkMode = true,
}: Navbar1Props) => {
  return (
    <section className="py-4 px-4">
      <div className="max-w-4xl mx-auto bg-transparent backdrop-blur-sm rounded-xl shadow-lg px-6 py-4 border border-[#0CF2A0]/50 shadow-[0_0_15px_rgba(12,242,160,0.3)] text-white group hover:border-[#0CF2A0] transition-all duration-300">
        <nav className="hidden lg:flex justify-center">
          <div className="flex items-center gap-8">
            <a href={logo.url} className="flex items-center gap-3 relative">
              <div className="relative">
                <img 
                  src={logo.src} 
                  className="w-10 transition-all duration-300 relative z-10" 
                  alt={logo.alt} 
                />
                <img 
                  src={logo.src} 
                  className="absolute top-0 left-0 w-10 opacity-0 group-hover:opacity-100 group-hover:scale-[3] group-hover:-translate-x-8 group-hover:rotate-3 group-hover:brightness-125 group-hover:z-50 transition-all duration-500 origin-center transform drop-shadow-xl filter bg-transparent" 
                  alt={logo.alt} 
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(12,242,160,0.5))",
                  }}
                />
              </div>
              <span className="text-xl font-semibold text-white group-hover:text-[#0CF2A0] transition-colors duration-300">
                <TypewriterEffect text="Gehini Gurukul" />
              </span>
            </a>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
        </nav>
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <a href={logo.url} className="flex items-center gap-2 relative">
              <div className="relative">
                <img 
                  src={logo.src} 
                  className="w-8 transition-all duration-300 relative z-10" 
                  alt={logo.alt} 
                />
                <img 
                  src={logo.src} 
                  className="absolute top-0 left-0 w-8 opacity-0 hover:opacity-100 hover:scale-[3] hover:-translate-x-8 hover:rotate-3 hover:brightness-125 hover:z-50 transition-all duration-500 origin-center transform bg-transparent" 
                  alt={logo.alt} 
                  style={{
                    filter: "drop-shadow(0 0 15px rgba(12,242,160,0.5))",
                  }}
                />
              </div>
              <span className="text-lg font-semibold text-white hover:text-[#0CF2A0] transition-colors duration-300">
                <TypewriterEffect text="Gehini Gurukul" />
              </span>
            </a>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full bg-transparent hover:bg-transparent/20 border-white/30">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <a href={logo.url} className="flex items-center gap-2">
                      <img src={logo.src} className="w-8" alt={logo.alt} />
                      <span className="text-lg font-semibold text-white">
                        <TypewriterEffect text="Gehini Gurukul" />
                      </span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <a
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0CF2A0]/10 hover:text-[#0CF2A0]"
                          href={link.url}
                        >
                          {link.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items && item.title === "Services") {
    return (
      <NavigationMenuItem key={item.title} className="text-white">
        <div className="relative">
          <button className="group inline-flex h-10 items-center justify-center rounded-full px-5 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#0CF2A0]/10 hover:text-[#0CF2A0] gap-1 peer">
            {item.title}
            <ChevronDown className="h-4 w-4 transition-transform duration-200 peer-hover:rotate-180" />
          </button>
          <div className="absolute left-0 top-full z-10 mt-2 w-[500px] origin-top-left scale-95 opacity-0 pointer-events-none transition-all duration-200 peer-hover:scale-100 peer-hover:opacity-100 peer-hover:pointer-events-auto hover:scale-100 hover:opacity-100 hover:pointer-events-auto">
            <div className="overflow-hidden rounded-xl border border-[#0CF2A0]/30 bg-black/80 backdrop-blur-lg shadow-lg shadow-[#0CF2A0]/20">
              <div className="p-4">
                <div className="mb-2 text-[#0CF2A0] text-sm font-medium">Services</div>
                <div className="grid grid-cols-2 gap-4">
                  {item.items.map((subItem) => (
                    <a
                      key={subItem.title}
                      href={subItem.url}
                      className="block rounded-lg p-3 hover:bg-[#0CF2A0]/10 transition-colors"
                    >
                      <div className="flex flex-col space-y-1.5">
                        <div className="font-medium text-white">{subItem.title}</div>
                        <p className="text-sm text-white/70">
                          {subItem.description}
                        </p>
                        <div className="text-[#0CF2A0] text-sm flex items-center mt-1">
                          Learn more <ChevronRight className="h-3 w-3 ml-1" />
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </NavigationMenuItem>
    );
  } else if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-white">
        <div className="relative">
          <button className="group inline-flex h-10 items-center justify-center rounded-full px-5 py-3 text-base font-medium text-white transition-all duration-300 hover:bg-[#0CF2A0]/10 hover:text-[#0CF2A0] gap-1 peer">
            {item.title}
            <ChevronDown className="h-4 w-4 transition-transform duration-200 peer-hover:rotate-180" />
          </button>
          <div className="absolute left-0 top-full z-10 mt-2 w-80 origin-top-left scale-95 opacity-0 pointer-events-none transition-all duration-200 peer-hover:scale-100 peer-hover:opacity-100 peer-hover:pointer-events-auto hover:scale-100 hover:opacity-100 hover:pointer-events-auto">
            <div className="overflow-hidden rounded-xl border border-[#0CF2A0]/30 bg-black/80 backdrop-blur-lg shadow-lg shadow-[#0CF2A0]/20">
              <div className="grid p-1">
                {item.items.map((subItem) => (
                  <a
                    key={subItem.title}
                    className="flex items-center gap-4 rounded-lg p-3 hover:bg-[#0CF2A0]/10 transition-colors duration-200"
                    href={subItem.url}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0CF2A0]/10 text-[#0CF2A0]">
                      {subItem.icon}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="mt-1 text-sm text-white/70 line-clamp-1">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </NavigationMenuItem>
    );
  }

  return (
    <a
      key={item.title}
      className="group inline-flex h-10 items-center justify-center rounded-full px-5 py-3 text-base font-medium text-white transition-colors hover:bg-[#0CF2A0]/10 hover:text-[#0CF2A0]"
      href={item.url}
    >
      {item.title}
    </a>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items && item.title === "Services") {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 font-semibold hover:no-underline text-white group rounded-lg px-3 hover:bg-[#0CF2A0]/10">
          <span className="group-hover:text-[#0CF2A0] transition-colors">{item.title}</span>
        </AccordionTrigger>
        <AccordionContent className="mt-2 space-y-1.5">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="block rounded-lg p-3 hover:bg-[#0CF2A0]/10 transition-colors text-white"
              href={subItem.url}
            >
              <div className="flex flex-col space-y-1">
                <div className="font-medium">{subItem.title}</div>
                <p className="text-xs leading-snug text-white/70">
                  {subItem.description}
                </p>
                <div className="text-[#0CF2A0] text-xs flex items-center mt-1">
                  Learn more <ChevronRight className="h-3 w-3 ml-1" />
                </div>
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  } else if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-2 font-semibold hover:no-underline text-white group rounded-lg px-3 hover:bg-[#0CF2A0]/10">
          <span className="group-hover:text-[#0CF2A0] transition-colors">{item.title}</span>
        </AccordionTrigger>
        <AccordionContent className="mt-2 space-y-1">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-3 rounded-lg p-3 leading-none outline-none transition-colors hover:bg-[#0CF2A0]/10 hover:text-[#0CF2A0] text-white"
              href={subItem.url}
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#0CF2A0]/10 text-[#0CF2A0]">
                {subItem.icon}
              </div>
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-xs leading-snug text-white/70 mt-1 line-clamp-2">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a 
      key={item.title} 
      href={item.url} 
      className="font-semibold text-white hover:text-[#0CF2A0] py-2 px-3 rounded-lg hover:bg-[#0CF2A0]/10 transition-colors block"
    >
      {item.title}
    </a>
  );
};

export { Navbar1 }; 