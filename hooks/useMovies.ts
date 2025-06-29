import { useInfiniteQuery } from "@tanstack/react-query";

import api from "../utils/axios";

export type Movie = {
    adult: boolean;
    id: number;
    title: string;
    original_title: string;
    poster_path: string;
    release_date: string;
    overview: string;
    backdrop_path: string;
    vote_average: number;
};

type MovieRequest = {
    language?: string;
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
export const useUpcomingMovies = ({ language = "en-US" }: MovieRequest) => {
  return useInfiniteQuery({
    queryKey: ['upcoming', language],
    queryFn: async ({ pageParam }): Promise<UpcompingAPIResponse> => {
      const response = await api.get(`/upcoming?language=${language}&page=${pageParam}`);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    getPreviousPageParam: (firstPage) => firstPage.page > 1 ? firstPage.page - 1 : 1
  });
};


// Hook to fetch the popular movies
export const usePopularMovies = ({ language = "en-US" }: MovieRequest) => {
  return useInfiniteQuery({
    queryKey: ['popular', language],
    queryFn: async ({ pageParam }): Promise<MovieResponse> => {
      const response = await api.get(`/popular?language=${language}&page=${pageParam}`);
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.page + 1,
    getPreviousPageParam: (firstPage) => firstPage.page > 1 ? firstPage.page - 1 : 1
  });
};