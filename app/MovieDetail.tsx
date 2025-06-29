import React, { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Bookmark, ChevronLeft } from "react-native-feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { StackParamList } from "../App";
import { Colors } from "../constants/Colors";
import RatingStars from "../components/RatingStars";
import { Movie } from "../hooks/useMovies";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { useThemeColor } from "../hooks/useThemeColor";
import { IMAGE_URL, STORED_MOVIES_KEY } from "../utils/config";

type MovieDetailProps = RouteProp<StackParamList, 'MovieDetail'>;

const MovieDetail = () => {
    const navigation = useNavigation();
    const route = useRoute<MovieDetailProps>();
    const { movie } = route.params;
    const bgColor = useThemeColor({}, 'background');
    const colorScheme = useColorScheme() ?? "light";
    const [isAlreadySaved, setIsAlreadySaved] = useState(false);

    const isMovieSaved = useCallback(async (id: number) => {
        try {
            const stringMoviesStored = await AsyncStorage.getItem(STORED_MOVIES_KEY);
            const storedMovies = JSON.parse(stringMoviesStored || "[]");
            setIsAlreadySaved(!!storedMovies.find((sm: Movie) => sm.id === id));
        }catch(error){
            // TODO: Handle error while reading async storage
            console.log(error, 'error')
        }
    }, []);

    useEffect(() => {
        isMovieSaved(movie.id)
    }, [isMovieSaved, movie.id]);


    const onSaveMovie = useCallback(async () => {
        try {
            // TODO: save movie to API.
            const stringMoviesStored = await AsyncStorage.getItem(STORED_MOVIES_KEY);
            const storedMovies = JSON.parse(stringMoviesStored || "[]");

            const updatedMovies = isAlreadySaved ? storedMovies.filter((m: Movie) => m.id !== movie.id) : [...storedMovies, movie];
            setIsAlreadySaved(!isAlreadySaved)
            await AsyncStorage.setItem(STORED_MOVIES_KEY, JSON.stringify(updatedMovies));

        }catch(error){
            // TODO: Handle error while saving movie to storage.
            console.log(error, 'error saving movie');
        }
    }, [isAlreadySaved, movie]);

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: bgColor }}>
            <ThemedView style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ ...styles.backBtn, backgroundColor: colorScheme === "light" ? Colors.dark.background : Colors.light.background}}
                >
                    <ChevronLeft stroke={colorScheme === "light" ? "white" : "black"} width={24} height={24} strokeWidth={1.5} />
                </TouchableOpacity>
                <Image
                    style={styles.imagePoster}
                    source={{ uri: `${IMAGE_URL}/w500${movie.backdrop_path}` }}
                    resizeMode="cover"  
                />
                <TouchableOpacity
                    onPress={() => onSaveMovie()}
                    style={{ ...styles.bookmark, backgroundColor: colorScheme === "light" ? Colors.dark.background : Colors.light.background}}
                >
                    <Bookmark
                        {...isAlreadySaved && { fill: colorScheme === "light" ? "white" : "black" }}
                        stroke={colorScheme === "light" ? "white" : "black"}
                        width={22}
                        height={22}
                        strokeWidth={1.5}
                    />
                </TouchableOpacity>
            </ThemedView>
            <ThemedView style={styles.body}>
                <ThemedView style={styles.bodyHead}>
                    <ThemedText
                        numberOfLines={4}
                        ellipsizeMode="tail"
                        style={styles.headerTitle}
                    >
                        {movie.title}
                    </ThemedText>
                    <ThemedText style={styles.movieDate}>
                        {movie.release_date}
                    </ThemedText>
                </ThemedView>
                <ThemedView style={styles.starsAndRating}>
                    <RatingStars rating={movie.vote_average} />

                    {movie.adult &&
                        <ThemedText style={styles.ratedR}>
                            Rated R
                        </ThemedText>
                    }
                </ThemedView>
                <ScrollView>
                    <ThemedText style={styles.overview}>
                        {movie.overview}
                    </ThemedText>
                </ScrollView>
            </ThemedView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        position: "relative"
    },
    backBtn: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 35,
        width: 35,
        position: "absolute",
        left: 10,
        top: 10,
        zIndex: 2
    },
    bookmark: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        height: 35,
        width: 35,
        position: "absolute",
        right: 10,
        top: 10,
        zIndex: 2
    },
    headerTitle: {
        fontSize: 22,
        width: 280
    },
    body: {
        marginTop: 14,
        paddingHorizontal: 10
    },
    bodyHead: {
        display: 'flex',
        alignItems: "baseline",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    starsAndRating: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "baseline",
        marginVertical: 10
    },
    imagePoster: {
        height: 300,
        width: "auto"
    },
    movieDate: {
        fontSize: 16
    },
    ratedR: {
        fontSize: 14
    },
    overview: {
        paddingTop: 10
    }
});

export default MovieDetail;