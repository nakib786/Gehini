import React from 'react';
import { motion } from 'framer-motion';
import BlogIllustration from './BlogIllustration';

interface BlogKeyPointProps {
  category: string;
  point: string;
}

const BlogKeyPoint: React.FC<BlogKeyPointProps> = ({ category, point }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="my-8 p-4 border-l-4 border-primary bg-primary/5 dark:bg-primary/10 rounded-r flex items-center"
    >
      <div className="mr-4 text-primary">
        <BlogIllustration category={category} className="w-8 h-8" />
      </div>
      <p className="text-base font-medium dark:text-gray-100 text-gray-800 m-0">{point}</p>
    </motion.div>
  );
};

export default BlogKeyPoint; 