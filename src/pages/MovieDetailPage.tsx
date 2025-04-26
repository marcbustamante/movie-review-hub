
import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import Layout from "../components/layout/Layout";
import ReviewList from "../components/reviews/ReviewList";
import { Button } from "@/components/ui/button";
import { Star, Edit, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovie, deleteMovie } = useMovieContext();
  const navigate = useNavigate();
  
  const movie = getMovie(id || "");
  
  if (!movie) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center py-20">
          <h1 className="text-2xl font-bold mb-4">Movie not found</h1>
          <p className="text-muted-foreground mb-6">The movie you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate("/movies")}>
            Back to Movies
          </Button>
        </div>
      </Layout>
    );
  }
  
  const handleDeleteMovie = () => {
    deleteMovie(movie.id);
    navigate("/movies");
  };
  
  const renderStars = (rating: number) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-5 w-5 ${
              rating >= star ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-lg font-medium">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3 lg:w-1/4">
          <div className="sticky top-24 rounded-lg overflow-hidden border border-border">
            <img
              src={movie.posterUrl}
              alt={`${movie.title} poster`}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
        
        <div className="md:w-2/3 lg:w-3/4">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">{movie.title}</h1>
              <p className="text-xl text-muted-foreground mt-1">{movie.year}</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                asChild
              >
                <Link to={`/movies/edit/${movie.id}`}>
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete movie</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{movie.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteMovie}
                      className="bg-destructive text-destructive-foreground"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
          
          <div className="flex items-center gap-3 my-4">
            {renderStars(movie.rating)}
            <span className="text-sm text-muted-foreground">
              ({movie.reviews.length} {movie.reviews.length === 1 ? "review" : "reviews"})
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2 my-4">
            {movie.genres.map((genre) => (
              <Link key={genre} to={`/movies?genre=${encodeURIComponent(genre)}`}>
                <Badge variant="secondary" className="text-sm">
                  {genre}
                </Badge>
              </Link>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Director</h3>
              <p>{movie.director}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Cast</h3>
              <ul>
                {movie.cast.map((actor) => (
                  <li key={actor}>{actor}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="my-6">
            <h3 className="text-lg font-semibold mb-2">Synopsis</h3>
            <p className="text-foreground whitespace-pre-line">{movie.synopsis}</p>
          </div>
          
          <ReviewList reviews={movie.reviews} movieId={movie.id} />
        </div>
      </div>
    </Layout>
  );
};

export default MovieDetailPage;
