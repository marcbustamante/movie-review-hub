
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import Layout from "../components/layout/Layout";
import MovieForm from "../components/movies/MovieForm";

const MovieFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { getMovie } = useMovieContext();
  const navigate = useNavigate();
  
  const movie = id ? getMovie(id) : undefined;

  if (id && !movie) {
    // If editing but movie not found, redirect to movies page
    navigate("/movies");
    return null;
  }

  const movieFormData = movie
    ? {
        id: movie.id,
        title: movie.title,
        year: movie.year,
        genres: movie.genres,
        director: movie.director,
        cast: movie.cast,
        synopsis: movie.synopsis,
        posterUrl: movie.posterUrl,
      }
    : undefined;

  return (
    <Layout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {id ? "Edit Movie" : "Add New Movie"}
        </h1>
        <MovieForm initialData={movieFormData} isEditing={!!id} />
      </div>
    </Layout>
  );
};

export default MovieFormPage;
