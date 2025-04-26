
export interface Movie {
  id: string;
  title: string;
  year: number;
  genres: string[];
  director: string;
  cast: string[];
  synopsis: string;
  posterUrl: string;
  rating: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  movieId: string;
  author: string;
  rating: number;
  content: string;
  date: string;
}

export type MovieFormData = Omit<Movie, "id" | "reviews" | "rating"> & {
  id?: string;
};

export type ReviewFormData = Omit<Review, "id" | "date" | "movieId"> & {
  id?: string;
};
