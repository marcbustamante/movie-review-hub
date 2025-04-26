
import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Movie, Review, MovieFormData, ReviewFormData } from "../types/movie";
import { moviesData } from "../data/moviesData";
import { toast } from "../components/ui/sonner";

interface MovieContextProps {
  movies: Movie[];
  getMovie: (id: string) => Movie | undefined;
  addMovie: (movieData: MovieFormData) => void;
  updateMovie: (id: string, movieData: MovieFormData) => void;
  deleteMovie: (id: string) => void;
  addReview: (movieId: string, reviewData: ReviewFormData) => void;
  updateReview: (reviewId: string, reviewData: ReviewFormData) => void;
  deleteReview: (reviewId: string) => void;
  searchMovies: (query: string, genre?: string) => Movie[];
  genres: string[];
}

const MovieContext = createContext<MovieContextProps | undefined>(undefined);

export const useMovieContext = () => {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
};

interface MovieProviderProps {
  children: ReactNode;
}

export const MovieProvider: React.FC<MovieProviderProps> = ({ children }) => {
  const [movies, setMovies] = useState<Movie[]>(moviesData);

  // Get all unique genres from movies
  const genres = [...new Set(movies.flatMap(movie => movie.genres))].sort();

  const getMovie = (id: string): Movie | undefined => {
    return movies.find(movie => movie.id === id);
  };

  const addMovie = (movieData: MovieFormData): void => {
    const newMovie: Movie = {
      ...movieData,
      id: uuidv4(),
      rating: 0,
      reviews: []
    };
    setMovies([...movies, newMovie]);
    toast.success("Movie added successfully!");
  };

  const updateMovie = (id: string, movieData: MovieFormData): void => {
    setMovies(movies.map(movie => 
      movie.id === id 
        ? { ...movie, ...movieData }
        : movie
    ));
    toast.success("Movie updated successfully!");
  };

  const deleteMovie = (id: string): void => {
    setMovies(movies.filter(movie => movie.id !== id));
    toast.success("Movie deleted successfully!");
  };

  const addReview = (movieId: string, reviewData: ReviewFormData): void => {
    const newReview: Review = {
      ...reviewData,
      id: uuidv4(),
      movieId,
      date: new Date().toISOString().split('T')[0]
    };

    setMovies(movies.map(movie => {
      if (movie.id === movieId) {
        const updatedReviews = [...movie.reviews, newReview];
        const updatedRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
        
        return {
          ...movie,
          reviews: updatedReviews,
          rating: parseFloat(updatedRating.toFixed(1))
        };
      }
      return movie;
    }));

    toast.success("Review added successfully!");
  };

  const updateReview = (reviewId: string, reviewData: ReviewFormData): void => {
    setMovies(movies.map(movie => {
      // Check if the movie contains the review to update
      const reviewIndex = movie.reviews.findIndex(review => review.id === reviewId);
      
      if (reviewIndex !== -1) {
        // Create a new array of reviews with the updated review
        const updatedReviews = [...movie.reviews];
        updatedReviews[reviewIndex] = {
          ...updatedReviews[reviewIndex],
          ...reviewData,
        };
        
        // Calculate the new rating average
        const updatedRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length;
        
        return {
          ...movie,
          reviews: updatedReviews,
          rating: parseFloat(updatedRating.toFixed(1))
        };
      }
      
      return movie;
    }));

    toast.success("Review updated successfully!");
  };

  const deleteReview = (reviewId: string): void => {
    setMovies(movies.map(movie => {
      // Check if the movie contains the review to delete
      if (movie.reviews.some(review => review.id === reviewId)) {
        const updatedReviews = movie.reviews.filter(review => review.id !== reviewId);
        const updatedRating = updatedReviews.length 
          ? updatedReviews.reduce((sum, review) => sum + review.rating, 0) / updatedReviews.length
          : 0;
        
        return {
          ...movie,
          reviews: updatedReviews,
          rating: parseFloat(updatedRating.toFixed(1))
        };
      }
      
      return movie;
    }));

    toast.success("Review deleted successfully!");
  };

  const searchMovies = (query: string, genre?: string): Movie[] => {
    return movies.filter(movie => {
      const matchesQuery = movie.title.toLowerCase().includes(query.toLowerCase()) || 
                          movie.director.toLowerCase().includes(query.toLowerCase()) ||
                          movie.cast.some(actor => actor.toLowerCase().includes(query.toLowerCase()));
      
      const matchesGenre = !genre || movie.genres.includes(genre);
      
      return matchesQuery && matchesGenre;
    });
  };

  const value = {
    movies,
    getMovie,
    addMovie,
    updateMovie,
    deleteMovie,
    addReview,
    updateReview,
    deleteReview,
    searchMovies,
    genres
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};
