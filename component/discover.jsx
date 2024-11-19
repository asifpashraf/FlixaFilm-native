import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const Discover = ({ navigation }) => {
    const [movies, setMovies] = useState([]);

    async function fetchMovies() {
        const url = "https://api.themoviedb.org/3/discover/movie?language=en-US&api_key=5ef212dfa67e7d4937c0cda7fd1362f6";
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <ScrollView style={styles.container}>
          <View style={styles.header}>
                 <Text style={styles.title}>Discover Movies</Text>
             </View>
            <View style={styles.movies}>
                {movies.map((movie, index) => (
                    <TouchableOpacity 
                        key={index} 
                        style={styles.movieCard} 
                        onPress={() => navigation.navigate('MovieDetails', { movie })}
                    >
                        <Image 
                            style={styles.poster} 
                            source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
                            resizeMode="cover" 
                        />

                        <Text style={styles.movieTitle}>{movie.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
};

export default Discover;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1e1e2f',
    },
    header: {
        padding: 20,
        backgroundColor: '#ff6f61',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    movies: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding: 10,
    },
    movieCard: {
        width: 150,
        margin: 10,
        backgroundColor: '#292b44',
        borderRadius: 15,
        overflow: 'hidden',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 5,
    },
    poster: {
        width: '100%',
        height: 220,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    movieTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: '#f2f2f2',
        padding: 10,
        textAlign: 'center',
    },
});
