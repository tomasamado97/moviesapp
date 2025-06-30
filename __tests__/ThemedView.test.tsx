import React from 'react';
import { render } from '@testing-library/react-native';

import { Colors } from '../constants/Colors';
import { ThemedView } from '../components/ThemedView';
import { useThemeColor } from '../hooks/useThemeColor';

jest.mock('../hooks/useThemeColor', () => ({
  useThemeColor: jest.fn(),
}));

describe('ThemedView', () => {
  const mockColor = Colors.light.background;

  beforeEach(() => {
    (useThemeColor as jest.Mock).mockReturnValue(mockColor);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders with correct background color', () => {
    const { getByTestId } = render(
      <ThemedView testID="themed-view">Content</ThemedView>,
    );

    const view = getByTestId('themed-view');
    expect(view.props.style).toEqual(
      expect.arrayContaining([{ backgroundColor: mockColor }]),
    );
  });

  it('calls useThemeColor with correct params', () => {
    render(
      <ThemedView lightColor="#111111" darkColor="#222222">
        Content
      </ThemedView>,
    );

    expect(useThemeColor).toHaveBeenCalledWith(
      { light: '#111111', dark: '#222222' },
      'background',
    );
  });

  it('matches snapshot with component', () => {
    const { toJSON } = render(<ThemedView>Snapshot Content</ThemedView>);
    expect(toJSON()).toMatchSnapshot();
  });
});
