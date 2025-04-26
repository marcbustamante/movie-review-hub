
import React from "react";
import { Movie } from "../../types/movie";
import MovieCard from "./MovieCard";

interface MovieGridProps {
  movies: Movie[];
  title?: string;
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies, title }) => {
  if (movies.length === 0) {
    return (
      <div className="text-center my-12">
        <h3 className="text-2xl font-semibold text-muted-foreground">No movies found</h3>
        <p className="mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div>
      {title && (
        <h2 className="text-2xl font-bold mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
