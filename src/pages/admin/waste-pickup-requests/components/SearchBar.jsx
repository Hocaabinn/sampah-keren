import React, { useState, useRef, useEffect } from 'react';
import Button from '../../../../components/ui/Button';
import Input from '../../../../components/ui/Input';
import Icon from '../../../../components/AppIcon';

const SearchBar = ({ onSearch, placeholder = "Cari permintaan, warga, alamat..." }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);

  // Mock suggestions data
  const mockSuggestions = [
    { type: 'citizen', value: 'John Smith', icon: 'User' },
    { type: 'citizen', value: 'Sarah Johnson', icon: 'User' },
    { type: 'address', value: '123 Main Street', icon: 'MapPin' },
    { type: 'address', value: '456 Oak Avenue', icon: 'MapPin' },
    { type: 'request', value: '#WR-2024-001', icon: 'Hash' },
    { type: 'request', value: '#WR-2024-002', icon: 'Hash' },
    { type: 'waste', value: 'Household Waste', icon: 'Package' },
    { type: 'waste', value: 'Recyclable Materials', icon: 'Recycle' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        suggestionsRef?.current && 
        !suggestionsRef?.current?.contains(event?.target) &&
        !inputRef?.current?.contains(event?.target)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);

    if (value?.trim()?.length > 0) {
      const filtered = mockSuggestions?.filter(suggestion =>
        suggestion?.value?.toLowerCase()?.includes(value?.toLowerCase())
      );
      setSuggestions(filtered?.slice(0, 6));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSearch = (query = searchQuery) => {
    if (query?.trim()) {
      onSearch?.(query?.trim());
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion?.value);
    handleSearch(suggestion?.value);
  };

  const handleKeyDown = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      handleSearch();
    } else if (e?.key === 'Escape') {
      setShowSuggestions(false);
      inputRef?.current?.blur();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    onSearch?.('');
    inputRef?.current?.focus();
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded) {
      setTimeout(() => inputRef?.current?.focus(), 100);
    }
  };

  return (
    <div className="relative">
      {/* Desktop Search */}
      <div className="hidden md:block">
        <div className="relative">
          <div className="relative">
            <Input
              ref={inputRef}
              type="search"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onFocus={() => searchQuery && setShowSuggestions(true)}
              className="pl-10 pr-10 w-80"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-micro"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions?.length > 0 && (
            <div 
              ref={suggestionsRef}
              className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-modal z-50 max-h-64 overflow-y-auto"
            >
              <div className="p-2">
                <div className="text-xs text-muted-foreground px-2 py-1 mb-1">
                  Suggestions
                </div>
                {suggestions?.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-micro"
                  >
                    <Icon name={suggestion?.icon} size={16} className="text-muted-foreground" />
                    <div className="flex-1">
                      <span className="text-sm text-foreground">{suggestion?.value}</span>
                      <span className="text-xs text-muted-foreground ml-2 capitalize">
                        {suggestion?.type}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Search */}
      <div className="md:hidden">
        {!isExpanded ? (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleExpanded}
            iconName="Search"
            iconSize={20}
          >
            <span className="sr-only">Open search</span>
          </Button>
        ) : (
          <div className="fixed inset-x-0 top-16 z-50 bg-card border-b border-border p-4">
            <div className="relative">
              <Input
                ref={inputRef}
                type="search"
                placeholder={placeholder}
                value={searchQuery}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className="pl-10 pr-10"
              />
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <button
                onClick={() => {
                  clearSearch();
                  setIsExpanded(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-micro"
              >
                <Icon name="X" size={16} />
              </button>
            </div>

            {/* Mobile Suggestions */}
            {showSuggestions && suggestions?.length > 0 && (
              <div className="mt-2 bg-popover border border-border rounded-lg shadow-modal max-h-48 overflow-y-auto">
                <div className="p-2">
                  {suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        handleSuggestionClick(suggestion);
                        setIsExpanded(false);
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-muted rounded-md transition-micro"
                    >
                      <Icon name={suggestion?.icon} size={16} className="text-muted-foreground" />
                      <div className="flex-1">
                        <span className="text-sm text-foreground">{suggestion?.value}</span>
                        <span className="text-xs text-muted-foreground ml-2 capitalize">
                          {suggestion?.type}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;