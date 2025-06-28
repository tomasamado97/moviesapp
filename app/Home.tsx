import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { ThemedText } from "../components/ThemedText";
import { ThemedView } from "../components/ThemedView";


const Home = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ThemedView style={{ flex: 1 }}>
                <ThemedText>
                    Home
                </ThemedText>
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