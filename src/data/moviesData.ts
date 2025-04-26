
import { Movie } from "../types/movie";

export const moviesData: Movie[] = [
  {
    id: "1",
    title: "Inception",
    year: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    cast: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
    synopsis: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    posterUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.8,
    reviews: [
      {
        id: "101",
        movieId: "1",
        author: "MovieFan123",
        rating: 5,
        content: "Mind-bending masterpiece with incredible visual effects and a thought-provoking plot.",
        date: "2023-01-15"
      },
      {
        id: "102",
        movieId: "1",
        author: "FilmCritic99",
        rating: 4.5,
        content: "Nolan at his best. The dream sequences are incredibly well-crafted and the acting is superb.",
        date: "2023-02-20"
      }
    ]
  },
  {
    id: "2",
    title: "The Shawshank Redemption",
    year: 1994,
    genres: ["Drama"],
    director: "Frank Darabont",
    cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    synopsis: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    posterUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    rating: 4.9,
    reviews: [
      {
        id: "201",
        movieId: "2",
        author: "ClassicFilmBuff",
        rating: 5,
        content: "Perhaps the greatest movie ever made. A story of hope and perseverance.",
        date: "2023-03-10"
      }
    ]
  },
  {
    id: "3",
    title: "The Dark Knight",
    year: 2008,
    genres: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    synopsis: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    posterUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80",
    rating: 4.7,
    reviews: [
      {
        id: "301",
        movieId: "3",
        author: "DCFanatic",
        rating: 5,
        content: "Heath Ledger's Joker is one of the greatest performances in cinema history.",
        date: "2023-01-05"
      },
      {
        id: "302",
        movieId: "3",
        author: "BatmanLover",
        rating: 4.5,
        content: "The perfect superhero movie that transcends the genre.",
        date: "2023-02-15"
      }
    ]
  },
  {
    id: "4",
    title: "Pulp Fiction",
    year: 1994,
    genres: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    cast: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    synopsis: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    posterUrl: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1274&q=80",
    rating: 4.6,
    reviews: [
      {
        id: "401",
        movieId: "4",
        author: "TarantinoFan",
        rating: 5,
        content: "Revolutionary storytelling and unforgettable characters. A true classic.",
        date: "2023-04-22"
      }
    ]
  }
];
