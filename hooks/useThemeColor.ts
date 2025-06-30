import { Colors } from '../constants/Colors';
import { useColorScheme } from '../hooks/useColorScheme';

// Hook to get the colors or change them depending on the theme.
export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark,
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}
