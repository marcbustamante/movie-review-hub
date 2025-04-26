
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMovieContext } from "../contexts/MovieContext";
import Layout from "../components/layout/Layout";
import MovieGrid from "../components/movies/MovieGrid";
import HeroSection from "../components/ui/hero-section";

const Index: React.FC = () => {
  const { movies } = useMovieContext();
  const navigate = useNavigate();

  const topRatedMovies = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);

  const latestMovies = [...movies]
    .sort((a, b) => b.year - a.year)
    .slice(0, 5);
  
  const navigateToSearch = () => {
    navigate("/movies");
  };

  return (
    <Layout>
      <HeroSection
        title="Discover & Review Movies"
        subtitle="Share your opinions and explore what others are watching. Your go-to platform for movie reviews and recommendations."
        searchAction={navigateToSearch}
      />
      
      <div className="mt-12 space-y-12">
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Top Rated Movies</h2>
            <Link to="/movies" className="text-movie-purple hover:text-movie-purple-dark text-sm font-medium">
              View All Movies
            </Link>
          </div>
          <MovieGrid movies={topRatedMovies} />
        </section>
        
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Latest Movies</h2>
            <Link to="/movies" className="text-movie-purple hover:text-movie-purple-dark text-sm font-medium">
              View All Movies
            </Link>
          </div>
          <MovieGrid movies={latestMovies} />
        </section>
      </div>
    </Layout>
  );
};

export default Index;
