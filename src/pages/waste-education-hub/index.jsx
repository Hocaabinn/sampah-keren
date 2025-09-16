import React, { useState, useEffect } from 'react';
import NavigationHeader from '../../components/ui/NavigationHeader';
import BreadcrumbTrail from '../../components/ui/BreadcrumbTrail';
import SearchBar from './components/SearchBar';
import FeaturedCarousel from './components/FeaturedCarousel';
import ContentCard from './components/ContentCard';
import InteractiveInfographic from './components/InteractiveInfographic';
import PracticalTips from './components/PracticalTips';
import BookmarkedContent from './components/BookmarkedContent';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const WasteEducationHub = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedItems, setBookmarkedItems] = useState([]);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [filteredContent, setFilteredContent] = useState([]);

  // Mock data for educational content
  const educationalContent = [
    {
      id: 1,
      title: "Complete Guide to Plastic Recycling",
      description: "Learn about different types of plastics, recycling codes, and how to properly sort plastic waste for maximum environmental impact.",
      category: "plastic",
      difficulty: "beginner",
      readTime: 8,
      author: "Dr. Sarah Chen",
      publishDate: "Dec 15, 2024",
      thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=300&fit=crop"
    },
    {
      id: 2,
      title: "Home Composting Made Simple",
      description: "Transform your kitchen scraps into nutrient-rich compost with this step-by-step guide to home composting systems.",
      category: "organic",
      difficulty: "beginner",
      readTime: 12,
      author: "Mike Rodriguez",
      publishDate: "Dec 12, 2024",
      thumbnail: "https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?w=400&h=300&fit=crop"
    },
    {
      id: 3,
      title: "E-Waste Disposal: Protecting Your Data",
      description: "Safe and secure methods for disposing of electronic devices while protecting personal information and the environment.",
      category: "electronic",
      difficulty: "intermediate",
      readTime: 15,
      author: "Tech Green Team",
      publishDate: "Dec 10, 2024",
      thumbnail: "https://images.pixabay.com/photo/2016/11/29/12/30/electronics-1869759_1280.jpg?w=400&h=300&fit=crop"
    },
    {
      id: 4,
      title: "Hazardous Waste: What You Need to Know",
      description: "Identify common household hazardous materials and learn proper disposal methods to protect your family and environment.",
      category: "hazardous",
      difficulty: "advanced",
      readTime: 20,
      author: "Environmental Safety Corp",
      publishDate: "Dec 8, 2024",
      thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop"
    },
    {
      id: 5,
      title: "Paper Recycling: Beyond the Basics",
      description: "Advanced techniques for paper waste reduction, including creative reuse ideas and understanding paper grades for recycling.",
      category: "paper",
      difficulty: "intermediate",
      readTime: 10,
      author: "Green Paper Initiative",
      publishDate: "Dec 5, 2024",
      thumbnail: "https://images.pexels.com/photos/167699/pexels-photo-167699.jpeg?w=400&h=300&fit=crop"
    },
    {
      id: 6,
      title: "Glass and Metal Recycling Essentials",
      description: "Maximize the recycling potential of glass and metal items with proper cleaning, sorting, and preparation techniques.",
      category: "glass",
      difficulty: "beginner",
      readTime: 7,
      author: "Recycling Experts",
      publishDate: "Dec 3, 2024",
      thumbnail: "https://images.pixabay.com/photo/2016/03/02/20/13/aluminium-1232496_1280.jpg?w=400&h=300&fit=crop"
    }
  ];

  // Mock data for featured content
  const featuredContent = [
    {
      id: 'featured-1',
      title: "2024 Waste Reduction Challenge",
      description: "Join thousands of citizens in our annual waste reduction challenge. Learn new habits, track your progress, and make a real environmental impact.",
      category: "Community",
      readTime: 5,
      image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=400&fit=crop"
    },
    {
      id: 'featured-2',
      title: "Holiday Waste Prevention Tips",
      description: "Discover creative ways to reduce waste during the holiday season while still enjoying festive celebrations with family and friends.",
      category: "Seasonal",
      readTime: 8,
      image: "https://images.pexels.com/photos/1303081/pexels-photo-1303081.jpeg?w=800&h=400&fit=crop"
    },
    {
      id: 'featured-3',
      title: "Zero Waste Lifestyle Guide",
      description: "Transform your daily routine with practical zero waste strategies that are easy to implement and maintain long-term.",
      category: "Lifestyle",
      readTime: 12,
      image: "https://images.pixabay.com/photo/2018/05/11/08/11/plastic-bottles-3389729_1280.jpg?w=800&h=400&fit=crop"
    }
  ];

  // Mock data for interactive infographics
  const infographics = [
    {
      title: "The 5 R\'s of Waste Management",
      description: "A comprehensive guide to Refuse, Reduce, Reuse, Recycle, and Rot principles",
      mainIcon: "Recycle",
      sections: [
        {
          id: 1,
          title: "Refuse",
          subtitle: "Say no to unnecessary items",
          icon: "X",
          color: "bg-error",
          steps: [
            "Decline single-use items like plastic bags and straws",
            "Choose products with minimal packaging",
            "Opt for digital receipts instead of paper ones"
          ]
        },
        {
          id: 2,
          title: "Reduce",
          subtitle: "Minimize what you consume",
          icon: "Minus",
          color: "bg-warning",
          steps: [
            "Buy only what you need",
            "Choose quality items that last longer",
            "Use both sides of paper before recycling"
          ]
        },
        {
          id: 3,
          title: "Reuse",
          subtitle: "Find new purposes for items",
          icon: "RotateCcw",
          color: "bg-secondary",
          steps: [
            "Repurpose glass jars for storage",
            "Use old t-shirts as cleaning rags",
            "Transform cardboard boxes into organizers"
          ]
        }
      ],
      stats: {
        title: "Impact Statistics",
        data: [
          { value: "75%", label: "Waste Reduction" },
          { value: "50%", label: "Cost Savings" },
          { value: "90%", label: "Landfill Diversion" },
          { value: "25%", label: "Carbon Footprint" }
        ]
      },
      tip: "Start with one \'R\' at a time. Master refusing unnecessary items before moving to the next principle."
    },
    {
      title: "Composting Cycle",
      description: "Understanding the natural decomposition process and how to optimize it",
      mainIcon: "Leaf",
      sections: [
        {
          id: 1,
          title: "Green Materials",
          subtitle: "Nitrogen-rich components",
          icon: "Leaf",
          color: "bg-success",
          steps: [
            "Fresh grass clippings and leaves",
            "Fruit and vegetable scraps",
            "Coffee grounds and tea bags"
          ]
        },
        {
          id: 2,
          title: "Brown Materials",
          subtitle: "Carbon-rich components",
          icon: "TreePine",
          color: "bg-amber-600",
          steps: [
            "Dry leaves and paper",
            "Cardboard and newspaper",
            "Wood chips and sawdust"
          ]
        }
      ],
      stats: {
        title: "Composting Benefits",
        data: [
          { value: "30%", label: "Waste Reduced" },
          { value: "6mo", label: "Compost Ready" },
          { value: "40%", label: "Garden Yield" },
          { value: "0$", label: "Fertilizer Cost" }
        ]
      },
      tip: "Maintain a 3:1 ratio of brown to green materials for optimal composting results."
    }
  ];

  // Mock data for practical tips
  const practicalTips = [
    {
      id: 1,
      title: "Use Reusable Shopping Bags",
      description: "Replace single-use plastic bags with durable alternatives",
      category: "reduce",
      difficulty: "easy",
      timeRequired: "1 minute",
      cost: "Free",
      impact: "Saves 100+ bags/year",
      icon: "ShoppingBag",
      iconColor: "bg-success",
      steps: [
        "Keep bags in your car or by the door",
        "Choose bags made from recycled materials",
        "Wash fabric bags regularly to maintain hygiene"
      ]
    },
    {
      id: 2,
      title: "Start a Kitchen Scrap Collection",
      description: "Collect organic waste for composting or municipal pickup",
      category: "compost",
      difficulty: "easy",
      timeRequired: "2 minutes daily",
      cost: "$10-20",
      impact: "Diverts 200lbs/year",
      icon: "Trash2",
      iconColor: "bg-success",
      steps: [
        "Use a countertop compost bin with lid",
        "Include fruit peels, vegetable scraps, coffee grounds",
        "Empty into outdoor compost or municipal bin weekly"
      ]
    },
    {
      id: 3,
      title: "Repurpose Glass Jars",
      description: "Transform food jars into storage containers",
      category: "reuse",
      difficulty: "easy",
      timeRequired: "5 minutes",
      cost: "Free",
      impact: "Saves 50+ containers/year",
      icon: "Package",
      iconColor: "bg-secondary",
      steps: [
        "Remove labels with warm soapy water",
        "Use for pantry storage, craft supplies, or leftovers",
        "Create custom labels for organization"
      ]
    },
    {
      id: 4,
      title: "Set Up Electronics Recycling",
      description: "Properly dispose of old electronic devices",
      category: "recycle",
      difficulty: "medium",
      timeRequired: "30 minutes",
      cost: "Free",
      impact: "Prevents toxic waste",
      icon: "Smartphone",
      iconColor: "bg-primary",
      steps: [
        "Back up and wipe all personal data",
        "Find certified e-waste recycling centers",
        "Remove batteries if possible for separate disposal"
      ]
    },
    {
      id: 5,
      title: "Create a Repair Kit",
      description: "Fix items instead of throwing them away",
      category: "reduce",
      difficulty: "medium",
      timeRequired: "1 hour setup",
      cost: "$20-50",
      impact: "Extends item lifespan 2-5x",
      icon: "Wrench",
      iconColor: "bg-warning",
      steps: [
        "Gather basic tools: screwdrivers, glue, tape, needles",
        "Learn simple repair techniques online",
        "Practice on less valuable items first"
      ]
    },
    {
      id: 6,
      title: "Make Natural Cleaners",
      description: "Replace chemical cleaners with homemade alternatives",
      category: "reduce",
      difficulty: "easy",
      timeRequired: "10 minutes",
      cost: "$5-10",
      impact: "Eliminates 20+ bottles/year",
      icon: "Sparkles",
      iconColor: "bg-accent",
      steps: [
        "Mix vinegar and water for glass cleaner",
        "Use baking soda for scrubbing surfaces",
        "Add essential oils for pleasant scents"
      ]
    }
  ];

  // Filter content based on search and category
  useEffect(() => {
    let filtered = educationalContent;

    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(content => content?.category === selectedCategory);
    }

    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(content =>
        content?.title?.toLowerCase()?.includes(query) ||
        content?.description?.toLowerCase()?.includes(query) ||
        content?.author?.toLowerCase()?.includes(query) ||
        content?.category?.toLowerCase()?.includes(query)
      );
    }

    setFilteredContent(filtered);
  }, [searchQuery, selectedCategory]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (category) => {
    setSelectedCategory(category);
  };

  const handleBookmark = (contentId) => {
    setBookmarkedItems(prev => {
      if (prev?.includes(contentId)) {
        return prev?.filter(id => id !== contentId);
      } else {
        return [...prev, contentId];
      }
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader />
      <BreadcrumbTrail />
      <main className="pt-4 pb-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="BookOpen" size={32} className="text-primary" />
              </div>
            </div>
            <h1 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-4">
              Pusat Edukasi Sampah
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Temukan pengetahuan daur ulang yang komprehensif dan praktik pengelolaan limbah berkelanjutan
            melalui artikel yang menarik, panduan interaktif, dan kiat praktis
            </p>
          </div>

          {/* Search and Filter */}
          <SearchBar
            onSearch={handleSearch}
            onFilterChange={handleFilterChange}
            selectedCategory={selectedCategory}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <Button
              variant={showBookmarks ? "default" : "outline"}
              onClick={() => setShowBookmarks(!showBookmarks)}
              iconName="Bookmark"
              iconPosition="left"
            >
              My Bookmarks ({bookmarkedItems?.length})
            </Button>
            <Button variant="outline" iconName="Download" iconPosition="left">
              Download Guides
            </Button>
            <Button variant="outline" iconName="Share2" iconPosition="left">
              Share Hub
            </Button>
          </div>

          {/* Bookmarked Content */}
          <BookmarkedContent
            bookmarkedItems={bookmarkedItems}
            allContent={educationalContent}
            onRemoveBookmark={handleBookmark}
            isVisible={showBookmarks}
          />

          {!showBookmarks && (
            <>
              {/* Featured Content Carousel */}
              <FeaturedCarousel featuredContent={featuredContent} />

              {/* Interactive Infographics */}
              <InteractiveInfographic infographics={infographics} />

              {/* Educational Content Grid */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-heading font-bold text-2xl text-foreground">
                    Educational Articles
                  </h2>
                  <div className="text-sm text-muted-foreground">
                    {filteredContent?.length} articles found
                  </div>
                </div>

                {filteredContent?.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredContent?.map((content) => (
                      <ContentCard
                        key={content?.id}
                        content={content}
                        onBookmark={handleBookmark}
                        isBookmarked={bookmarkedItems?.includes(content?.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-card rounded-lg">
                    <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                    <h3 className="font-medium text-foreground mb-2">No articles found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search terms or category filter.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('all');
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>

              {/* Practical Tips Section */}
              <PracticalTips tips={practicalTips} />
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default WasteEducationHub;