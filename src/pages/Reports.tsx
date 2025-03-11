
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";

const Reports = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        <Header userName="Журавлёв А.А." />
        
        <div className="flex-1 overflow-y-auto p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="h-full flex flex-col items-center justify-center"
          >
            <BarChart3 className="w-16 h-16 text-blue-500 mb-4" />
            <h2 className="text-2xl font-medium text-gray-800">
              Отчеты
            </h2>
            <p className="text-gray-500 mt-2">
              Эта страница находится в разработке
            </p>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Reports;
