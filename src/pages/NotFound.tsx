
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-6xl font-semibold mb-6 text-blue-500">404</h1>
        <p className="text-xl text-gray-700 mb-6">Страница не найдена</p>
        <Link 
          to="/" 
          className="text-blue-500 hover:text-blue-700 transition-colors px-6 py-3 rounded-full border border-blue-300 hover:border-blue-400"
        >
          Вернуться на главную
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
