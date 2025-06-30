import React from 'react';
import { render } from '@testing-library/react-native';

import { Colors } from '../constants/Colors';
import { ThemedText } from '../components/ThemedText';
import { useThemeColor } from '../hooks/useThemeColor';

jest.mock('../hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedText', () => {
  const mockColor = Colors.light.text;

  beforeEach(() => {
    (useThemeColor as jest.Mock).mockReturnValue(mockColor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders default text with correct color', () => {
    const { getByText } = render(<ThemedText>Test Default</ThemedText>);

    const text = getByText('Test Default');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        { color: mockColor },
        expect.objectContaining({ fontSize: 16, lineHeight: 24 }),
      ]),
    );
  });

  it('renders text with type="title" and correct styles', () => {
    const { getByText } = render(
      <ThemedText type="title">Test Title</ThemedText>,
    );

    const text = getByText('Test Title');
    expect(text.props.style).toEqual(
      expect.arrayContaining([
        { color: mockColor },
        expect.objectContaining({
          fontSize: 32,
          fontWeight: 'bold',
          lineHeight: 32,
        }),
      ]),
    );
  });

  it('renders text with custom lightColor/darkColor passed to useThemeColor', () => {
    render(
      <ThemedText lightColor="#111111" darkColor="#222222">
        Custom Colors
      </ThemedText>,
    );

    expect(useThemeColor).toHaveBeenCalledWith(
      { light: '#111111', dark: '#222222' },
      'text',
    );
  });

  it('matches snapshot with component"', () => {
    const { toJSON } = render(<ThemedText>Link Text</ThemedText>);
    expect(toJSON()).toMatchSnapshot();
  });
});
