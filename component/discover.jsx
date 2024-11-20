import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const Discover = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const API_KEY = '5ef212dfa67e7d4937c0cda7fd1362f6';

    async function fetchMovies(genreId = null, query = '') {
        let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&api_key=${API_KEY}`;
        if (genreId) url += `&with_genres=${genreId}`;
        if (query) url = `https://api.themoviedb.org/3/search/movie?language=en-US&api_key=${API_KEY}&query=${query}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(data.results);
        } catch (error) {
            console.error('Error fetching movies:', error);
        }
    }

    async function fetchGenres() {
        const url = `https://api.themoviedb.org/3/genre/movie/list?language=en-US&api_key=${API_KEY}`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setGenres(data.genres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    }

    useEffect(() => {
        fetchMovies();
        fetchGenres();
    }, []);

    const handleSearch = () => {
        fetchMovies(null, searchQuery);
    };

    return (
        <ScrollView style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Movies"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
            />
            <ScrollView horizontal style={styles.genreList}>
                {genres.map((genre) => (
                    <TouchableOpacity 
                        key={genre.id} 
                        style={[
                            styles.genreButton, 
                            selectedGenre === genre.id && styles.selectedGenre
                        ]}
                        onPress={() => {
                            setSelectedGenre(genre.id);
                            fetchMovies(genre.id);
                        }}
                    >
                        <Text style={styles.genreText}>{genre.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
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
        paddingTop: 10,
    },
    searchBar: {
        margin: 10,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#292b44',
        color: '#fff',
    },
    genreList: {
        marginVertical: 10,
        paddingHorizontal: 10,
    },
    genreButton: {
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 20,
        backgroundColor: '#292b44',
    },
    selectedGenre: {
        backgroundColor: '#ff6f61',
    },
    genreText: {
        color: '#fff',
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
