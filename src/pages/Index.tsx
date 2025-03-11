
import { useState, useEffect } from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { NewsItem } from "../components/NewsItem";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const newsItems = [
    { id: 1, title: "Новый план сотрудничества на 2025 год", date: "11.03.2025", author: "Журавлёв А.А." },
    { id: 2, title: "Обновление системы отчетности", date: "11.03.2025", author: "Журавлёв А.А." },
    { id: 3, title: "Изменения в договорных условиях", date: "10.03.2025", author: "Журавлёв А.А." },
    { id: 4, title: "Запуск новой программы лояльности", date: "09.03.2025", author: "Журавлёв А.А." },
    { id: 5, title: "Важное обновление регламента", date: "08.03.2025", author: "Журавлёв А.А." },
  ];
  
  const totalItems = newsItems.length;
  const nextSlide = () => {
    setActiveIndex(prevIndex => 
      prevIndex >= totalItems - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setActiveIndex(prevIndex => 
      prevIndex <= 0 ? totalItems - 1 : prevIndex - 1
    );
  };

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
            <motion.h2 
              className="text-3xl font-medium mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              Новости
            </motion.h2>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="relative mb-8">
                <NewsItem 
                  key={newsItems[activeIndex].id}
                  title={newsItems[activeIndex].title}
                  date={newsItems[activeIndex].date}
                  author={newsItems[activeIndex].author}
                  featured={true}
                />
                
                <button 
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 bg-white rounded-full p-2 shadow-md"
                  onClick={prevSlide}
                  aria-label="Previous slide"
                >
                  <ArrowLeft className="w-5 h-5 text-gray-700" />
                </button>
                
                <button 
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 bg-white rounded-full p-2 shadow-md"
                  onClick={nextSlide}
                  aria-label="Next slide"
                >
                  <ArrowRight className="w-5 h-5 text-gray-700" />
                </button>
              </div>
              
              <div className="space-y-0">
                {newsItems.map((item, index) => (
                  index !== activeIndex && (
                    <NewsItem 
                      key={item.id}
                      title={item.title}
                      date={item.date}
                      author={item.author}
                    />
                  )
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
