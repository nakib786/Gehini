import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import InteractiveHero from '../components/blocks/hero-section-nexus';

// Features Section Component
const Features = () => {
  const features = [
    {
      title: "K-12 Tutoring Excellence",
      description: "Comprehensive support across all subjects with personalized learning plans and experienced educators.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Cybersecurity Education",
      description: "From beginner to advanced levels, learn essential cybersecurity skills with hands-on practical training.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Educational Offerings</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our specialized programs designed to nurture and develop young minds
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600 mb-4">{feature.description}</p>
              <Link
                to={index === 0 ? "/tutoring" : "/cybersecurity"}
                className="text-primary font-medium hover:underline inline-flex items-center"
              >
                Learn more
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Section Component
const Testimonials = () => {
  const testimonials = [
    {
      quote: "The patient and nurturing approach at Gehini Gurukul helped my daughter excel in math, a subject she previously struggled with.",
      author: "Sarah Johnson",
      role: "Parent of 7th grader",
      image: "/placeholder-avatar-1.jpg",
    },
    {
      quote: "I'm amazed at how much I've learned in the cybersecurity program. The practical approach made complex concepts easy to understand.",
      author: "Michael Torres",
      role: "Cybersecurity Student",
      image: "/placeholder-avatar-2.jpg",
    },
    {
      quote: "The tutors here truly embody the 'mother as first teacher' philosophy with their care and dedication to my son's learning journey.",
      author: "Priya Sharma",
      role: "Parent of 4th grader",
      image: "/placeholder-avatar-3.jpg",
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from parents and students about their experiences with Gehini Gurukul
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <div className="mr-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
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
    <section className="py-16 bg-primary text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Begin Your Learning Journey?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join Gehini Gurukul today and experience education with the nurturing care of a mother and the excellence of expert educators.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="btn bg-white text-primary hover:bg-gray-100">
            Register Now
          </Link>
          <Link to="/about" className="btn border border-white text-white hover:bg-white/10">
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
};

// Main HomePage Component
const HomePage = () => {
  return (
    <>
      <InteractiveHero />
      <Features />
      <Testimonials />
      <CallToAction />
    </>
  );
};

export default HomePage; 