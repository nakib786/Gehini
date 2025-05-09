import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "../../../src/lib/utils"
import { Button } from "../../../src/components/ui/button"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div className={cn("w-full flex items-center justify-between px-6 py-3 bg-transparent", className)}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <a href="/">
          <div className="flex items-center gap-2">
            <img src="/src/assets/Gehini_Gurukul_Logo-removebg-preview.png" className="w-10 h-10" alt="Gehini Gurukul Logo" />
            <span className="text-lg font-semibold hidden md:inline">Gehini Gurukul</span>
          </div>
        </a>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center">
        <div className="flex items-center gap-2 bg-transparent border border-white/30 backdrop-blur-sm py-1 px-1 rounded-full shadow-md">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={(e) => {
                  setActiveTab(item.name)
                }}
                className={cn(
                  "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
                  "text-gray-700 hover:text-primary",
                  isActive && "bg-transparent text-primary"
                )}
              >
                <span className="hidden md:inline">{item.name}</span>
                <span className="md:hidden">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
                {isActive && (
                  <motion.div
                    layoutId="lamp"
                    className="absolute inset-0 w-full bg-transparent border border-primary/30 rounded-full -z-10"
                    initial={false}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                      <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                      <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                      <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                    </div>
                  </motion.div>
                )}
              </a>
            )
          })}
        </div>
      </div>

      {/* Auth Buttons */}
      <div className="hidden md:flex items-center gap-2">
        <Button asChild variant="outline" size="sm" className="bg-transparent hover:bg-transparent/20 border-white/30">
          <a href="/login">Log in</a>
        </Button>
        <Button asChild size="sm" className="bg-primary/70 hover:bg-primary">
          <a href="/contact">Get Started</a>
        </Button>
      </div>
    </div>
  )
}
