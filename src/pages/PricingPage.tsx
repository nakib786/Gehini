import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PageHero from '../components/blocks/hero-section';
import { 
  RupeeIcon, 
  BasicPlanIcon, 
  StandardPlanIcon, 
  PremiumPlanIcon,
  AssessmentIcon,
  CollegePackageIcon
} from '../components/ui/PricingIcons';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'annual'>('monthly');
  const [category, setCategory] = useState<'tutoring' | 'cybersecurity'>('tutoring');

  // Tutoring pricing plans
  const tutoringPlans = [
    {
      name: "Basic",
      description: "Perfect for occasional academic support",
      monthlyPrice: 11999,
      quarterlyPrice: 32999, // Save ~₹3,000
      annualPrice: 119999, // Save ~₹24,000
      features: [
        "2 hours of tutoring per week",
        "1 subject coverage",
        "Homework assistance",
        "Monthly progress reports",
        "Email support"
      ],
      popular: false,
      ctaText: "Get Started",
      icon: BasicPlanIcon
    },
    {
      name: "Standard",
      description: "Ideal for regular academic improvement",
      monthlyPrice: 19999,
      quarterlyPrice: 54999, // Save ~₹5,000
      annualPrice: 199999, // Save ~₹40,000
      features: [
        "4 hours of tutoring per week",
        "2 subject coverage",
        "Homework assistance",
        "Weekly progress reports",
        "Study materials included",
        "Email and phone support",
        "Parent-teacher consultations"
      ],
      popular: true,
      ctaText: "Most Popular",
      icon: StandardPlanIcon
    },
    {
      name: "Premium",
      description: "Comprehensive academic excellence package",
      monthlyPrice: 29999,
      quarterlyPrice: 84999, // Save ~₹5,000
      annualPrice: 299999, // Save ~₹60,000
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
      popular: false,
      ctaText: "Get Started",
      icon: PremiumPlanIcon
    }
  ];

  // Cybersecurity pricing plans
  const cybersecurityPlans = [
    {
      name: "Foundations",
      description: "Introduction to cybersecurity basics",
      monthlyPrice: 15999,
      quarterlyPrice: 44999, // Save ~₹3,000
      annualPrice: 159999, // Save ~₹32,000
      features: [
        "8 hours of instruction per month",
        "Beginner modules access",
        "Basic lab environments",
        "Monthly assessments",
        "Community forum access",
        "Email support"
      ],
      popular: false,
      ctaText: "Get Started",
      icon: BasicPlanIcon
    },
    {
      name: "Practitioner",
      description: "Intermediate cybersecurity skills development",
      monthlyPrice: 24999,
      quarterlyPrice: 69999, // Save ~₹5,000
      annualPrice: 249999, // Save ~₹50,000
      features: [
        "12 hours of instruction per month",
        "Intermediate modules access",
        "Advanced lab environments",
        "Weekly practical exercises",
        "Certification preparation",
        "Community forum access",
        "Priority email and chat support"
      ],
      popular: true,
      ctaText: "Most Popular",
      icon: StandardPlanIcon
    },
    {
      name: "Specialist",
      description: "Advanced cybersecurity expertise",
      monthlyPrice: 39999,
      quarterlyPrice: 109999, // Save ~₹10,000
      annualPrice: 399999, // Save ~₹80,000
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
      popular: false,
      ctaText: "Get Started",
      icon: PremiumPlanIcon
    }
  ];

  // Determine which plans to display based on category
  const currentPlans = category === 'tutoring' ? tutoringPlans : cybersecurityPlans;

  // Function to get price based on billing cycle
  const getPrice = (plan: any) => {
    switch (billingCycle) {
      case 'monthly':
        return plan.monthlyPrice;
      case 'quarterly':
        return plan.quarterlyPrice;
      case 'annual':
        return plan.annualPrice;
      default:
        return plan.monthlyPrice;
    }
  };

  // Function to format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Function to get billing text
  const getBillingText = () => {
    switch (billingCycle) {
      case 'monthly':
        return 'per month';
      case 'quarterly':
        return 'per quarter';
      case 'annual':
        return 'per year';
      default:
        return 'per month';
    }
  };

  return (
    <div className="bg-light">
      <PageHero 
        title="Pricing & Packages"
        subtitle="Choose the perfect plan to support your educational journey with Gehini Gurukul's nurturing approach"
        accentText="Investment In Learning"
      />
      
      {/* Category and Billing Selection */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white p-8 rounded-xl shadow-md mb-12"
          >
            {/* Category Selection */}
            <div className="inline-flex p-1 bg-white rounded-lg shadow-sm mb-8">
              <button
                onClick={() => setCategory('tutoring')}
                className={`px-4 py-2 rounded-md font-medium ${
                  category === 'tutoring' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                K-12 Tutoring
              </button>
              <button
                onClick={() => setCategory('cybersecurity')}
                className={`px-4 py-2 rounded-md font-medium ${
                  category === 'cybersecurity' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Cybersecurity Courses
              </button>
            </div>
            
            {/* Billing Cycle Selection */}
            <div className="inline-flex p-1 bg-white rounded-lg shadow-sm">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 py-2 rounded-md font-medium ${
                  billingCycle === 'monthly' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('quarterly')}
                className={`px-4 py-2 rounded-md font-medium ${
                  billingCycle === 'quarterly' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-4 py-2 rounded-md font-medium ${
                  billingCycle === 'annual' 
                    ? 'bg-primary text-white' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Annual
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {currentPlans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-xl shadow-md overflow-hidden ${
                  plan.popular ? 'ring-2 ring-primary' : ''
                }`}
              >
                {plan.popular && (
                  <div className="bg-primary text-white text-center py-2 font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-8">
                  <div className="flex items-center justify-center mb-6">
                    <plan.icon className="h-16 w-16 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-center">{plan.name}</h3>
                  <p className="text-gray-600 mb-6 text-center">{plan.description}</p>
                  <div className="mb-6 text-center">
                    <div className="flex items-center justify-center">
                      <RupeeIcon className="h-6 w-6 text-gray-900 mr-1" />
                      <span className="text-4xl font-bold">{formatPrice(getPrice(plan))}</span>
                    </div>
                    <span className="text-gray-600"> {getBillingText()}</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/contact"
                    className={`btn w-full text-center ${
                      plan.popular ? 'btn-primary' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {plan.ctaText}
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Additional Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              One-time services and assessments to complement your educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md"
            >
              <div className="flex justify-center mb-6">
                <AssessmentIcon className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">Academic Assessment</h3>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 max-w-sm">Comprehensive evaluation of academic strengths and areas for improvement.</p>
                <div className="text-right">
                  <div className="text-2xl font-bold flex items-center justify-end">
                    <RupeeIcon className="h-5 w-5 text-gray-900 mr-1" />
                    <span>7,999</span>
                  </div>
                  <div className="text-gray-600">one-time fee</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Subject proficiency testing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Learning style evaluation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Detailed assessment report</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Personalized recommendations</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-primary w-full text-center">
                Schedule Assessment
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md"
            >
              <div className="flex justify-center mb-6">
                <CollegePackageIcon className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">College Application Package</h3>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600 max-w-sm">Comprehensive support for college applications and standardized tests.</p>
                <div className="text-right">
                  <div className="text-2xl font-bold flex items-center justify-end">
                    <RupeeIcon className="h-5 w-5 text-gray-900 mr-1" />
                    <span>39,999</span>
                  </div>
                  <div className="text-gray-600">one-time fee</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">5 hours of application guidance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Essay review and feedback</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Interview preparation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">SAT/ACT preparation materials</span>
                </li>
              </ul>
              <Link to="/contact" className="btn btn-primary w-full text-center">
                Get the Package
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Answers to common questions about our pricing and packages
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Can I switch between plans?</h3>
                <p className="text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the beginning of your next billing cycle.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Are there any hidden fees?</h3>
                <p className="text-gray-600">No, the prices listed include all standard services mentioned in the plan features. Additional services are clearly priced separately.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Do you offer family discounts?</h3>
                <p className="text-gray-600">Yes! We offer a 10% discount for siblings enrolled in our programs. Please contact us for more details.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">Can I pause my subscription?</h3>
                <p className="text-gray-600">Yes, you can pause your subscription for up to 2 months per year without losing your current rate. This is especially helpful during vacation periods.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-600">We accept all major credit cards, bank transfers, and digital payment services like PayPal. We can also arrange for monthly direct debits.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your specific needs and find the perfect educational solution for you or your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
              Contact Us
            </Link>
            <Link to="/about" className="btn border border-white text-white hover:bg-white/10">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage; 