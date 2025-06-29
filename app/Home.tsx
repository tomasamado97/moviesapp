import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ActivityIndicator, ImageBackground, ScrollView, StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

import { StackParamList } from "../App";
import { IMAGE_URL } from "../utils/config";
import { Colors } from "../constants/Colors";
import MovieCard from "../components/MovieCard";
import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { usePopularMovies, useUpcomingMovies } from "../hooks/useMovies";

type NavigationProps = NativeStackNavigationProp<StackParamList, 'MovieDetail'>;

const Home = () => {
    const navigation = useNavigation<NavigationProps>();
    const { data: upcomingPages, status: statusUpcoming, error: errorUpcoming, fetchNextPage: fetchNextUpcoming } = useUpcomingMovies({});
    const { data: popularPages, status: statusPopular, error: errorPopular, fetchNextPage: fetchNextPopular } = usePopularMovies({});
    const posterMovie = upcomingPages?.pages[0].results[0];
    const colorscheme = useColorScheme() ?? "light";
    const seeMoreBtnStyle = {
        ...styles.seeMoreBtn,
        backgroundColor: colorscheme === "light" ? "rgba(0, 0, 0, 0.75)" : "rgba(255, 255, 255, 0.95)",
        borderColor: colorscheme === "light" ? "white" : "none",
        boxShadow: colorscheme === "light" ? "5px 5px 5px rgba(0, 0, 0, 0.15)" : 'unset'
    };
    const seeMoreTxtStyle = {
        color: colorscheme === "light" ? "white" : "black"
    };

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: Colors[colorscheme].background}}>
            <ScrollView style={styles.scrollContainer}>
                {!!posterMovie &&
                    <ImageBackground
                        style={styles.imagePoster}
                        source={{ uri: `${IMAGE_URL}/w500${posterMovie.backdrop_path}` }}
                        resizeMode="cover"
                    >
                        <TouchableOpacity
                            style={styles.posterBtn}
                            onPress={() => navigation.navigate("MovieDetail", { movie: posterMovie })}
                        >
                            <ThemedText style={styles.posterText}>
                                Details
                            </ThemedText>
                        </TouchableOpacity>
                    </ImageBackground>
                }

                <ThemedView style={styles.upcomingContainer}>
                    <ThemedText style={styles.title}>
                        Upcoming Movies
                    </ThemedText>

                    {!errorUpcoming && 
                        <ScrollView horizontal contentContainerStyle={styles.listContainer}>
                            {upcomingPages?.pages.map((upage, index) => (
                                <React.Fragment key={"upcoming" + index}>
                                    {upage?.results.slice(1).map(upm =>
                                        <MovieCard
                                            key={"upcoming" + upm.id}
                                            movie={upm}
                                        />
                                    )}
                                </React.Fragment>
                            ))}

                            {statusUpcoming === "pending" &&
                                <ActivityIndicator size="large" color={Colors[colorscheme].tint} />
                            }

                            {statusUpcoming !== "pending" &&
                                <TouchableOpacity
                                    style={seeMoreBtnStyle}
                                    onPress={() => fetchNextUpcoming()}
                                >
                                    <ThemedText style={seeMoreTxtStyle}>
                                        See more
                                    </ThemedText>
                                </TouchableOpacity>
                            }
                        </ScrollView>
                    }

                    {!!errorUpcoming &&
                        <ThemedText style={styles.errorMessage}>
                            {errorUpcoming.message}
                        </ThemedText>
                    }
                </ThemedView>

                <ThemedView style={styles.popularContainer}>
                    <ThemedText style={styles.title}>
                        Popular Movies
                    </ThemedText>

                    {!errorPopular && 
                        <ScrollView horizontal contentContainerStyle={styles.listContainer}>
                            {popularPages?.pages.map((ppage, index) => (
                                <React.Fragment key={"popular" + index}>
                                    {ppage?.results.map(pm =>
                                        <MovieCard
                                            key={"popular" + pm.id}
                                            movie={pm}
                                        />
                                    )}
                                </React.Fragment>
                            ))}

                            {statusPopular === "pending" &&
                                <ActivityIndicator size="large" color={Colors[colorscheme].tint} />
                            }

                            {statusPopular !== "pending" &&
                                <TouchableOpacity
                                    style={seeMoreBtnStyle}
                                    onPress={() => fetchNextPopular()}
                                >
                                    <ThemedText style={seeMoreTxtStyle}>
                                        See more
                                    </ThemedText>
                                </TouchableOpacity>
                            }
                        </ScrollView>
                    }

                    {!!errorPopular &&
                        <ThemedText style={styles.errorMessage}>
                            {errorPopular.message}
                        </ThemedText>
                    }
                </ThemedView>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
    },
    imagePoster: {
        height: 280,
        position: "relative",
    },
    posterBtn: {
        position: "absolute",
        bottom: 20,
        left: "35%",
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 15,
        width: 120,
        height: 40,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.45)"
    },
    posterText: {
        color: "white",
    },
    listContainer: {
        display: "flex",
        alignItems: "center",
        paddingVertical: 10
    },
    upcomingContainer: {
        paddingTop: 20
    },
    title: {
        paddingHorizontal: 10,
        fontSize:  20
    },
    popularContainer: {
        paddingTop: 40
    },
    seeMoreBtn: {
        height: 200,
        width: 160,
        margin: 10,
        borderRadius: 10,
        borderWidth: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    seeMoreText: {
        color: "white"
    },
    errorMessage: {
        color: "red"
    }
});

export default Home;