import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const InteractiveInfographic = ({ infographics }) => {
  const [selectedInfographic, setSelectedInfographic] = useState(0);
  const [expandedSection, setExpandedSection] = useState(null);

  const currentInfographic = infographics?.[selectedInfographic];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-heading font-bold text-2xl text-foreground">
          Interactive Waste Management Guide
        </h2>
        <div className="flex space-x-2">
          {infographics?.map((_, index) => (
            <Button
              key={index}
              variant={selectedInfographic === index ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedInfographic(index)}
            >
              Guide {index + 1}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="bg-primary/5 rounded-lg p-4">
            <h3 className="font-heading font-semibold text-xl mb-2 text-primary">
              {currentInfographic?.title}
            </h3>
            <p className="text-muted-foreground">
              {currentInfographic?.description}
            </p>
          </div>

          <div className="space-y-3">
            {currentInfographic?.sections?.map((section) => (
              <div key={section?.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section?.id)}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-smooth"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${section?.color}`}>
                      <Icon name={section?.icon} size={20} color="white" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground">{section?.title}</h4>
                      <p className="text-sm text-muted-foreground">{section?.subtitle}</p>
                    </div>
                  </div>
                  <Icon 
                    name={expandedSection === section?.id ? "ChevronUp" : "ChevronDown"} 
                    size={20} 
                    className="text-muted-foreground"
                  />
                </button>

                {expandedSection === section?.id && (
                  <div className="px-4 pb-4 border-t border-border bg-muted/20">
                    <div className="pt-4 space-y-3">
                      {section?.steps?.map((step, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium mt-0.5">
                            {index + 1}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-foreground">{step}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-6">
          <div className="text-center mb-6">
            <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Icon name={currentInfographic?.mainIcon} size={48} className="text-primary" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground">
              {currentInfographic?.stats?.title}
            </h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {currentInfographic?.stats?.data?.map((stat, index) => (
              <div key={index} className="text-center p-4 bg-card rounded-lg">
                <div className="text-2xl font-bold text-primary mb-1">
                  {stat?.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat?.label}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-success/10 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lightbulb" size={16} className="text-success" />
              <span className="font-medium text-success">Pro Tip</span>
            </div>
            <p className="text-sm text-success/80">
              {currentInfographic?.tip}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveInfographic;