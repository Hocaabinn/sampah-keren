import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ContentCard from './ContentCard';

const BookmarkedContent = ({ bookmarkedItems, allContent, onRemoveBookmark, isVisible }) => {
  if (!isVisible) return null;

  const bookmarkedContent = allContent?.filter(content => 
    bookmarkedItems?.includes(content?.id)
  );

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
            <Icon name="Bookmark" size={20} className="text-warning" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-foreground">
              Bookmarked Articles
            </h2>
            <p className="text-sm text-muted-foreground">
              {bookmarkedContent?.length} saved articles
            </p>
          </div>
        </div>
        
        {bookmarkedContent?.length > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              bookmarkedItems?.forEach(id => onRemoveBookmark(id));
            }}
          >
            Clear All
            <Icon name="Trash2" size={14} className="ml-2" />
          </Button>
        )}
      </div>
      {bookmarkedContent?.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarkedContent?.map((content) => (
            <ContentCard
              key={content?.id}
              content={content}
              onBookmark={onRemoveBookmark}
              isBookmarked={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="BookmarkPlus" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-2">
            No bookmarked articles yet
          </h3>
          <p className="text-muted-foreground mb-4">
            Start bookmarking articles you want to read later by clicking the bookmark icon.
          </p>
          <Button variant="outline">
            Browse Articles
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BookmarkedContent;