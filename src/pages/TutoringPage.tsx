import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PageHero from '../components/blocks/hero-section';

// Subjects Offered Component
const SubjectsOffered = () => {
  const subjectCategories = [
    {
      category: "Mathematics",
      subjects: ["Elementary Math", "Pre-Algebra", "Algebra I & II", "Geometry", "Trigonometry", "Pre-Calculus", "Calculus", "Statistics"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      category: "Science",
      subjects: ["General Science", "Earth Science", "Biology", "Chemistry", "Physics", "Environmental Science", "Anatomy", "Astronomy"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      ),
    },
    {
      category: "Language Arts",
      subjects: ["Reading Comprehension", "Writing & Composition", "Grammar", "Literature", "Vocabulary", "Critical Thinking", "Public Speaking", "Creative Writing"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      category: "Social Studies",
      subjects: ["History", "Geography", "Civics", "Economics", "World Cultures", "Government", "Sociology", "Current Events"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subjects We Offer</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive curriculum covers all core K-12 subjects, delivered by experienced educators who specialize in nurturing learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {subjectCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-6">
                <div className="mr-4">{category.icon}</div>
                <h3 className="text-2xl font-bold">{category.category}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {category.subjects.map((subject, idx) => (
                  <div key={idx} className="flex items-center">
                    <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{subject}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Grade Levels Component
const GradeLevels = () => {
  const grades = [
    {
      level: "Elementary (K-5)",
      description: "Building foundational skills in core subjects with engaging, age-appropriate methods that foster a love of learning.",
      features: ["Interactive learning activities", "Early literacy support", "Math foundations", "Basic science concepts", "Social skills development"],
    },
    {
      level: "Middle School (6-8)",
      description: "Strengthening academic skills and developing critical thinking as students navigate more complex subjects.",
      features: ["Subject-specific tutoring", "Organization and study skills", "Critical thinking development", "Advanced concept introduction", "Confidence building"],
    },
    {
      level: "High School (9-12)",
      description: "Comprehensive academic support and exam preparation to help students excel in challenging coursework and prepare for college.",
      features: ["AP course support", "SAT/ACT preparation", "College essay writing", "Advanced subject tutoring", "Academic counseling"],
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Grade Levels We Support</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our tutoring programs are tailored to meet the needs of students at every stage of their K-12 education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {grades.map((grade, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-md h-full flex flex-col"
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">{grade.level}</h3>
              <p className="text-gray-600 mb-6 flex-grow">{grade.description}</p>
              <div>
                <h4 className="font-semibold mb-3">Key Focus Areas:</h4>
                <ul className="space-y-2">
                  {grade.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="h-5 w-5 text-secondary mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Tutoring Methodology Component
const TutoringMethodology = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Tutoring Methodology</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our approach combines personalized attention with proven teaching methods, all delivered with motherly care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="bg-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">1. Initial Assessment</h3>
                <p className="text-gray-600">We begin by understanding each student's strengths, areas for improvement, learning style, and academic goals.</p>
              </div>
              
              <div className="bg-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">2. Personalized Learning Plan</h3>
                <p className="text-gray-600">Our educators create a customized curriculum and approach tailored to the specific needs of each student.</p>
              </div>
              
              <div className="bg-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">3. Engaging Instruction</h3>
                <p className="text-gray-600">Lessons are delivered using interactive and engaging methods that make learning enjoyable and effective.</p>
              </div>
              
              <div className="bg-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">4. Regular Progress Monitoring</h3>
                <p className="text-gray-600">We continuously assess progress and adjust teaching methods as needed to ensure optimal learning outcomes.</p>
              </div>
              
              <div className="bg-light p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-2">5. Parent Communication</h3>
                <p className="text-gray-600">Regular updates keep parents informed about their child's progress, achievements, and areas for continued focus.</p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img 
              src="/placeholder-methodology.jpg" 
              alt="Our tutoring methodology" 
              className="rounded-lg shadow-xl max-w-full h-auto"
            />
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
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Support Your Child's Academic Journey?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Our tutors are ready to provide the nurturing guidance and expert instruction your child needs to excel in their studies.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Schedule a Consultation
          </Link>
          <Link to="/pricing" className="btn border border-white text-white hover:bg-white/10">
            View Tutoring Packages
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main TutoringPage Component
const TutoringPage = () => {
  return (
    <>
      <PageHero 
        title="K-12 Tutoring"
        subtitle="Our comprehensive K-12 tutoring programs provide personalized support across all subjects, helping students build strong academic foundations with nurturing guidance."
        accentText="Academic Excellence"
      />
      <SubjectsOffered />
      <GradeLevels />
      <TutoringMethodology />
      <CallToAction />
    </>
  );
};

export default TutoringPage; 