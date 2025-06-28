import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";
import { usePopularMovies, useUpcomingMovies } from "../hooks/useMovies";


const Home = () => {
    const { data: upcomingData, status: statusUpcoming, error: errorUpcoming } = useUpcomingMovies({ page: 1 });
    const { data: popularData, status: statusPopular, error: errorPopular } = usePopularMovies({ page: 1 });

    console.log(upcomingData, popularData, 'data')

    console.log(errorUpcoming, errorPopular, 'errors')

    console.log(statusUpcoming, statusPopular, 'status')

    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={{ flex: 1 }}>
                <ThemedText>
                    Home
                </ThemedText>
                {upcomingData?.results.map(upm => <ThemedText key={upm.id}>{upm.title}</ThemedText>)}
                {popularData?.results.map(pm => <ThemedText key={pm.id}>{pm.title}</ThemedText>)}
            </ThemedView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default Home;