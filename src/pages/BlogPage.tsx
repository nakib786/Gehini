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
    image: "/placeholder-blog-1.jpg",
    readTime: "7 min read"
  },
  {
    id: 2,
    title: "5 Effective Study Techniques for Different Learning Styles",
    excerpt: "Discover personalized study methods tailored to visual, auditory, reading/writing, and kinesthetic learning preferences.",
    category: "Study Tips",
    author: "Priya Sharma",
    date: "May 10, 2025",
    image: "/placeholder-blog-2.jpg",
    readTime: "5 min read"
  },
  {
    id: 3,
    title: "Protecting Your Child Online: A Parent's Guide to Cybersecurity",
    excerpt: "Learn essential steps to safeguard your children's digital presence and teach them responsible online behavior.",
    category: "Cybersecurity",
    author: "Prof. Vikram Singh",
    date: "May 5, 2025",
    image: "/placeholder-blog-3.jpg",
    readTime: "8 min read"
  },
  {
    id: 4,
    title: "Overcoming Math Anxiety: Building Confidence in Numbers",
    excerpt: "Practical strategies to help students overcome fear of mathematics and develop a positive relationship with the subject.",
    category: "Mathematics",
    author: "Priya Sharma",
    date: "April 28, 2025",
    image: "/placeholder-blog-4.jpg",
    readTime: "6 min read"
  },
  {
    id: 5,
    title: "The Power of Reading: How to Encourage a Lifelong Love of Books",
    excerpt: "Tips for parents and educators to foster reading habits and literacy skills from an early age.",
    category: "Literacy",
    author: "Dr. Anjali Mehta",
    date: "April 20, 2025",
    image: "/placeholder-blog-5.jpg",
    readTime: "5 min read"
  },
  {
    id: 6,
    title: "Understanding Basic Encryption: A Lesson for Teens and Parents",
    excerpt: "A simple explanation of how encryption works and why it's important for everyday digital security.",
    category: "Cybersecurity",
    author: "Prof. Vikram Singh",
    date: "April 15, 2025",
    image: "/placeholder-blog-6.jpg",
    readTime: "9 min read"
  },
  {
    id: 7,
    title: "Preparing for College Applications: A Timeline for High School Students",
    excerpt: "A comprehensive guide to navigating the college application process from freshman to senior year.",
    category: "College Prep",
    author: "Raj Patel",
    date: "April 8, 2025",
    image: "/placeholder-blog-7.jpg",
    readTime: "10 min read"
  },
  {
    id: 8,
    title: "Hands-On Science: 10 Experiments You Can Do at Home",
    excerpt: "Engage your child's curiosity with these safe and educational science activities using household materials.",
    category: "Science",
    author: "Raj Patel",
    date: "April 1, 2025",
    image: "/placeholder-blog-8.jpg",
    readTime: "7 min read"
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
    <div className="bg-light">
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
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-3.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                    ? 'bg-primary text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-100'
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
              className="bg-white rounded-xl shadow-md overflow-hidden mb-12"
            >
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="/placeholder-featured-blog.jpg" 
                    alt="Featured post" 
                    className="h-64 md:h-full w-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    Featured Article
                  </span>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Fostering a Growth Mindset: How to Help Your Child Embrace Challenges
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Learn how to cultivate resilience and a love for learning by encouraging a growth mindset in your child's educational journey.
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <img 
                      src="/placeholder-avatar-anjali.jpg" 
                      alt="Dr. Anjali Mehta" 
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <div>
                      <p className="font-medium text-gray-800">Dr. Anjali Mehta</p>
                      <p>May 18, 2025 · 12 min read</p>
                    </div>
                  </div>
                  <Link to="/blog/featured" className="btn btn-primary self-start">
                    Read Article
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="h-48 w-full object-cover"
                  />
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="font-medium">{post.author}</span>
                        <span className="mx-1">·</span>
                        <span>{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.id}`} className="text-primary font-medium hover:underline text-sm">
                        Read more →
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl text-gray-300 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-2">No articles found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any articles matching your search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Subscription */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl mb-8">
              Subscribe to our newsletter for the latest educational resources, tips, and insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md border-none focus:ring-2 focus:ring-white/50 text-gray-800"
              />
              <button className="btn bg-white text-primary hover:bg-gray-100 whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-sm mt-4 text-white/80">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Educational Resources</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Practical tools and materials to support learning at home and beyond
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Resource Category 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md"
            >
              <div className="text-4xl text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Study Guides</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive study materials for various subjects and grade levels to help with exam preparation.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Math Formula Sheets</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Science Quick References</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Literature Analysis Templates</span>
                </li>
              </ul>
              <Link to="/resources/study-guides" className="text-primary font-medium hover:underline inline-flex items-center">
                Browse Study Guides
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Resource Category 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md"
            >
              <div className="text-4xl text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Worksheets & Activities</h3>
              <p className="text-gray-600 mb-4">
                Printable worksheets and engaging activities to reinforce learning concepts in a fun, interactive way.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Math Problem Sets</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Reading Comprehension Exercises</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Science Experiment Guides</span>
                </li>
              </ul>
              <Link to="/resources/worksheets" className="text-primary font-medium hover:underline inline-flex items-center">
                Download Worksheets
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>

            {/* Resource Category 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-light p-8 rounded-xl shadow-md"
            >
              <div className="text-4xl text-primary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">Educational Videos</h3>
              <p className="text-gray-600 mb-4">
                Visual learning resources explaining complex concepts in simple, accessible ways for different grade levels.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Math Concept Explanations</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Historical Event Breakdowns</span>
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 text-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Science Demonstrations</span>
                </li>
              </ul>
              <Link to="/resources/videos" className="text-primary font-medium hover:underline inline-flex items-center">
                Watch Videos
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPage; 