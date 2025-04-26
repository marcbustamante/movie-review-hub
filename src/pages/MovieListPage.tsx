
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import Layout from "../components/layout/Layout";
import MovieGrid from "../components/movies/MovieGrid";
import MovieFilter from "../components/movies/MovieFilter";

const MovieListPage: React.FC = () => {
  const location = useLocation();
  const { movies, searchMovies, genres } = useMovieContext();
  
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("search") || "";
  const initialGenre = searchParams.get("genre") || "";
  
  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);

  useEffect(() => {
    handleFilter(searchQuery, selectedGenre);
    // This is intentional to only run once on mount and when props change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies, initialQuery, initialGenre]);

  const handleFilter = (query: string, genre: string) => {
    setSearchQuery(query);
    setSelectedGenre(genre);
    
    // Update URL with search params without reloading page
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (genre && genre !== "all-genres") params.append("genre", genre);
    
    const newUrl = 
      window.location.pathname + 
      (params.toString() ? `?${params.toString()}` : "");
    
    window.history.pushState({}, "", newUrl);
    
    // Pass empty string for genre if "all-genres" is selected
    setFilteredMovies(searchMovies(query, genre === "all-genres" ? "" : genre));
  };

  return (
    <Layout>
      <div className="pb-4">
        <h1 className="text-3xl font-bold mb-6">Movie Collection</h1>
        
        <MovieFilter 
          genres={genres}
          onFilter={handleFilter}
          initialQuery={initialQuery}
          initialGenre={initialGenre}
        />
        
        <MovieGrid 
          movies={filteredMovies} 
          title={filteredMovies.length > 0 ? `${filteredMovies.length} movies found` : undefined}
        />
      </div>
    </Layout>
  );
};

export default MovieListPage;
