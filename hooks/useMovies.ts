import { useInfiniteQuery } from '@tanstack/react-query';

import api from '../utils/axios';

// Movie representation, does not include all the attrs that are in the API
// since we don't use all of them.
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

// Typed request for APIs that allow language as a parameter.
type MovieRequest = {
  language?: string;
};

// Typed response for APIs that return movies paged
type MovieResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

// Typed response for APIs that return movies paged that include dates
type UpcompingAPIResponse = MovieResponse & {
  dates: {
    maximum: string;
    minimum: string;
  };
};

// Hook to fetch the upcoming movies by page as an infinite query
export const useUpcomingMovies = ({ language = 'en-US' }: MovieRequest) => {
  return useInfiniteQuery({
    queryKey: ['upcoming', language],
    queryFn: async ({ pageParam }): Promise<UpcompingAPIResponse> => {
      const response = await api.get(
        `/movie/upcoming?language=${language}&page=${pageParam}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.page + 1,
    getPreviousPageParam: firstPage =>
      firstPage.page > 1 ? firstPage.page - 1 : 1,
  });
};

// Hook to fetch the popular movies by page as an infinite query
export const usePopularMovies = ({ language = 'en-US' }: MovieRequest) => {
  return useInfiniteQuery({
    queryKey: ['popular', language],
    queryFn: async ({ pageParam }): Promise<MovieResponse> => {
      const response = await api.get(
        `/movie/popular?language=${language}&page=${pageParam}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.page + 1,
    getPreviousPageParam: firstPage =>
      firstPage.page > 1 ? firstPage.page - 1 : 1,
  });
};

// Hook to fetch the popular movies, only runs if we have a valid query
export const useSearchMovies = ({
  language = 'en-US',
  query,
}: MovieRequest & { query: string }) => {
  return useInfiniteQuery({
    queryKey: ['search', query, language],
    queryFn: async ({ pageParam }): Promise<MovieResponse> => {
      const response = await api.get(
        `/search/movie?query=${query}&language=${language}&page=${pageParam}`,
      );
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: lastPage => lastPage.page + 1,
    getPreviousPageParam: firstPage =>
      firstPage.page > 1 ? firstPage.page - 1 : 1,
    enabled: !!query,
  });
};
