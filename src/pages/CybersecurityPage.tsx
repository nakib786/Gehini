import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/blocks/hero-section';
import CyberTerminal from '../components/animations/CyberTerminal';

// CybersecurityHero Component
const CybersecurityHero = () => {
  return (
    <section className="py-16 md:py-24 dark:bg-[#111111] bg-light">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold dark:text-white text-dark mb-6">
              <span className="text-primary">Cybersecurity</span> Education
            </h1>
            <p className="text-lg dark:text-gray-300 text-gray-600 mb-6">
              From beginners to advanced practitioners, our cybersecurity courses provide comprehensive education in digital safety, ethical hacking, network security, and more.
            </p>
            <p className="text-lg dark:text-gray-300 text-gray-600">
              Taught with the same nurturing approach that defines Gehini Gurukul, our cybersecurity program makes complex technical concepts accessible to learners of all backgrounds.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex justify-center"
          >
            <CyberTerminal />
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 dark:bg-[#131313] bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Learning Pathways</h2>
          <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
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
              className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-light p-8 rounded-xl shadow-md"
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
                    <h3 className="text-2xl font-bold dark:text-white">{pathway.title}</h3>
                  </div>
                  <p className="dark:text-gray-300 text-gray-600 mb-4">{pathway.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="font-semibold block mb-1 dark:text-white">Duration:</span>
                      <span className="dark:text-gray-300 text-gray-700">{pathway.duration}</span>
                    </div>
                    <div>
                      <span className="font-semibold block mb-1 dark:text-white">Prerequisites:</span>
                      <span className="dark:text-gray-300 text-gray-700">{pathway.prerequisites}</span>
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
    <section className="py-16 md:py-24 dark:bg-[#111111] bg-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Curriculum Overview</h2>
          <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
            Our comprehensive curriculum covers all aspects of modern cybersecurity
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
              className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white p-8 rounded-xl shadow-md"
            >
              <h3 className="text-xl font-bold mb-3 dark:text-white">{module.title}</h3>
              <p className="dark:text-gray-300 text-gray-600 mb-4">{module.description}</p>
              <h4 className="font-semibold mb-2 text-primary">Key Topics</h4>
              <ul className="space-y-2">
                {module.topics.map((topic, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="h-5 w-5 text-primary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="dark:text-gray-300 text-gray-700">{topic}</span>
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
  const approaches = [
    {
      title: "Nurturing Environment",
      description: "Our instructors create a supportive learning environment where questions are encouraged and mistakes are viewed as learning opportunities.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Practical, Hands-On Learning",
      description: "Learn by doing with lab exercises, simulated scenarios, and real-world applications that reinforce theoretical concepts.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
    },
    {
      title: "Individualized Pace",
      description: "Our curriculum adapts to your learning speed, ensuring you master foundational concepts before advancing to more complex topics.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Real-World Relevance",
      description: "Curriculum continuously updated to reflect current threats, technologies, and industry best practices in the rapidly evolving cybersecurity landscape.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 dark:bg-[#131313] bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">Our Teaching Approach</h2>
          <p className="text-xl dark:text-gray-300 text-gray-600 max-w-3xl mx-auto">
            We apply Gehini Gurukul's nurturing educational philosophy to technical cybersecurity training
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {approaches.map((approach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-light p-8 rounded-xl shadow-md"
            >
              <div className="flex items-start">
                <div className="mr-4 flex-shrink-0">{approach.icon}</div>
                <div>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">{approach.title}</h3>
                  <p className="dark:text-gray-300 text-gray-600">{approach.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call to Action Component
const CallToAction = () => {
  return (
    <section className="py-16 bg-primary text-[#111111]">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Begin Your Cybersecurity Journey</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Whether you're looking to enter the cybersecurity field, enhance your professional skills, or simply learn to better protect yourself online, our nurturing approach makes cybersecurity accessible to all.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn bg-[#111111] text-primary hover:bg-[#222]">
            Enroll Now
          </Link>
          <Link to="/pricing" className="btn border border-[#111111] text-[#111111] hover:bg-[#111111]/10">
            View Pricing
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main CybersecurityPage Component
const CybersecurityPage = () => {
  return (
    <div className="dark:bg-[#111111] bg-white">
      <PageHero 
        title="Cybersecurity Education"
        subtitle="From digital safety fundamentals to advanced ethical hacking, our comprehensive cybersecurity curriculum builds technical skills with a nurturing approach"
        accentText="Digital Defense"
      />
      <CybersecurityHero />
      <LearningPathways />
      <Curriculum />
      <TeachingApproach />
      <CallToAction />
    </div>
  );
};

export default CybersecurityPage; 