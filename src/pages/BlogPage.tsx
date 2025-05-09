import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import PageHero from '../components/blocks/hero-section';

// Blog post data
const blogPosts = [
  {
    id: 1,
    title: "The Role of a Mother in Early Education: Lessons for All Educators",
    excerpt: "Explore how the nurturing qualities of a mother's teaching can be applied to all educational settings for more effective learning outcomes.",
    category: "Education Philosophy",
    author: "Dr. Anjali Mehta",
    date: "May 15, 2025",
    image: "/images/blog/education-philosophy.svg",
    readTime: "7 min read",
    path: "/blog/education-philosophy"
  },
  {
    id: 2,
    title: "5 Effective Study Techniques for Different Learning Styles",
    excerpt: "Discover personalized study methods tailored to visual, auditory, reading/writing, and kinesthetic learning preferences.",
    category: "Study Tips",
    author: "Priya Sharma",
    date: "May 10, 2025",
    image: "/images/blog/study-tips.svg",
    readTime: "5 min read",
    path: "/blog/study-tips"
  },
  {
    id: 3,
    title: "Protecting Your Child Online: A Parent's Guide to Cybersecurity",
    excerpt: "Learn essential steps to safeguard your children's digital presence and teach them responsible online behavior.",
    category: "Cybersecurity",
    author: "Prof. Vikram Singh",
    date: "May 5, 2025",
    image: "/images/blog/cybersecurity.svg",
    readTime: "8 min read",
    path: "/blog/cybersecurity-guide"
  },
  {
    id: 4,
    title: "Overcoming Math Anxiety: Building Confidence in Numbers",
    excerpt: "Practical strategies to help students overcome fear of mathematics and develop a positive relationship with the subject.",
    category: "Mathematics",
    author: "Priya Sharma",
    date: "April 28, 2025",
    image: "/images/blog/mathematics.svg",
    readTime: "6 min read",
    path: "/blog/mathematics"
  },
  {
    id: 5,
    title: "The Power of Reading: How to Encourage a Lifelong Love of Books",
    excerpt: "Tips for parents and educators to foster reading habits and literacy skills from an early age.",
    category: "Literacy",
    author: "Dr. Anjali Mehta",
    date: "April 20, 2025",
    image: "/images/blog/literacy.svg",
    readTime: "5 min read",
    path: "/blog/literacy"
  },
  {
    id: 6,
    title: "Understanding Basic Encryption: A Lesson for Teens and Parents",
    excerpt: "A simple explanation of how encryption works and why it's important for everyday digital security.",
    category: "Cybersecurity",
    author: "Prof. Vikram Singh",
    date: "April 15, 2025",
    image: "/images/blog/cybersecurity.svg",
    readTime: "9 min read",
    path: "/blog/encryption-basics"
  },
  {
    id: 7,
    title: "Preparing for College Applications: A Timeline for High School Students",
    excerpt: "A comprehensive guide to navigating the college application process from freshman to senior year.",
    category: "College Prep",
    author: "Raj Patel",
    date: "April 8, 2025",
    image: "/images/blog/college-prep.svg",
    readTime: "10 min read",
    path: "/blog/college-prep"
  },
  {
    id: 8,
    title: "Hands-On Science: 10 Experiments You Can Do at Home",
    excerpt: "Engage your child's curiosity with these safe and educational science activities using household materials.",
    category: "Science",
    author: "Raj Patel",
    date: "April 1, 2025",
    image: "/images/blog/science.svg",
    readTime: "7 min read",
    path: "/blog/science-experiments"
  }
];

// Categories for filtering
const categories = [
  "All",
  "Education Philosophy",
  "Study Tips",
  "Cybersecurity",
  "Mathematics",
  "Literacy",
  "College Prep",
  "Science"
];

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="dark:bg-[#111111] bg-light">
      <PageHero 
        title="Blog & Resources"
        subtitle="Educational insights, learning tips, and resources for parents and students"
        accentText="Knowledge Sharing"
      />

      <section className="py-16 md:py-24">
        <div className="container-custom">
          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md mx-auto mb-12"
          >
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-3 pl-10 dark:bg-[#222] dark:border-gray-700 dark:text-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 dark:text-gray-400 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </motion.div>
          
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category 
                    ? 'bg-primary text-[#111111]' 
                    : 'dark:bg-[#1D1D1D] dark:text-gray-300 bg-white text-gray-700 dark:hover:bg-[#333] hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>

          {/* Featured Post */}
          {selectedCategory === "All" && searchQuery === "" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white rounded-xl shadow-md overflow-hidden mb-12"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="/images/blog/featured-growth-mindset.svg" 
                    alt="Featured post" 
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    Featured Article
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">
                    Fostering a Growth Mindset: How to Help Your Child Embrace Challenges
                  </h2>
                  <p className="dark:text-gray-300 text-gray-600 mb-6">
                    Learn how to cultivate resilience and a love for learning by encouraging a growth mindset in your child's educational journey.
                  </p>
                  <div className="flex items-center text-sm dark:text-gray-400 text-gray-500 mb-6">
                    <img 
                      src="/images/avatars/placeholder-female.svg" 
                      alt="Dr. Anjali Mehta" 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <span className="dark:text-gray-300 text-gray-700 font-medium">Dr. Anjali Mehta</span>
                      <span className="mx-2">•</span>
                      <span>June 1, 2025</span>
                      <span className="mx-2">•</span>
                      <span>12 min read</span>
                    </div>
                  </div>
                  <Link to="/blog/education-philosophy" className="text-primary font-medium hover:underline inline-flex items-center">
                    Read full article
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-white rounded-xl shadow-md overflow-hidden h-full flex flex-col"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="h-48 w-full object-cover"
                />
                <div className="p-6 flex-grow">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium inline-block mb-3">
                    {post.category}
                  </span>
                  <h3 className="text-xl font-bold mb-3 dark:text-white">
                    {post.title}
                  </h3>
                  <p className="dark:text-gray-300 text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex items-center text-sm dark:text-gray-400 text-gray-500 mb-4">
                    <span className="dark:text-gray-300 text-gray-700 font-medium">{post.author}</span>
                    <span className="mx-2">•</span>
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <Link to={post.path} className="text-primary font-medium hover:underline inline-flex items-center">
                    Read more
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2 dark:text-white">No articles found</h3>
              <p className="dark:text-gray-300 text-gray-600">
                We couldn't find any articles matching your search criteria. Please try a different search term or category.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 text-primary font-medium hover:underline"
              >
                View all articles
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 dark:bg-[#131313] bg-white">
        <div className="container-custom max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="dark:bg-[#1D1D1D] dark:border dark:border-gray-800 bg-light p-8 md:p-12 rounded-xl shadow-md text-center"
          >
            <div className="mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-primary mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 dark:text-white">Subscribe to Our Newsletter</h2>
            <p className="dark:text-gray-300 text-gray-600 mb-6 max-w-2xl mx-auto">
              Get the latest educational insights, learning tips, and resources delivered directly to your inbox. We promise not to spam you!
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-3 dark:bg-[#222] dark:border-gray-700 dark:text-white border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                />
                <button className="btn btn-primary px-6 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
              <p className="text-xs dark:text-gray-400 text-gray-500 mt-3">
                By subscribing, you agree to our Privacy Policy and consent to receive updates from us.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 