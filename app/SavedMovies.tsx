import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "../components/ThemedText";
import { useThemeColor } from "../hooks/useThemeColor";
import { ThemedView } from "../components/ThemedView";

const SavedMovies = () => {
    const bgColor = useThemeColor({}, "background");

    return (
        <SafeAreaView style={{ ...styles.container, backgroundColor: bgColor }}>
            <ThemedText style={styles.title}>
                Bookmarks
            </ThemedText>
            <ScrollView>
                <ThemedView>

                </ThemedView>
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
    }
});

export default SavedMovies;