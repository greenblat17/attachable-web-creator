
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { NewsCarousel } from "../components/NewsCarousel";
import { NewsItem } from "../components/NewsItem";
import { motion } from "framer-motion";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const newsItems = [
    { id: 1, title: "News", date: "11.03.2025", author: "Журавлёв А.А." },
    { id: 2, title: "News", date: "11.03.2025", author: "Журавлёв А.А." },
    { id: 3, title: "News", date: "10.03.2025", author: "Журавлёв А.А." },
    { id: 4, title: "News", date: "09.03.2025", author: "Журавлёв А.А." },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-white">
        <div className="text-blue-500 text-2xl font-medium animate-pulse">
          Loading...
        </div>
      </div>
    );
  }

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
          >
            <NewsCarousel />
            
            <motion.h2 
              className="text-3xl font-medium mt-10 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Новости
            </motion.h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              {newsItems.map((item) => (
                <NewsItem 
                  key={item.id}
                  title={item.title}
                  date={item.date}
                  author={item.author}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
