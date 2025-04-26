
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMovieContext } from "../../contexts/MovieContext";
import { MovieFormData } from "../../types/movie";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

interface MovieFormProps {
  initialData?: MovieFormData;
  isEditing?: boolean;
}

const defaultFormData: MovieFormData = {
  title: "",
  year: new Date().getFullYear(),
  genres: [],
  director: "",
  cast: [],
  synopsis: "",
  posterUrl: "",
};

const MovieForm: React.FC<MovieFormProps> = ({ initialData, isEditing = false }) => {
  const [formData, setFormData] = useState<MovieFormData>(initialData || defaultFormData);
  const [genreInput, setGenreInput] = useState("");
  const [castInput, setCastInput] = useState("");
  const { addMovie, updateMovie } = useMovieContext();
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const addGenre = () => {
    if (genreInput.trim() && !formData.genres.includes(genreInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        genres: [...prev.genres, genreInput.trim()],
      }));
      setGenreInput("");
    }
  };

  const removeGenre = (genre: string) => {
    setFormData((prev) => ({
      ...prev,
      genres: prev.genres.filter((g) => g !== genre),
    }));
  };

  const addCastMember = () => {
    if (castInput.trim() && !formData.cast.includes(castInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        cast: [...prev.cast, castInput.trim()],
      }));
      setCastInput("");
    }
  };

  const removeCastMember = (actor: string) => {
    setFormData((prev) => ({
      ...prev,
      cast: prev.cast.filter((a) => a !== actor),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isEditing && initialData?.id) {
      updateMovie(initialData.id, formData);
      navigate(`/movies/${initialData.id}`);
    } else {
      addMovie(formData);
      navigate("/movies");
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Movie Title</Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter movie title"
            />
          </div>
          
          {/* Year */}
          <div className="space-y-2">
            <Label htmlFor="year">Release Year</Label>
            <Input
              id="year"
              name="year"
              type="number"
              min="1900"
              max={new Date().getFullYear() + 5}
              value={formData.year}
              onChange={handleNumberChange}
              required
            />
          </div>
          
          {/* Genres */}
          <div className="space-y-2">
            <Label htmlFor="genre">Genres</Label>
            <div className="flex gap-2">
              <Input
                id="genre"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                placeholder="Add a genre"
              />
              <Button type="button" onClick={addGenre}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.genres.map((genre) => (
                <Badge key={genre} variant="secondary" className="pl-2 flex items-center gap-1">
                  {genre}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                    onClick={() => removeGenre(genre)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Director */}
          <div className="space-y-2">
            <Label htmlFor="director">Director</Label>
            <Input
              id="director"
              name="director"
              value={formData.director}
              onChange={handleChange}
              required
              placeholder="Enter director name"
            />
          </div>
          
          {/* Cast */}
          <div className="space-y-2">
            <Label htmlFor="cast">Cast</Label>
            <div className="flex gap-2">
              <Input
                id="cast"
                value={castInput}
                onChange={(e) => setCastInput(e.target.value)}
                placeholder="Add cast member"
              />
              <Button type="button" onClick={addCastMember}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.cast.map((actor) => (
                <Badge key={actor} variant="secondary" className="pl-2 flex items-center gap-1">
                  {actor}
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-4 w-4 ml-1 hover:bg-destructive hover:text-destructive-foreground rounded-full"
                    onClick={() => removeCastMember(actor)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Synopsis */}
          <div className="space-y-2">
            <Label htmlFor="synopsis">Synopsis</Label>
            <Textarea
              id="synopsis"
              name="synopsis"
              value={formData.synopsis}
              onChange={handleChange}
              placeholder="Enter movie synopsis"
              rows={4}
              required
            />
          </div>
          
          {/* Poster URL */}
          <div className="space-y-2">
            <Label htmlFor="posterUrl">Poster URL</Label>
            <Input
              id="posterUrl"
              name="posterUrl"
              type="url"
              value={formData.posterUrl}
              onChange={handleChange}
              placeholder="Enter URL for movie poster"
              required
            />
            {formData.posterUrl && (
              <div className="mt-2 max-w-xs">
                <img 
                  src={formData.posterUrl} 
                  alt="Movie poster preview" 
                  className="w-full h-auto rounded-md border border-border"
                />
              </div>
            )}
          </div>
          
          <div className="flex gap-4 pt-4">
            <Button type="submit" className="w-full">
              {isEditing ? "Update Movie" : "Add Movie"}
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="w-full" 
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default MovieForm;
