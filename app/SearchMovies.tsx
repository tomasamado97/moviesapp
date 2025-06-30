import { CompositeNavigationProp, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, TextInput, TouchableOpacity, useColorScheme } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootTabParamList, StackParamList } from "../App";
import { Movie, useSearchMovies } from "../hooks/useMovies";
import { IMAGE_URL } from "../utils/config";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { Colors } from "../constants/Colors";
import { useDebounceValue } from "../hooks/useDebounceValue";

type NavigationProps = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, "Bookmarks">,
    NativeStackNavigationProp<StackParamList, 'MovieDetail'>
>;

const SearchMovies = () => {
    const navigation = useNavigation<NavigationProps>();
    const bgColor = useThemeColor({}, "background");
    const colorScheme = useColorScheme() ?? "light";
    const inputThemeStyle = {
        ...styles.searchInput,
        borderColor: Colors[colorScheme === 'dark' ? 'light' : 'dark'].background,
        borderWidth: 1,
        borderRadius: 10,
        color: Colors[colorScheme === 'dark' ? 'light' : 'dark'].background
    };
    const [searchQuery, setSearchQuery] = useDebounceValue("", 500);
    const { data: searchedMovies, isFetching, error } = useSearchMovies({ query: searchQuery });

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: bgColor }}>
            <ThemedText style={styles.title}>
                Search
            </ThemedText>
            <TextInput
                style={inputThemeStyle}
                placeholder="Search a movie by title..."
                defaultValue=""
                onChangeText={(newValue) => setSearchQuery(newValue)}
            />
            {!isFetching &&
                <ScrollView style={styles.bodyContainer}>
                    {searchedMovies?.pages.map((page, index) => (
                        <React.Fragment key={index+"searchpage"}>
                            {page.results.map((movie: Movie) => (
                                <TouchableOpacity
                                    key={movie.id}
                                    style={styles.movieBtn}
                                    onPress={() => navigation.navigate("Home", { screen: "MovieDetail", params: { movie } })}
                                >
                                    <ThemedView>
                                        <ThemedText numberOfLines={1} ellipsizeMode="tail">
                                            {movie.title}
                                        </ThemedText>
                                        <ImageBackground
                                            style={styles.movieImgContainer}
                                            imageStyle={styles.movieImg}
                                            source={{ uri: `${IMAGE_URL}/w500${movie.backdrop_path}` }}
                                            resizeMode="cover"
                                        />
                                    </ThemedView>
                                </TouchableOpacity>
                            ))}
                        </React.Fragment>
                    ))}
                </ScrollView>
            }

            {isFetching &&
                <ActivityIndicator size="large" color={Colors[colorScheme].tint} />
            }

            {!!error &&
                <ThemedText style={styles.errorMessage}>
                    {error.message}
                </ThemedText>
            }
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center"
    },
    title: {
        fontSize: 22,
        textAlign: "center"
    },
    bodyContainer: {
        paddingHorizontal: 10,
        marginTop: 12
    },
    movieBtn: {
        marginBottom: 12
    },
    movieImgContainer: {
        width: "100%",
        height: 120
    },
    movieImg: {
        borderRadius: 20,
    },
    searchInput: {
        width: "95%",
        height: 60,
        fontSize: 22,
        padding: 5,
        marginTop: 12,
    },
    errorMessage: {
        color: "red"
    }
});

export default SearchMovies;