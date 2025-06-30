import React from 'react';
import * as ReactNative from 'react-native';
import { render } from '@testing-library/react-native';

import RatingStars from '../components/RatingStars';

jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('light');

describe('RatingStars', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders 10 stars with correct number of filled stars', () => {
    const { getAllByTestId } = render(<RatingStars rating={5} starSize={20} />);

    const stars = getAllByTestId('star-icon');
    expect(stars).toHaveLength(10);

    const filledStars = stars.filter(star => star.props.fill === 'black');
    expect(filledStars).toHaveLength(6);
  });

  it('renders with dark color scheme', () => {
    (ReactNative.useColorScheme as jest.Mock).mockReturnValue('dark');

    const { getAllByTestId } = render(<RatingStars rating={3} />);
    const stars = getAllByTestId('star-icon');

    const filledStars = stars.filter(star => star.props.fill === 'white');
    expect(filledStars).toHaveLength(4);
  });

  it('matches snapshot with components', () => {
    const { toJSON } = render(<RatingStars rating={7} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
