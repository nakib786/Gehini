import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/blocks/hero-section';

// CybersecurityHero Component
const CybersecurityHero = () => {
  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-dark mb-6">
              <span className="text-primary">Cybersecurity</span> Education
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              From beginners to advanced practitioners, our cybersecurity courses provide comprehensive education in digital safety, ethical hacking, network security, and more.
            </p>
            <p className="text-lg text-gray-600">
              Taught with the same nurturing approach that defines Gehini Gurukul, our cybersecurity program makes complex technical concepts accessible to learners of all backgrounds.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <img 
              src="/placeholder-cybersecurity.jpg" 
              alt="Cybersecurity education" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Learning Pathways Component
const LearningPathways = () => {
  const pathways = [
    {
      level: "Beginner",
      title: "Cybersecurity Foundations",
      description: "Perfect for those new to cybersecurity, this pathway introduces fundamental concepts, basic security practices, and digital literacy.",
      duration: "3 months",
      prerequisites: "Basic computer skills",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
    },
    {
      level: "Intermediate",
      title: "Security Practitioner",
      description: "Build on foundational knowledge with practical skills in network security, threat detection, incident response, and basic penetration testing.",
      duration: "6 months",
      prerequisites: "Completion of Foundations course or equivalent knowledge",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      level: "Advanced",
      title: "Cybersecurity Specialist",
      description: "Master advanced techniques in ethical hacking, security architecture, forensics, and specialized domains like cloud security or IoT security.",
      duration: "9 months",
      prerequisites: "Completion of Practitioner course or equivalent experience",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Learning Pathways</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our structured learning paths guide you from cybersecurity novice to specialist at your own pace
          </p>
        </div>

        <div className="space-y-12">
          {pathways.map((pathway, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md"
            >
              <div className="flex flex-col md:flex-row md:items-center">
                <div className="md:mr-8 mb-6 md:mb-0">
                  {pathway.icon}
                </div>
                <div className="flex-grow">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                      {pathway.level}
                    </span>
                    <h3 className="text-2xl font-bold">{pathway.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{pathway.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold block mb-1">Duration:</span>
                      <span className="text-gray-700">{pathway.duration}</span>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1">Prerequisites:</span>
                      <span className="text-gray-700">{pathway.prerequisites}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 md:mt-0 md:ml-8">
                  <Link to="/contact" className="btn btn-primary whitespace-nowrap">
                    Learn More
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Curriculum Component
const Curriculum = () => {
  const curriculumModules = [
    {
      title: "Digital Safety & Privacy",
      description: "Learn essential practices for protecting your digital identity, securing personal data, and safe online behavior.",
      topics: [
        "Password management and authentication",
        "Safe social media practices",
        "Identity protection strategies",
        "Privacy settings and configurations",
        "Recognizing phishing attempts",
        "Mobile device security"
      ]
    },
    {
      title: "Network & Infrastructure Security",
      description: "Understand how networks function and learn to identify, prevent, and respond to network-based threats.",
      topics: [
        "Network architecture fundamentals",
        "Firewall configuration and management",
        "VPN implementation and usage",
        "Wireless network security",
        "Network monitoring and analysis",
        "Infrastructure hardening techniques"
      ]
    },
    {
      title: "Ethical Hacking & Penetration Testing",
      description: "Develop skills to identify vulnerabilities in systems through ethical hacking methods and controlled security testing.",
      topics: [
        "Reconnaissance techniques",
        "Vulnerability scanning",
        "Exploitation basics",
        "Web application security testing",
        "Post-exploitation tactics",
        "Reporting and documentation"
      ]
    },
    {
      title: "Incident Response & Digital Forensics",
      description: "Learn procedures for effectively responding to security incidents and conducting forensic investigations.",
      topics: [
        "Incident response planning",
        "Threat detection methodologies",
        "Evidence collection and preservation",
        "Malware analysis",
        "Root cause investigation",
        "Recovery and remediation procedures"
      ]
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Curriculum Overview</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive curriculum covers both theoretical knowledge and practical skills in key cybersecurity domains
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {curriculumModules.map((module, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold mb-3">{module.title}</h3>
              <p className="text-gray-600 mb-6">{module.description}</p>
              <h4 className="font-semibold mb-3">Topics covered:</h4>
              <ul className="space-y-2">
                {module.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{topic}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Teaching Approach Component
const TeachingApproach = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img 
              src="/placeholder-teaching-approach.jpg" 
              alt="Our teaching approach" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Teaching Approach</h2>
            <p className="text-lg text-gray-600 mb-6">
              We bring the nurturing Gehini philosophy to cybersecurity education, making technical concepts accessible through:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Hands-on Learning</h3>
                  <p className="text-gray-600">Practical exercises in secure lab environments where you can apply concepts in realistic scenarios.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Small Group Instruction</h3>
                  <p className="text-gray-600">Limited class sizes ensure personalized attention and support from our expert instructors.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Real-World Case Studies</h3>
                  <p className="text-gray-600">Learn from actual security incidents and breaches to understand practical implications of cybersecurity principles.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Progressive Learning Path</h3>
                  <p className="text-gray-600">Structured curriculum that builds knowledge incrementally, ensuring solid understanding before advancing to complex topics.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

// Call to Action Component
const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Cybersecurity Journey Today</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Whether you're looking to protect your digital life or pursuing a career in cybersecurity, our courses provide the knowledge and skills you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Enroll Now
          </Link>
          <Link to="/pricing" className="btn border border-white text-white hover:bg-white/10">
            View Course Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main CybersecurityPage Component
const CybersecurityPage = () => {
  return (
    <>
      <PageHero 
        title="Cybersecurity Education"
        subtitle="From beginners to advanced practitioners, our cybersecurity courses provide comprehensive education in digital safety, ethical hacking, network security, and more."
        accentText="Digital Security"
      />
      <LearningPathways />
      <Curriculum />
      <TeachingApproach />
      <CallToAction />
    </>
  );
};

export default CybersecurityPage; 