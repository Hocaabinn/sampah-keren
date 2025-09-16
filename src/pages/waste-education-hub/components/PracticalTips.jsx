import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticalTips = ({ tips }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedTips, setCompletedTips] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All Tips', icon: 'List' },
    { id: 'reduce', label: 'Reduce', icon: 'Minus' },
    { id: 'reuse', label: 'Reuse', icon: 'RotateCcw' },
    { id: 'recycle', label: 'Recycle', icon: 'Recycle' },
    { id: 'compost', label: 'Compost', icon: 'Leaf' }
  ];

  const filteredTips = selectedCategory === 'all' 
    ? tips 
    : tips?.filter(tip => tip?.category === selectedCategory);

  const toggleTipCompletion = (tipId) => {
    const newCompleted = new Set(completedTips);
    if (newCompleted?.has(tipId)) {
      newCompleted?.delete(tipId);
    } else {
      newCompleted?.add(tipId);
    }
    setCompletedTips(newCompleted);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-success/10 text-success border-success/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'hard':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading font-bold text-2xl text-foreground mb-2">
            Daily Waste Reduction Tips
          </h2>
          <p className="text-muted-foreground">
            Practical actions you can take today to reduce your environmental impact
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">
            {completedTips?.size}
          </div>
          <div className="text-sm text-muted-foreground">
            Tips Completed
          </div>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            iconSize={16}
          >
            {category?.label}
          </Button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTips?.map((tip) => {
          const isCompleted = completedTips?.has(tip?.id);
          
          return (
            <div
              key={tip?.id}
              className={`border rounded-lg p-4 transition-layout hover:shadow-card ${
                isCompleted ? 'bg-success/5 border-success/20' : 'bg-card border-border'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tip?.iconColor}`}>
                  <Icon name={tip?.icon} size={20} color="white" />
                </div>
                <button
                  onClick={() => toggleTipCompletion(tip?.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth ${
                    isCompleted 
                      ? 'bg-success border-success text-white' :'border-muted-foreground hover:border-success'
                  }`}
                >
                  {isCompleted && <Icon name="Check" size={14} />}
                </button>
              </div>
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <h3 className={`font-medium ${isCompleted ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
                    {tip?.title}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(tip?.difficulty)}`}>
                    {tip?.difficulty}
                  </span>
                </div>
                <p className={`text-sm ${isCompleted ? 'text-muted-foreground' : 'text-muted-foreground'}`}>
                  {tip?.description}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="Clock" size={12} className="mr-1" />
                  {tip?.timeRequired}
                </div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Icon name="DollarSign" size={12} className="mr-1" />
                  {tip?.cost}
                </div>
                <div className="flex items-center text-xs text-success">
                  <Icon name="Leaf" size={12} className="mr-1" />
                  {tip?.impact}
                </div>
              </div>
              {tip?.steps && (
                <div className="mt-3 pt-3 border-t border-border">
                  <details className="group">
                    <summary className="cursor-pointer text-sm font-medium text-primary hover:text-primary/80 flex items-center">
                      View Steps
                      <Icon name="ChevronDown" size={14} className="ml-1 group-open:rotate-180 transition-transform" />
                    </summary>
                    <div className="mt-2 space-y-1">
                      {tip?.steps?.map((step, index) => (
                        <div key={index} className="flex items-start space-x-2">
                          <div className="w-4 h-4 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <p className="text-xs text-muted-foreground flex-1">{step}</p>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {filteredTips?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="font-medium text-foreground mb-2">No tips found</h3>
          <p className="text-muted-foreground">
            Try selecting a different category to see more tips.
          </p>
        </div>
      )}
    </div>
  );
};

export default PracticalTips;