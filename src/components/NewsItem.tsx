
import { motion } from 'framer-motion';

interface NewsItemProps {
  title: string;
  date: string;
  author: string;
  featured?: boolean;
}

export const NewsItem = ({ title, date, author, featured = false }: NewsItemProps) => {
  return (
    <motion.div 
      className={`${featured ? 'bg-blue-500 text-white' : 'border-b border-gray-100'} py-6 rounded-lg ${featured ? 'p-6' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className={`text-lg font-medium ${featured ? 'text-white' : 'text-gray-800'} mb-2`}>{title}</h3>
      <div className={`${featured ? 'text-blue-100' : 'text-gray-500'} text-sm flex items-center`}>
        <span>{date}</span>
        <span className="mx-2">|</span>
        <span>{author}</span>
      </div>
    </motion.div>
  );
};
