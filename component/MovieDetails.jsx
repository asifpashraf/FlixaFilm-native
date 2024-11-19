import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const MovieDetails = ({ route }) => {
    const { movie } = route.params;

    return (
        <ScrollView style={styles.container}>
            <Image 
                style={styles.poster} 
                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
                resizeMode="cover" 
            />

            <View style={styles.details}>
                <Text style={styles.title}>{movie.title}</Text>
                <Text style={styles.subTitle}>Release Date: {movie.release_date}</Text>
                <Text style={styles.subTitle}>Rating: {movie.vote_average}/10</Text>
                <Text style={styles.overview}>{movie.overview}</Text>
            </View>
        </ScrollView>
    );
};

export default MovieDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e2f',
    },
    poster: {
        width: '100%',
        height: 450,
        

    },
    details: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6f61',
        marginBottom: 10,
    },
    subTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#f2f2f2',
        marginBottom: 5,
    },
    overview: {
        fontSize: 14,
        color: '#dcdcdc',
        marginTop: 10,
        lineHeight: 20,
    },
});
