import React, { useState, useEffect } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedCarousel = ({ featuredContent }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredContent?.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [featuredContent?.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredContent?.length) % featuredContent?.length);
    setIsAutoPlaying(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredContent?.length);
    setIsAutoPlaying(false);
  };

  if (!featuredContent?.length) return null;

  const currentContent = featuredContent?.[currentIndex];

  return (
    <div className="relative bg-card rounded-lg shadow-card overflow-hidden mb-8">
      <div className="relative h-64 lg:h-80">
        <Image
          src={currentContent?.image}
          alt={currentContent?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
        
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="text-white hover:bg-white/20 bg-black/20"
          >
            <Icon name="ChevronLeft" size={24} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="text-white hover:bg-white/20 bg-black/20"
          >
            <Icon name="ChevronRight" size={24} />
          </Button>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center mb-2">
            <span className="bg-primary px-3 py-1 rounded-full text-xs font-medium mr-3">
              Featured
            </span>
            <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
              {currentContent?.category}
            </span>
          </div>
          
          <h2 className="font-heading font-bold text-2xl lg:text-3xl mb-2">
            {currentContent?.title}
          </h2>
          
          <p className="text-white/90 mb-4 max-w-2xl">
            {currentContent?.description}
          </p>
          
          <div className="flex items-center space-x-4">
            <Button variant="secondary">
              Read More
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
            <div className="flex items-center text-sm text-white/80">
              <Icon name="Clock" size={14} className="mr-1" />
              {currentContent?.readTime} min read
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        {featuredContent?.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-smooth ${
              index === currentIndex ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="text-white hover:bg-white/20 bg-black/20"
        >
          <Icon name={isAutoPlaying ? "Pause" : "Play"} size={16} />
        </Button>
      </div>
    </div>
  );
};

export default FeaturedCarousel;