import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "../components/ThemedText";

const SavedMovies = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ThemedText>
                SavedMovies
            </ThemedText>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default SavedMovies;