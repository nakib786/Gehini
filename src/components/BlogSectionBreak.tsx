import React from 'react';
import { motion } from 'framer-motion';
import BlogIllustration from './BlogIllustration';

interface BlogSectionBreakProps {
  category: string;
}

const BlogSectionBreak: React.FC<BlogSectionBreakProps> = ({ category }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="flex items-center justify-center my-12 text-primary"
    >
      <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/4"></div>
      <div className="mx-6">
        <BlogIllustration category={category} className="w-10 h-10" />
      </div>
      <div className="h-px bg-gray-300 dark:bg-gray-700 w-1/4"></div>
    </motion.div>
  );
};

export default BlogSectionBreak; 