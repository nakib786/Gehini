import * as React from "react";
import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";

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

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
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
      title: "Features",
      url: "#",
      items: [
        {
          title: "Dashboard",
          description: "Monitor your data and performance metrics",
          icon: <Book className="size-5 shrink-0" />,
          url: "/dashboard",
        },
        {
          title: "Analytics",
          description: "Dive deep into your business metrics",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/analytics",
        },
        {
          title: "Reports",
          description: "Generate insightful reports for your business",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "/reports",
        },
        {
          title: "Integrations",
          description:
            "Connect with your favorite tools and enhance productivity",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/integrations",
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
              <span className="text-xl font-semibold text-white group-hover:text-[#0CF2A0] transition-colors duration-300">{logo.title}</span>
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
              <span className="text-lg font-semibold text-white hover:text-[#0CF2A0] transition-colors duration-300">{logo.title}</span>
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
                        {logo.title}
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
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-white">
        <NavigationMenuTrigger className="font-medium text-white text-base">{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            <NavigationMenuLink>
              {item.items.map((subItem) => (
                <li key={subItem.title}>
                  <a
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </a>
                </li>
              ))}
            </NavigationMenuLink>
          </ul>
        </NavigationMenuContent>
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
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline text-white">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-[#0CF2A0]/10 hover:text-[#0CF2A0] text-white"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-white/70">
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
    <a key={item.title} href={item.url} className="font-semibold text-white hover:text-[#0CF2A0]">
      {item.title}
    </a>
  );
};

export { Navbar1 }; 