
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

interface MovieFilterProps {
  genres: string[];
  onFilter: (query: string, genre: string) => void;
  initialQuery?: string;
  initialGenre?: string;
}

const MovieFilter: React.FC<MovieFilterProps> = ({ 
  genres, 
  onFilter,
  initialQuery = "",
  initialGenre = ""
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(query, selectedGenre);
  };

  const handleReset = () => {
    setQuery("");
    setSelectedGenre("");
    onFilter("", "");
  };

  return (
    <div className="bg-card p-4 mb-6 rounded-lg border border-border">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-wrap items-end gap-3">
          <div className="w-full sm:w-auto flex-grow">
            <Input
              placeholder="Search movies..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="w-full sm:w-auto">
            <Select value={selectedGenre} onValueChange={setSelectedGenre}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Select genre" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-genres">All Genres</SelectItem>
                {genres.map((genre) => (
                  <SelectItem key={genre} value={genre}>
                    {genre}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button type="submit">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </form>

      {(query || selectedGenre) && (
        <div className="flex items-center gap-2 mt-4 text-sm">
          <span className="font-medium">Filters:</span>
          <div className="flex flex-wrap gap-2">
            {query && (
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center">
                "{query}"
                <button 
                  onClick={() => setQuery("")}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
            {selectedGenre && (
              <span className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md flex items-center">
                {selectedGenre === "all-genres" ? "All Genres" : selectedGenre}
                <button 
                  onClick={() => setSelectedGenre("")}
                  className="ml-1"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieFilter;
