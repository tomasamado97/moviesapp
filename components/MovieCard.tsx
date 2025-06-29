import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';

import { StackParamList } from '../App';
import { ThemedText } from './ThemedText';
import { Movie } from '../hooks/useMovies';
import { IMAGE_URL } from '../utils/config';

type MovieCardProps = {
    movie: Movie
};

type NavigationProps = NativeStackNavigationProp<StackParamList, 'MovieDetail'>;

const MovieCard = ({ movie }: MovieCardProps) => {
    const navigation = useNavigation<NavigationProps>();
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("MovieDetail", { movie })}
        >
            <ImageBackground
                source={{ uri: `${IMAGE_URL}/w500${movie.poster_path}` }}
                style={styles.containerImage}
                imageStyle={styles.movieImage}
                resizeMode='cover'
            >
                 <LinearGradient
                    colors={['rgba(255, 255, 255, 0.7)', 'transparent']}
                    style={styles.background}
                    start={{ x: 0, y: 0.1 }}
                    end={{ x: 0, y: 0.8 }}
                >
                    <ThemedText style={styles.movieText}>
                        {movie.title.substring(0, 15) + "..."}
                    </ThemedText>
                </LinearGradient>
            </ImageBackground>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    containerImage: {
        width: 160,
        height: 200,
        margin: 10,
        borderRadius: 10,
    },
    movieImage: {
        borderRadius: 10,
    },
    movieText: {
        color: "black",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    background: {
        flex: 1,
        borderRadius: 10,
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
    }
});

export default MovieCard;
