import React from 'react';
import { motion } from 'framer-motion';
import BlogIllustration from './BlogIllustration';

interface BlogIllustrationContainerProps {
  category: string;
  title: string;
  position?: 'left' | 'right';
}

const BlogIllustrationContainer: React.FC<BlogIllustrationContainerProps> = ({ 
  category, 
  title,
  position = 'right'
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: position === 'right' ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`float-${position} my-6 mx-6 p-4 rounded-lg bg-primary/5 dark:bg-primary/10 max-w-[250px] text-center ${position === 'right' ? 'ml-8' : 'mr-8'}`}
    >
      <BlogIllustration category={category} className="w-16 h-16 mx-auto mb-4 text-primary" />
      <p className="text-sm font-medium text-primary">{title}</p>
    </motion.div>
  );
};

export default BlogIllustrationContainer; 