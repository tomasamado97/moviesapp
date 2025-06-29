import React, { useCallback, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ImageBackground, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { CompositeNavigationProp, useFocusEffect, useNavigation } from "@react-navigation/native";

import { Movie } from "../hooks/useMovies";
import { ThemedView } from "../components/ThemedView";
import { ThemedText } from "../components/ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";
import { RootTabParamList, StackParamList } from "../App";
import { IMAGE_URL, STORED_MOVIES_KEY } from "../utils/config";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

type NavigationProps = CompositeNavigationProp<
    BottomTabNavigationProp<RootTabParamList, "Bookmarks">,
    NativeStackNavigationProp<StackParamList, 'MovieDetail'>
>;

const SavedMovies = () => {
    const navigation = useNavigation<NavigationProps>();
    const bgColor = useThemeColor({}, "background");
    const [storedMovies, setStoredMovies] = useState<Movie[]>([]);

    const getStoredMovies = useCallback(async () => {
        try {
            const stringStoredMovies = await AsyncStorage.getItem(STORED_MOVIES_KEY);
            const storedMovies: Movie[] = JSON.parse(stringStoredMovies || "[]");
            setStoredMovies(storedMovies);
        }catch(error){
            setStoredMovies([]);
            // TODO: Handle error while fetching stored movies.
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            getStoredMovies()
        }, [getStoredMovies])
    );

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: bgColor }}>
            <ThemedText style={styles.title}>
                Bookmarks
            </ThemedText>
            <ScrollView style={styles.bodyContainer}>
                {storedMovies.map((movie: Movie) => (
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
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
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
    }
});

export default SavedMovies;