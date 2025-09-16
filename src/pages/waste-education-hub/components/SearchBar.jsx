import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SearchBar = ({ onSearch, onFilterChange, selectedCategory }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'plastic', label: 'Plastic Recycling' },
    { value: 'organic', label: 'Organic Waste' },
    { value: 'electronic', label: 'Electronic Waste' },
    { value: 'hazardous', label: 'Hazardous Materials' },
    { value: 'paper', label: 'Paper & Cardboard' },
    { value: 'glass', label: 'Glass & Metal' }
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6 mb-8">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search articles, tips, and guides..."
              value={searchQuery}
              onChange={handleInputChange}
              className="pr-12"
            />
            <Button
              type="submit"
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              <Icon name="Search" size={20} />
            </Button>
          </form>
        </div>
        
        <div className="lg:w-64">
          <Select
            placeholder="Filter by category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={onFilterChange}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="text-sm text-muted-foreground">Popular searches:</span>
        {['Recycling tips', 'Composting', 'E-waste disposal', 'Plastic alternatives']?.map((tag) => (
          <button
            key={tag}
            onClick={() => {
              setSearchQuery(tag);
              onSearch(tag);
            }}
            className="px-3 py-1 text-xs bg-muted hover:bg-muted/80 rounded-full text-muted-foreground hover:text-foreground transition-smooth"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;