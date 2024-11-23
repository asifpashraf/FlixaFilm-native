import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native';
import React, { useEffect, useState } from 'react';

const MovieDetails = ({ route }) => {
    const { movie } = route.params;
    const [castAndCrew, setCastAndCrew] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState('');

    const API_KEY = '5ef212dfa67e7d4937c0cda7fd1362f6';

    async function fetchAdditionalDetails() {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}/credits?api_key=${API_KEY}&language=en-US`;
        const trailerUrl = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`;

        try {
            const [creditsResponse, trailerResponse] = await Promise.all([
                fetch(url),
                fetch(trailerUrl)
            ]);

            const creditsData = await creditsResponse.json();
            setCastAndCrew(creditsData.cast.slice(0, 10)); // Fetch top 10 cast members

            const trailerData = await trailerResponse.json();
            const youtubeTrailer = trailerData.results.find(video => video.site === 'YouTube' && video.type === 'Trailer');
            setTrailerUrl(youtubeTrailer ? `https://www.youtube.com/watch?v=${youtubeTrailer.key}` : '');
        } catch (error) {
            console.error('Error fetching additional details:', error);
        }
    }

    useEffect(() => {
        fetchAdditionalDetails();
    }, []);

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
                
                {trailerUrl ? (
                    <TouchableOpacity 
                        style={styles.trailerButton} 
                        onPress={() => Linking.openURL(trailerUrl)}
                    >
                        <Text style={styles.trailerButtonText}>Watch Trailer</Text>
                    </TouchableOpacity>
                ) : (
                    <Text style={styles.noTrailer}>Trailer not available</Text>
                )}
            </View>
            <Text>sample text</Text>

            <Text style={styles.sectionTitle}>Cast & Crew</Text>
            <ScrollView horizontal style={styles.castContainer}>
                {castAndCrew.map((person) => (
                    <View key={person.id} style={styles.castCard}>
                        <Image 
                            style={styles.castImage} 
                            source={{ uri: person.profile_path 
                                ? `https://image.tmdb.org/t/p/w500${person.profile_path}` 
                                : 'https://via.placeholder.com/150x220?text=No+Image' 
                            }} 
                            resizeMode="cover" 
                        />
                        <Text style={styles.castName}>{person.name}</Text>
                    </View>
                ))}
            </ScrollView>
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
    trailerButton: {
        marginTop: 15,
        backgroundColor: '#ff6f61',
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
    },
    trailerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    noTrailer: {
        color: '#dcdcdc',
        fontSize: 14,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f2f2f2',
        marginHorizontal: 20,
        marginTop: 20,
    },
    castContainer: {
        marginTop: 10,
        marginHorizontal: 10,
    },
    castCard: {
        marginRight: 10,
        alignItems: 'center',
        width: 100,
    },
    castImage: {
        width: 80,
        height: 120,
        borderRadius: 8,
    },
    castName: {
        marginTop: 5,
        fontSize: 12,
        color: '#f2f2f2',
        textAlign: 'center',
    },
});
