import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentCard = ({ content, onBookmark, isBookmarked }) => {
  const getDifficultyColor = (level) => {
    switch (level) {
      case 'beginner':
        return 'bg-success/10 text-success';
      case 'intermediate':
        return 'bg-warning/10 text-warning';
      case 'advanced':
        return 'bg-error/10 text-error';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      plastic: 'Recycle',
      organic: 'Leaf',
      electronic: 'Smartphone',
      hazardous: 'AlertTriangle',
      paper: 'FileText',
      glass: 'Wine'
    };
    return icons?.[category] || 'BookOpen';
  };

  return (
    <div className="bg-card rounded-lg shadow-card hover:shadow-modal transition-layout overflow-hidden group">
      <div className="relative overflow-hidden">
        <Image
          src={content?.thumbnail}
          alt={content?.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-layout"
        />
        <div className="absolute top-3 left-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content?.difficulty)}`}>
            <Icon name={getCategoryIcon(content?.category)} size={12} className="mr-1" />
            {content?.category}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onBookmark(content?.id)}
          className={`absolute top-3 right-3 ${isBookmarked ? 'text-warning' : 'text-white hover:text-warning'} bg-black/20 hover:bg-black/40`}
        >
          <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
        </Button>
      </div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(content?.difficulty)}`}>
            {content?.difficulty}
          </span>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Clock" size={14} className="mr-1" />
            {content?.readTime} min read
          </div>
        </div>

        <h3 className="font-heading font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-smooth">
          {content?.title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
          {content?.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="User" size={14} className="mr-1" />
            {content?.author}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Icon name="Calendar" size={14} className="mr-1" />
            {content?.publishDate}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="outline" className="w-full">
            Read Article
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;