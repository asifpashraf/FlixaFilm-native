import { Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';

const { width } = Dimensions.get('window');

const Discover = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const API_KEY = '5ef212dfa67e7d4937c0cda7fd1362f6';

    async function fetchMovies(genreId = null, query = '', pageNumber = 1) {
        let url = `https://api.themoviedb.org/3/discover/movie?language=en-US&page=${pageNumber}&api_key=${API_KEY}`;
        if (genreId) url += `&with_genres=${genreId}`;
        if (query) url = `https://api.themoviedb.org/3/search/movie?language=en-US&page=${pageNumber}&api_key=${API_KEY}&query=${query}`;
        
        try {
            const response = await fetch(url);
            const data = await response.json();
            setMovies(pageNumber === 1 ? data.results : [...movies, ...data.results]);
            setTotalPages(data.total_pages);
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
        setPage(1);
        fetchMovies(null, searchQuery, 1);
    };

    const loadMoreMovies = () => {
        if (page < totalPages) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchMovies(selectedGenre, searchQuery, nextPage);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search Movies"
                placeholderTextColor="#888"
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
            />
            <FlatList
                horizontal
                data={genres}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.genreList}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.genreButton,
                            selectedGenre === item.id && styles.selectedGenre,
                        ]}
                        onPress={() => {
                            setSelectedGenre(item.id);
                            setPage(1);
                            fetchMovies(item.id, '', 1);
                        }}
                    >
                        <Text style={styles.genreText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
            />
            <FlatList
                data={movies}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                contentContainerStyle={styles.movieGrid}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.movieCard}
                        onPress={() => navigation.navigate('MovieDetails', { movie: item })}
                    >
                        <Image
                            style={styles.poster}
                            source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                            resizeMode="cover"
                        />
                        <Text style={styles.movieTitle} numberOfLines={1}>
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                )}
                onEndReached={loadMoreMovies}
                onEndReachedThreshold={0.5}
            />
        </View>
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
        fontSize: 16,
    },
    genreList: {
        paddingHorizontal: 10,
        paddingBottom: 10,
    },
    genreButton: {
        
        height:38,
        padding: 10,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: '#292b44',
    },
    selectedGenre: {
        backgroundColor: '#ff6f61',
    },
    genreText: {
        color: '#fff',
    },
    movieGrid: {
        justifyContent: 'center',
        paddingBottom: 20,
    },
    movieCard: {
        width: (width / 2) - 20,
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
        height: 200,
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
