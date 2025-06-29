import { StyleSheet, useColorScheme } from 'react-native';
import { Home as HomeIcon, Bookmark } from "react-native-feather";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Home from './app/Home';
import { Movie } from './hooks/useMovies';
import MovieDetail from './app/MovieDetail';
import { Colors } from './constants/Colors';
import SavedMovies from './app/SavedMovies';
import ThemeContextProvider from './contexts/theme';
import { ThemedView } from './components/ThemedView';

const queryClient = new QueryClient();

export type StackParamList = {
  HomeMovies: undefined;
  MovieDetail: { movie: Movie };
};

export type RootTabParamList = {
  Home: undefined;
  Bookmarks: undefined;
};

function App() {
  const Tab = createBottomTabNavigator<RootTabParamList>();
  const Stack = createNativeStackNavigator<StackParamList>();
  const colorscheme = useColorScheme();
  const iconStroke = colorscheme === 'dark' ? "white" : "black";
  const focusedIconStroke = colorscheme === 'dark' ? "black" : "white";

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <ThemeContextProvider>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: Colors[colorscheme ?? 'light'].tint,
              headerShown: false,
              tabBarBackground: () => <ThemedView style={StyleSheet.absoluteFill} />
            }}
            initialRouteName='Home'
          >
            <Tab.Screen
              name="Home"
              options={{
                tabBarIcon: ({ focused, color }) => <HomeIcon {...!!focused && { fill: color }} stroke={focused ? focusedIconStroke : iconStroke} width={22} height={22} strokeWidth={1.5} />
              }}
              children={() => (
                <Stack.Navigator
                  initialRouteName='HomeMovies'
                  screenOptions={{
                    headerShown: false
                  }}
                >
                  <Stack.Screen
                      name="HomeMovies"
                      component={Home}
                  />
                  <Stack.Screen
                      name="MovieDetail"
                      component={MovieDetail}
                    />
                </Stack.Navigator>
              )}
            />
            <Tab.Screen
              name="Bookmarks"
              component={SavedMovies}
              options={{
                tabBarIcon: ({ focused, color }) => <Bookmark {...!!focused && { fill: color }} stroke={focused ? focusedIconStroke : iconStroke} width={22} height={22} strokeWidth={1.5} />
              }}
            />
          </Tab.Navigator>
        </ThemeContextProvider>
      </NavigationContainer>
    </QueryClientProvider>
  );
}

export default App;