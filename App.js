import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Discover from './component/discover';
import MovieDetails from './component/MovieDetails';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Discover">
                    <Stack.Screen 
                        name="Discover" 
                        component={Discover} 
                        options={{ headerShown: false }} 
                    />
                    <Stack.Screen 
                        name="MovieDetails" 
                        component={MovieDetails} 
                        options={{ title: 'Movie Details' }} 
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});
