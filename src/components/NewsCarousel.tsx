
import { useState, useEffect, useCallback } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface NewsItemProps {
  title: string;
  id: number;
}

const NewsItem = ({ title, id }: NewsItemProps) => {
  return (
    <div className="news-card animate-scale-in" style={{ animationDelay: `${id * 50}ms` }}>
      <span>{title}</span>
    </div>
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
  const itemsToShow = 3;
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

  const visibleItems = newsItems.slice(activeIndex, activeIndex + itemsToShow);

  return (
    <div className="w-full pt-6">
      <div className="relative">
        <div className="flex justify-between items-center gap-6">
          {visibleItems.map((item) => (
            <NewsItem key={item.id} title={item.title} id={item.id} />
          ))}
        </div>
        
        <button 
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 bg-white rounded-full p-2 shadow-md"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        
        <button 
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 bg-white rounded-full p-2 shadow-md"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ArrowRight className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </div>
  );
};
