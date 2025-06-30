import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { fireEvent, render } from '@testing-library/react-native';

import { Movie } from '../hooks/useMovies';
import MovieCard from '../components/MovieCard';

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigation: jest.fn(),
  };
});

describe('MovieCard', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigation as jest.Mock).mockReturnValue({
      navigate: mockNavigate,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockMovie: Movie = {
    id: 1,
    adult: false,
    title: 'Test movie',
    original_title: 'Test movie original',
    poster_path: '/poster.jpg',
    release_date: '2025-07-02',
    overview: 'This is a test movie for testing purposes',
    backdrop_path: '/backdrop.jpg',
    vote_average: 5.5,
  };

  it('Renders movie title and image', async () => {
    const { getByTestId } = render(<MovieCard movie={mockMovie} />);

    expect(getByTestId('movie-title')).toBeTruthy();
  });

  it('Navigates to MovieDetail on press', () => {
    const { getByTestId } = render(<MovieCard movie={mockMovie} />);
    const touchable = getByTestId('movie-touchable');
    fireEvent.press(touchable);

    expect(mockNavigate).toHaveBeenCalledWith('MovieDetail', {
      movie: mockMovie,
    });
  });

  // prevents regression errors when the component is changed
  it('Matches snapshot component', () => {
    const { toJSON } = render(<MovieCard movie={mockMovie} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
