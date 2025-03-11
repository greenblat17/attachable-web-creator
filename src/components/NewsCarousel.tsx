
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface NewsItemProps {
  title: string;
  id: number;
}

const NewsItem = ({ title, id }: NewsItemProps) => {
  return (
    <motion.div 
      className="news-card w-64 h-16 flex-shrink-0 bg-white p-4 rounded-lg shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1, duration: 0.3 }}
    >
      <span className="text-sm font-medium line-clamp-2">{title}</span>
    </motion.div>
  );
};

export const NewsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const newsItems = [
    { id: 1, title: "Новый законопроект о налоговых льготах для малого бизнеса принят в первом чтении" },
    { id: 2, title: "Запуск программы цифровой трансформации предприятий запланирован на апрель" },
    { id: 3, title: "Результаты квартального экономического форума: ключевые решения и перспективы" },
    { id: 4, title: "Внедрение новой системы электронного документооборота: первые итоги" },
    { id: 5, title: "Открыт прием заявок на участие в программе поддержки инновационных проектов" },
  ];
  
  const totalItems = newsItems.length;
  const maxIndex = totalItems - 1;

  const nextSlide = useCallback(() => {
    setActiveIndex(prevIndex => 
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  }, [maxIndex]);

  const prevSlide = () => {
    setActiveIndex(prevIndex => 
      prevIndex <= 0 ? maxIndex : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getCurrentItem = () => newsItems[activeIndex];
  const getPrevItem = () => newsItems[activeIndex === 0 ? maxIndex : activeIndex - 1];
  const getNextItem = () => newsItems[activeIndex === maxIndex ? 0 : activeIndex + 1];

  return (
    <div className="w-full py-6">
      <div className="relative max-w-5xl mx-auto">
        <div className="flex justify-center items-center gap-8">
          <div className="flex items-center">
            <button 
              className="bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-50 transition-colors"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <div className="opacity-70 mx-4">
              <NewsItem key={`prev-${getPrevItem().id}`} title={getPrevItem().title} id={getPrevItem().id} />
            </div>
          </div>
          
          <div className="scale-110 z-10">
            <NewsItem key={`current-${getCurrentItem().id}`} title={getCurrentItem().title} id={getCurrentItem().id} />
          </div>
          
          <div className="flex items-center">
            <div className="opacity-70 mx-4">
              <NewsItem key={`next-${getNextItem().id}`} title={getNextItem().title} id={getNextItem().id} />
            </div>
            <button 
              className="bg-white rounded-full p-2 shadow-md z-10 hover:bg-gray-50 transition-colors"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
