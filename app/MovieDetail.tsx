import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";

import { StackParamList } from "../App";
import { ThemedText } from "../components/ThemedText";

type MovieDetailProps = RouteProp<StackParamList, 'MovieDetail'>;

const MovieDetail = () => {
    const navigation = useNavigation();
    const route = useRoute<MovieDetailProps>();
    const { movie } = route.params;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <ThemedText>
                    Go back
                </ThemedText>
            </TouchableOpacity>
            <ThemedText>
                {movie.title}
            </ThemedText>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default MovieDetail;