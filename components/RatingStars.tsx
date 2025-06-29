import { useMemo } from 'react';
import { Star } from 'react-native-feather';
import { StyleSheet, useColorScheme } from 'react-native';

import { ThemedView } from './ThemedView';

type RatingStarsProps = {
    rating: number;
    starSize?: number;
};

const RatingStars = ({ rating, starSize = 12 }: RatingStarsProps) => {
    const stars = useMemo(() => new Array(10).fill(0), []);
    const filledStars = useMemo(() => stars.map((s, index) => rating >= index ? 1 : 0), [rating, stars]);
    const colorScheme = useColorScheme() ?? "light";
    const starFilledColor = colorScheme === "light" ? "black" : "white";

    return (
        <ThemedView style={styles.starsContainer}>
            {filledStars.map((s, index) => (
                <Star
                    key={index+"star"}
                    {...!!s && { fill: starFilledColor }}
                    stroke={starFilledColor}
                    width={starSize}
                    height={starSize}
                    strokeWidth={1}
                />
            ))}
        </ThemedView>
    );
};

const styles = StyleSheet.create({
    starsContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: 'row'
    }
});

export default RatingStars;
