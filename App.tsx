import { StyleSheet, useColorScheme } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home as HomeIcon, Bookmark, Search } from 'react-native-feather';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  NavigationContainer,
  NavigatorScreenParams,
} from '@react-navigation/native';

import Home from './app/Home';
import { Movie } from './hooks/useMovies';
import MovieDetail from './app/MovieDetail';
import { Colors } from './constants/Colors';
import SavedMovies from './app/SavedMovies';
import SearchMovies from './app/SearchMovies';
import { ThemedView } from './components/ThemedView';
import { useCallback } from 'react';

const queryClient = new QueryClient();

export type StackParamList = {
  HomeMovies: undefined;
  MovieDetail: { movie: Movie };
};

export type RootTabParamList = {
  Home: NavigatorScreenParams<StackParamList>;
  Bookmarks: undefined;
  Search: undefined;
};

type IconProps = {
  focused: boolean;
  color: string;
};

const HomeNavigator = () => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <Stack.Navigator
      initialRouteName="HomeMovies"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="HomeMovies" component={Home} />
      <Stack.Screen name="MovieDetail" component={MovieDetail} />
    </Stack.Navigator>
  );
};

function App() {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const colorscheme = useColorScheme() ?? 'light';
  const iconStroke = colorscheme === 'dark' ? 'white' : 'black';

  const HomeIconComponent = useCallback(
    ({ focused, color }: IconProps) => (
      <HomeIcon
        {...(!!focused && { fill: color })}
        stroke={focused ? Colors[colorscheme].tabIconDefault : iconStroke}
        width={22}
        height={22}
        strokeWidth={1.5}
      />
    ),
    [colorscheme, iconStroke],
  );

  const BookmarkComponent = useCallback(
    ({ focused, color }: IconProps) => (
      <Bookmark
        {...(!!focused && { fill: color })}
        stroke={focused ? Colors[colorscheme].tabIconDefault : iconStroke}
        width={22}
        height={22}
        strokeWidth={1.5}
      />
    ),
    [colorscheme, iconStroke],
  );

  const SearchComponent = useCallback(
    ({ focused, color }: IconProps) => (
      <Search
        {...(!!focused && { fill: color })}
        stroke={focused ? Colors[colorscheme].tabIconDefault : iconStroke}
        width={22}
        height={22}
        strokeWidth={1.5}
      />
    ),
    [colorscheme, iconStroke],
  );

  const TabBarBackground = useCallback(
    () => <ThemedView style={StyleSheet.absoluteFill} />,
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor:
              Colors[colorscheme ?? 'light'].tabIconSelected,
            headerShown: false,
            tabBarBackground: TabBarBackground,
          }}
          initialRouteName="Home"
        >
          <Tab.Screen
            name="Home"
            component={HomeNavigator}
            options={{ tabBarIcon: HomeIconComponent }}
          />
          <Tab.Screen
            name="Bookmarks"
            component={SavedMovies}
            options={{ tabBarIcon: BookmarkComponent }}
          />
          <Tab.Screen
            name="Search"
            component={SearchMovies}
            options={{
              tabBarIcon: SearchComponent,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;
