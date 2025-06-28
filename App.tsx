import { StyleSheet, useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Home as HomeIcon, Bookmark } from "react-native-feather";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Home from './app/Home';
import { Colors } from './constants/Colors';
import SavedMovies from './app/SavedMovies';
import ThemeContextProvider from './contexts/theme';
import { ThemedView } from './components/ThemedView';

const queryClient = new QueryClient();

function App() {
  const Tab = createBottomTabNavigator();
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
              component={Home}
              options={{
                tabBarIcon: ({ focused, color }) => <HomeIcon {...!!focused && { fill: color }} stroke={focused ? focusedIconStroke : iconStroke} width={22} height={22} strokeWidth={1.5} />
              }}
            />
            <Tab.Screen
              name="Movies"
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