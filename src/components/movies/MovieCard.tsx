
import React from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../types/movie";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`}>
      <Card className="overflow-hidden h-full movie-card-hover">
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            className="object-cover w-full h-full"
          />
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="flex items-center gap-1 bg-black/70 text-white">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              {movie.rating.toFixed(1)}
            </Badge>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg line-clamp-1">{movie.title}</h3>
          <p className="text-sm text-muted-foreground">{movie.year}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {movie.genres.slice(0, 2).map((genre) => (
              <Badge key={genre} variant="outline" className="text-xs">
                {genre}
              </Badge>
            ))}
            {movie.genres.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{movie.genres.length - 2}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MovieCard;
