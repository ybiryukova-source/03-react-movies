import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

interface MovieSearchResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const API_URL = "https://api.themoviedb.org/3/search/movie";

export async function fetchMovies(
  query: string,
): Promise<Movie[]> {
  const token = import.meta.env.VITE_TMDB_TOKEN;

  if (!token) {
    throw new Error("TMDB token is missing. Check your .env file.");
  }

  const response: AxiosResponse<MovieSearchResponse> =
    await axios.get<MovieSearchResponse>(API_URL, {
      params: {
        query,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  return response.data.results;
}
