import { motion } from 'framer-motion';
import PageHero from '../components/blocks/hero-section';

// Our Philosophy Component
const OurPhilosophy = () => {
  const philosophyPoints = [
    {
      title: "Nurturing Approach",
      description: "Like a mother nurturing her child, we provide a caring, supportive environment where students feel safe to explore and learn.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Patient Learning",
      description: "We understand that each child learns at their own pace, and like a mother's patience, we adapt our teaching methods to suit individual needs.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Foundational Focus",
      description: "Just as mothers lay the foundation for life skills, we ensure strong academic foundations that serve as building blocks for future learning.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Philosophy</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            At Gehini Gurukul, we believe that the attributes of a mother's teaching form the cornerstone of effective education
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {philosophyPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md text-center"
            >
              <div className="flex justify-center mb-4">{point.icon}</div>
              <h3 className="text-xl font-bold mb-3">{point.title}</h3>
              <p className="text-gray-600">{point.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Teacher Profiles Component
const TeacherProfiles = () => {
  const teachers = [
    {
      name: "Dr. Anjali Mehta",
      role: "Founder & K-12 Education Director",
      bio: "With over 15 years of experience in education, Dr. Mehta combines her expertise in child psychology with innovative teaching methodologies.",
      image: "/placeholder-teacher-1.jpg",
    },
    {
      name: "Prof. Vikram Singh",
      role: "Cybersecurity Program Lead",
      bio: "A cybersecurity expert with extensive industry experience, Prof. Singh brings practical knowledge and cutting-edge techniques to our cybersecurity curriculum.",
      image: "/placeholder-teacher-2.jpg",
    },
    {
      name: "Ms. Priya Sharma",
      role: "Mathematics Specialist",
      bio: "Specializing in making mathematics accessible and engaging, Ms. Sharma has transformed how hundreds of students perceive and excel in math.",
      image: "/placeholder-teacher-3.jpg",
    },
    {
      name: "Mr. Raj Patel",
      role: "Science Education Expert",
      bio: "Mr. Patel's hands-on approach to science education makes complex concepts understandable and ignites curiosity in students of all ages.",
      image: "/placeholder-teacher-4.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Educators</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our team of experienced and passionate educators embody the nurturing spirit of Gehini Gurukul
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img 
                src={teacher.image} 
                alt={teacher.name} 
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{teacher.name}</h3>
                <p className="text-primary font-medium mb-3">{teacher.role}</p>
                <p className="text-gray-600">{teacher.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Main AboutPage Component
const AboutPage = () => {
  return (
    <>
      <PageHero 
        title="About Gehini Gurukul"
        subtitle="Founded on the principle of 'Mother as the first teacher,' Gehini Gurukul is an educational institution dedicated to providing nurturing, patient, and foundational learning experiences."
        accentText="Our Story"
      />
      <OurPhilosophy />
      <TeacherProfiles />
    </>
  );
};

export default AboutPage; 