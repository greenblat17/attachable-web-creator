
import { motion } from 'framer-motion';

interface NewsItemProps {
  title: string;
  date: string;
  author: string;
}

export const NewsItem = ({ title, date, author }: NewsItemProps) => {
  return (
    <motion.div 
      className="border-b border-gray-100 py-6 last:border-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <div className="text-gray-500 text-sm flex items-center">
        <span>{date}</span>
        <span className="mx-2">|</span>
        <span>{author}</span>
      </div>
    </motion.div>
  );
};
