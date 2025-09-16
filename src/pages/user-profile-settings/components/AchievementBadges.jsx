import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementBadges = ({ achievements }) => {
  const badgeCategories = [
    {
      title: 'Reporting Champion',
      badges: achievements?.filter(a => a?.category === 'reporting'),
      color: 'primary'
    },
    {
      title: 'Pickup Pro',
      badges: achievements?.filter(a => a?.category === 'pickup'),
      color: 'secondary'
    },
    {
      title: 'Eco Warrior',
      badges: achievements?.filter(a => a?.category === 'environmental'),
      color: 'accent'
    },
    {
      title: 'Community Leader',
      badges: achievements?.filter(a => a?.category === 'community'),
      color: 'warning'
    }
  ];

  const getBadgeIcon = (type) => {
    switch (type) {
      case 'first_report': return 'Flag';
      case 'report_streak': return 'Zap';
      case 'pickup_master': return 'Truck';
      case 'eco_friendly': return 'Leaf';
      case 'community_helper': return 'Users';
      case 'early_adopter': return 'Star';
      default: return 'Award';
    }
  };

  const getColorClasses = (color, earned) => {
    const baseClasses = {
      primary: earned ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary',
      secondary: earned ? 'bg-secondary text-secondary-foreground' : 'bg-secondary/10 text-secondary',
      accent: earned ? 'bg-accent text-accent-foreground' : 'bg-accent/10 text-accent',
      warning: earned ? 'bg-warning text-warning-foreground' : 'bg-warning/10 text-warning'
    };
    return baseClasses?.[color] || baseClasses?.primary;
  };

  const shareAchievement = async (achievement) => {
    const text = `I just earned the "${achievement?.title}" badge on SmartWaste! 🏆 #SmartWaste #EcoFriendly`;
    const url = window.location?.origin;
    
    try {
      // Check if Web Share API is supported and available
      if (navigator?.share && navigator?.canShare) {
        const shareData = {
          title: 'SmartWaste Achievement',
          text: text,
          url: url
        };
        
        // Verify the data can be shared
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          return;
        }
      } else if (navigator?.share) {
        // Fallback for browsers that support share but not canShare
        await navigator.share({
          title: 'SmartWaste Achievement',
          text: text,
          url: url
        });
        return;
      }
    } catch (error) {
      console.log('Web Share API failed:', error?.message);
      // Continue to fallback options
    }
    
    // Fallback 1: Try clipboard API
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard?.writeText(`${text} ${url}`);
        // Show success notification (you could add a toast here)
        console.log('Achievement copied to clipboard!');
        return;
      }
    } catch (error) {
      console.log('Clipboard API failed:', error?.message);
      // Continue to next fallback
    }
    
    // Fallback 2: Create temporary input for manual copy
    try {
      const textArea = document.createElement('textarea');
      textArea.value = `${text} ${url}`;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body?.appendChild(textArea);
      textArea?.focus();
      textArea?.select();
      
      if (document.execCommand('copy')) {
        console.log('Achievement copied to clipboard!');
      } else {
        throw new Error('Copy command failed');
      }
      
      document.body?.removeChild(textArea);
    } catch (error) {
      console.log('Manual copy failed:', error?.message);
      
      // Final fallback: Show the text in an alert for manual copy
      alert(`Copy this achievement text:\n\n${text}\n${url}`);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Achievement Badges</h2>
          <p className="text-sm text-muted-foreground">
            Your environmental impact recognition
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {achievements?.filter(a => a?.earned)?.length}
          </div>
          <div className="text-xs text-muted-foreground">
            of {achievements?.length} earned
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {badgeCategories?.map((category, categoryIndex) => (
          <div key={categoryIndex}>
            <h3 className="text-lg font-medium text-foreground mb-4 flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full bg-${category?.color}`}></div>
              {category?.title}
              <span className="text-sm text-muted-foreground font-normal">
                ({category?.badges?.filter(b => b?.earned)?.length}/{category?.badges?.length})
              </span>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category?.badges?.map((badge, badgeIndex) => (
                <div
                  key={badgeIndex}
                  className={`relative p-4 rounded-lg border transition-smooth ${
                    badge?.earned 
                      ? 'border-border bg-card hover:shadow-card' 
                      : 'border-dashed border-muted-foreground/30 bg-muted/30'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      getColorClasses(category?.color, badge?.earned)
                    }`}>
                      <Icon 
                        name={getBadgeIcon(badge?.type)} 
                        size={20} 
                        className={badge?.earned ? 'text-current' : 'opacity-50'}
                      />
                    </div>
                    
                    <div className="flex-1">
                      <h4 className={`font-medium mb-1 ${
                        badge?.earned ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {badge?.title}
                      </h4>
                      <p className={`text-sm mb-2 ${
                        badge?.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'
                      }`}>
                        {badge?.description}
                      </p>
                      
                      {badge?.earned ? (
                        <div className="flex items-center justify-between">
                          <div className="text-xs text-success font-medium">
                            Earned {badge?.earnedDate}
                          </div>
                          <Button
                            variant="ghost"
                            size="xs"
                            iconName="Share"
                            onClick={() => shareAchievement(badge)}
                          >
                            Share
                          </Button>
                        </div>
                      ) : (
                        <div className="text-xs text-muted-foreground">
                          Progress: {badge?.progress || 0}%
                          <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                            <div
                              className={`h-1.5 rounded-full bg-${category?.color} transition-all duration-300`}
                              style={{ width: `${badge?.progress || 0}%` }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {badge?.earned && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                      <Icon name="Check" size={12} className="text-success-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Overall Progress */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Progress</span>
          <span className="text-sm text-muted-foreground">
            {Math.round((achievements?.filter(a => a?.earned)?.length / achievements?.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ 
              width: `${(achievements?.filter(a => a?.earned)?.length / achievements?.length) * 100}%` 
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;