import { useQuery } from "@tanstack/react-query";
import api from "../utils/axios";

type Movie = {
    adult: boolean;
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    overview: string;
};

type MovieRequest = {
    language?: string;
    page?: number;
}

type MovieResponse = {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
};

type UpcompingAPIResponse = MovieResponse & {
    dates: {
        maximum: string;
        minimum: string;
    };
};

// Hook to fetch the upcoming movies
export const useUpcomingMovies = ({ language = "en-US", page = 1 }: MovieRequest) => {
  return useQuery({
    queryKey: ['upcoming', page, language],
    queryFn: async (): Promise<UpcompingAPIResponse> => {
      const response = await api.get(`/upcoming?language=${language}&page=${page}`);
      return response.data;
    }
  });
};


// Hook to fetch the popular movies
export const usePopularMovies = ({ language = "en-US", page = 1 }: MovieRequest) => {
  return useQuery({
    queryKey: ['popular', page, language],
    queryFn: async (): Promise<MovieResponse> => {
      const response = await api.get(`/popular?language=${language}&page=${page}`);
      return response.data;
    }
  });
};