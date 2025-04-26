
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/movies?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-background border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-movie-purple">MovieVerse</span>
            </Link>
            <Button variant="ghost" className="md:hidden">
              <Search size={20} />
            </Button>
          </div>
          
          <nav className="flex items-center gap-6">
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-foreground hover:text-movie-purple transition-colors">
                Home
              </Link>
              <Link to="/movies" className="text-foreground hover:text-movie-purple transition-colors">
                Movies
              </Link>
              <Link to="/about" className="text-foreground hover:text-movie-purple transition-colors">
                About
              </Link>
            </div>
            
            <form onSubmit={handleSearch} className="hidden md:flex items-center relative flex-1 max-w-sm">
              <Input
                type="search"
                placeholder="Search movies..."
                className="pr-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
            
            <Link to="/movies/add">
              <Button variant="default">Add Movie</Button>
            </Link>
          </nav>
        </div>
        
        <div className="md:hidden mt-2">
          <form onSubmit={handleSearch} className="flex items-center relative">
            <Input
              type="search"
              placeholder="Search movies..."
              className="w-full pr-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit" 
              size="icon" 
              variant="ghost" 
              className="absolute right-0"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;
