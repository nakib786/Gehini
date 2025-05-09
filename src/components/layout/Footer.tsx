import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, MapPin, Phone, ExternalLink, ArrowUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-gradient-to-br from-[#111111] to-[#1a1a1a] text-white relative">
      <div className="container mx-auto py-16 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="col-span-1 md:col-span-4">
            <div className="flex flex-col items-start">
              <div className="relative mb-4 group">
                <Link to="/" className="flex items-center relative z-10">
                  <img
                    src="/Gehini_Gurukul_Logo-removebg-preview.png"
                    alt="Gehini Gurukul Logo"
                    className="h-24 w-auto object-contain transition-transform duration-300"
                  />
                </Link>
                <div className="absolute opacity-0 group-hover:opacity-100 -top-4 -left-4 z-50 transition-all duration-500 ease-in-out group-hover:scale-[3] group-hover:-translate-y-32 pointer-events-none">
                  <img
                    src="/Gehini_Gurukul_Logo-removebg-preview.png"
                    alt="Gehini Gurukul Logo Popup"
                    className="h-32 w-auto object-contain shadow-2xl rounded-lg"
                    style={{ 
                      filter: "drop-shadow(0 0 15px rgba(255,255,255,0.3))",
                    }}
                  />
                </div>
              </div>
              <p className="mt-4 text-gray-300 text-sm leading-relaxed">
                Nurturing minds with the essence of "Mother as the first teacher" - providing patient, foundational learning for all.
              </p>
              
              <div className="mt-6 flex space-x-4">
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="bg-white/10 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-white/20 transition-all duration-300"
                >
                  <Facebook size={18} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="bg-white/10 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-white/20 transition-all duration-300"
                >
                  <Instagram size={18} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="bg-white/10 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-white/20 transition-all duration-300"
                >
                  <Twitter size={18} />
                </motion.a>
                <motion.a 
                  href="#" 
                  whileHover={{ y: -3 }}
                  className="bg-white/10 p-2 rounded-full text-gray-300 hover:text-primary hover:bg-white/20 transition-all duration-300"
                >
                  <Linkedin size={18} />
                </motion.a>
              </div>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              Quick Links
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tutoring" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  K-12 Tutoring
                </Link>
              </li>
              <li>
                <Link to="/cybersecurity" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Cybersecurity
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2">
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              Resources
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-primary transition-colors flex items-center group">
                  <span className="w-0 h-0.5 bg-primary mr-0 group-hover:w-2 group-hover:mr-2 transition-all duration-300"></span>
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-4">
            <h3 className="text-lg font-bold mb-4 text-white relative inline-block">
              Contact Us
              <span className="absolute -bottom-1 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start group">
                <div className="mt-1 mr-3 p-1.5 rounded-full bg-white/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                  <MapPin size={16} />
                </div>
                <span className="text-gray-300 text-sm">123 Education Lane, Learning City</span>
              </li>
              <li className="flex items-start group">
                <div className="mt-1 mr-3 p-1.5 rounded-full bg-white/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                  <Mail size={16} />
                </div>
                <span className="text-gray-300 text-sm">contact@gehinigurukul.com</span>
              </li>
              <li className="flex items-start group">
                <div className="mt-1 mr-3 p-1.5 rounded-full bg-white/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                  <Phone size={16} />
                </div>
                <span className="text-gray-300 text-sm">+1 (555) 123-4567</span>
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-semibold mb-3 text-white">Subscribe to our newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 bg-white/10 border border-white/20 rounded-l-md px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                />
                <button className="bg-primary hover:bg-primary/80 text-white px-4 rounded-r-md transition-colors duration-300">
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Gehini Gurukul. All rights reserved.
          </p>
          
          <button 
            onClick={scrollToTop} 
            className="mt-4 md:mt-0 bg-white/10 hover:bg-primary/80 p-2 rounded-full text-gray-300 hover:text-white transition-all duration-300 group"
          >
            <ArrowUp size={18} className="group-hover:animate-bounce" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 