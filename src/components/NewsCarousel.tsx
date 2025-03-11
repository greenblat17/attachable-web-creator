
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
      className="news-card w-64 h-16 flex-shrink-0"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: id * 0.1, duration: 0.3 }}
    >
      <span>{title}</span>
    </motion.div>
  );
};

export const NewsCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const newsItems = [
    { id: 1, title: "News 1" },
    { id: 2, title: "News 2" },
    { id: 3, title: "News 3" },
    { id: 4, title: "News 4" },
    { id: 5, title: "News 5" },
  ];
  
  const totalItems = newsItems.length;
  const itemsToShow = 1;
  const maxIndex = totalItems - itemsToShow;

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

  const currentItem = newsItems[activeIndex];
  const prevItem = activeIndex > 0 ? newsItems[activeIndex - 1] : newsItems[maxIndex];
  const nextItem = activeIndex < maxIndex ? newsItems[activeIndex + 1] : newsItems[0];

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
              <NewsItem key={prevItem.id} title={prevItem.title} id={prevItem.id} />
            </div>
          </div>
          
          <div className="scale-110 z-10">
            <NewsItem key={currentItem.id} title={currentItem.title} id={currentItem.id} />
          </div>
          
          <div className="flex items-center">
            <div className="opacity-70 mx-4">
              <NewsItem key={nextItem.id} title={nextItem.title} id={nextItem.id} />
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
