import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import PageHero from '../components/blocks/hero-section';
import { 
  RupeeIcon, 
  BasicPlanIcon, 
  StandardPlanIcon, 
  PremiumPlanIcon,
  AssessmentIcon,
  CollegePackageIcon
} from '../components/ui/PricingIcons';
import { TutoringPricing, CybersecurityPricing } from "@/components/blocks/pricing";

const PricingPage = () => {
  const [category, setCategory] = useState<'tutoring' | 'cybersecurity'>('tutoring');
  const [autoSwitch, setAutoSwitch] = useState<boolean>(true);
  const [progressKey, setProgressKey] = useState<number>(0);
  const intervalRef = useRef<number | null>(null);

  // Current pricing component based on category
  const CurrentPricing = category === 'tutoring' ? TutoringPricing : CybersecurityPricing;

  // Setup auto-switching timer
  useEffect(() => {
    if (autoSwitch) {
      // Clear any existing interval
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
      
      // Reset animation by changing key
      setProgressKey(prev => prev + 1);
      
      // Set new interval
      intervalRef.current = window.setInterval(() => {
        setCategory(prev => prev === 'tutoring' ? 'cybersecurity' : 'tutoring');
        setProgressKey(prev => prev + 1); // Reset animation on each switch
      }, 5000); // Switch every 5 seconds
    }

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [autoSwitch, category]);

  // Function to handle card selection
  const handleCardSelection = (selected: 'tutoring' | 'cybersecurity') => {
    setCategory(selected);
    setAutoSwitch(false); // Stop auto switching when user makes a selection
  };

  // Function to handle card hover
  const handleCardHover = () => {
    setAutoSwitch(false); // Stop auto switching on hover
  };

  return (
    <div className="dark:bg-[#111111] bg-light">
      <PageHero 
        title="Pricing & Packages"
        subtitle="Choose the perfect plan to support your educational journey with Gehini Gurukul's nurturing approach"
        accentText="Investment In Learning"
      />
      
      {/* Category Selection */}
      <section className="py-16 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold dark:text-white">Choose the perfect plan to support your educational journey with Gehini Gurukul's nurturing approach</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mt-8">
              <motion.button
                onClick={() => handleCardSelection('tutoring')}
                onHoverStart={handleCardHover}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col items-center p-6 rounded-2xl shadow-md transition-all duration-300 border-2 ${
                  category === 'tutoring' 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'dark:bg-[#1D1D1D] bg-white dark:text-gray-300 text-gray-700 dark:border-gray-800 border-gray-200 hover:border-primary/60'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <h3 className="text-xl font-bold">K-12 Tutoring</h3>
                <p className="text-sm mt-2 opacity-80">Academic support for students of all ages</p>
              </motion.button>
              
              <motion.button
                onClick={() => handleCardSelection('cybersecurity')}
                onHoverStart={handleCardHover}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col items-center p-6 rounded-2xl shadow-md transition-all duration-300 border-2 ${
                  category === 'cybersecurity' 
                    ? 'bg-primary text-primary-foreground border-primary' 
                    : 'dark:bg-[#1D1D1D] bg-white dark:text-gray-300 text-gray-700 dark:border-gray-800 border-gray-200 hover:border-primary/60'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <h3 className="text-xl font-bold">Cybersecurity Courses</h3>
                <p className="text-sm mt-2 opacity-80">Digital security training for all skill levels</p>
              </motion.button>
            </div>
            
            {autoSwitch && (
              <div className="flex justify-center mt-6">
                <div className="w-40 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div 
                    key={progressKey} // Reset animation when key changes
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ 
                      duration: 5,
                      ease: "linear"
                    }}
                  />
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Pricing Component */}
      <section className="pb-16 md:pb-24">
        <CurrentPricing />
      </section>

      {/* Additional Services */}
      <section className="py-16 dark:bg-[#131313] bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Additional Services</h2>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
              One-time services and assessments to complement your educational journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-light p-8 rounded-xl shadow-md"
            >
              <div className="flex justify-center mb-6">
                <AssessmentIcon className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center dark:text-white">Academic Assessment</h3>
              <div className="flex justify-between items-center mb-6">
                <p className="dark:text-gray-300 text-gray-600 max-w-sm">Comprehensive evaluation of academic strengths and areas for improvement.</p>
                <div className="text-right">
                  <div className="text-2xl font-bold flex items-center justify-end dark:text-white">
                    <span>₹7,999</span>
                  </div>
                  <div className="dark:text-gray-400 text-gray-600">one-time fee (plus GST)</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">Subject proficiency testing</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">Learning style evaluation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">Detailed assessment report</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">Personalized recommendations</span>
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
              className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-light p-8 rounded-xl shadow-md"
            >
              <div className="flex justify-center mb-6">
                <CollegePackageIcon className="h-16 w-16 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center dark:text-white">College Application Package</h3>
              <div className="flex justify-between items-center mb-6">
                <p className="dark:text-gray-300 text-gray-600 max-w-sm">Comprehensive support for college applications and standardized tests.</p>
                <div className="text-right">
                  <div className="text-2xl font-bold flex items-center justify-end dark:text-white">
                    <span>₹39,999</span>
                  </div>
                  <div className="dark:text-gray-400 text-gray-600">one-time fee (plus GST)</div>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">5 hours of application guidance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">Essay review and feedback</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">Interview preparation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="dark:text-gray-300 text-gray-700">SAT/ACT preparation materials</span>
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
      <section className="py-16 md:py-24 dark:bg-[#111111] bg-light">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Frequently Asked Questions</h2>
            <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
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
              <div className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Can I switch between plans?</h3>
                <p className="dark:text-gray-300 text-gray-600">Yes, you can upgrade or downgrade your plan at any time. Changes will be applied at the beginning of your next billing cycle.</p>
              </div>
              
              <div className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Are there any hidden fees?</h3>
                <p className="dark:text-gray-300 text-gray-600">No, the prices listed include all standard services mentioned in the plan features. All prices are in INR and additional GST will be applied as per government regulations. Additional services are clearly priced separately.</p>
              </div>
              
              <div className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Do you offer family discounts?</h3>
                <p className="dark:text-gray-300 text-gray-600">Yes! We offer a 10% discount for siblings enrolled in our programs. Please contact us for more details.</p>
              </div>
              
              <div className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 dark:text-white">Can I pause my subscription?</h3>
                <p className="dark:text-gray-300 text-gray-600">Yes, you can pause your subscription for up to 2 months per year without losing your current rate. This is especially helpful during vacation periods.</p>
              </div>
              
              <div className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-2 dark:text-white">What payment methods do you accept?</h3>
                <p className="dark:text-gray-300 text-gray-600">We accept all major credit cards, bank transfers, and digital payment services like PayPal. We can also arrange for monthly direct debits.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-[#111111]">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Learning Journey?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Contact us today to discuss your specific needs and find the perfect educational solution for you or your child.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn bg-[#111111] text-primary hover:bg-[#222]">
              Contact Us
            </Link>
            <Link to="/about" className="btn border border-[#111111] text-[#111111] hover:bg-[#111111]/10">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage; 