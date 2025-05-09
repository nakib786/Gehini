"use client";

import { Pricing } from "@/components/ui/pricing";

// Tutoring plans
const tutoringPlans = [
  {
    name: "BASIC",
    price: "11,999",
    yearlyPrice: "1,19,999",
    period: "per month",
    features: [
      "2 hours of tutoring per week",
      "1 subject coverage",
      "Homework assistance",
      "Monthly progress reports",
      "Email support"
    ],
    description: "Perfect for occasional academic support",
    buttonText: "Get Started",
    href: "/contact",
    isPopular: false,
  },
  {
    name: "STANDARD",
    price: "19,999",
    yearlyPrice: "1,99,999",
    period: "per month",
    features: [
      "4 hours of tutoring per week",
      "2 subject coverage",
      "Homework assistance",
      "Weekly progress reports",
      "Study materials included",
      "Email and phone support",
      "Parent-teacher consultations"
    ],
    description: "Ideal for regular academic improvement",
    buttonText: "Most Popular",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "PREMIUM",
    price: "29,999",
    yearlyPrice: "2,99,999",
    period: "per month",
    features: [
      "8 hours of tutoring per week",
      "All subjects coverage",
      "Homework assistance",
      "Weekly progress reports",
      "Study materials included",
      "Custom learning plans",
      "Priority support 7 days a week",
      "Monthly parent-teacher conferences",
      "College application guidance"
    ],
    description: "Comprehensive academic excellence package",
    buttonText: "Get Started",
    href: "/contact",
    isPopular: false,
  },
];

// Cybersecurity plans
const cybersecurityPlans = [
  {
    name: "FOUNDATIONS",
    price: "15,999",
    yearlyPrice: "1,59,999",
    period: "per month",
    features: [
      "8 hours of instruction per month",
      "Beginner modules access",
      "Basic lab environments",
      "Monthly assessments",
      "Community forum access",
      "Email support"
    ],
    description: "Introduction to cybersecurity basics",
    buttonText: "Get Started",
    href: "/contact",
    isPopular: false,
  },
  {
    name: "PRACTITIONER",
    price: "24,999",
    yearlyPrice: "2,49,999",
    period: "per month",
    features: [
      "12 hours of instruction per month",
      "Intermediate modules access",
      "Advanced lab environments",
      "Weekly practical exercises",
      "Certification preparation",
      "Community forum access",
      "Priority email and chat support"
    ],
    description: "Intermediate cybersecurity skills development",
    buttonText: "Most Popular",
    href: "/contact",
    isPopular: true,
  },
  {
    name: "SPECIALIST",
    price: "39,999",
    yearlyPrice: "3,99,999",
    period: "per month",
    features: [
      "16 hours of instruction per month",
      "Full curriculum access",
      "Professional lab environments",
      "Real-world projects",
      "Certification preparation",
      "1-on-1 mentoring sessions",
      "Internship opportunities",
      "24/7 support access",
      "Job placement assistance"
    ],
    description: "Advanced cybersecurity expertise",
    buttonText: "Get Started",
    href: "/contact",
    isPopular: false,
  },
];

// Demo plans (original)
const demoPlans = [
  {
    name: "STARTER",
    price: "50",
    yearlyPrice: "40",
    period: "per month",
    features: [
      "Up to 10 projects",
      "Basic analytics",
      "48-hour support response time",
      "Limited API access",
      "Community support",
    ],
    description: "Perfect for individuals and small projects",
    buttonText: "Start Free Trial",
    href: "/sign-up",
    isPopular: false,
  },
  {
    name: "PROFESSIONAL",
    price: "99",
    yearlyPrice: "79",
    period: "per month",
    features: [
      "Unlimited projects",
      "Advanced analytics",
      "24-hour support response time",
      "Full API access",
      "Priority support",
      "Team collaboration",
      "Custom integrations",
    ],
    description: "Ideal for growing teams and businesses",
    buttonText: "Get Started",
    href: "/sign-up",
    isPopular: true,
  },
  {
    name: "ENTERPRISE",
    price: "299",
    yearlyPrice: "239",
    period: "per month",
    features: [
      "Everything in Professional",
      "Custom solutions",
      "Dedicated account manager",
      "1-hour support response time",
      "SSO Authentication",
      "Advanced security",
      "Custom contracts",
      "SLA agreement",
    ],
    description: "For large organizations with specific needs",
    buttonText: "Contact Sales",
    href: "/contact",
    isPopular: false,
  },
];

// Export all pricing plan components
export function TutoringPricing() {
  return (
    <div className="h-auto overflow-y-auto rounded-lg">
      <Pricing 
        plans={tutoringPlans}
        title="K-12 Tutoring Plans"
        description="Choose the perfect plan to support your educational journey with Gehini Gurukul's nurturing approach"
      />
    </div>
  );
}

export function CybersecurityPricing() {
  return (
    <div className="h-auto overflow-y-auto rounded-lg">
      <Pricing 
        plans={cybersecurityPlans}
        title="Cybersecurity Courses"
        description="Comprehensive cybersecurity training with hands-on labs and expert guidance"
      />
    </div>
  );
}

export function PricingBasic() {
  return (
    <div className="h-auto overflow-y-auto rounded-lg">
      <Pricing 
        plans={demoPlans}
        title="Simple, Transparent Pricing"
        description="Choose the plan that works for you
All plans include access to our platform, lead generation tools, and dedicated support."
      />
    </div>
  );
} 