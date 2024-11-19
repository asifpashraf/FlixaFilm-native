import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Discover from './component/discover';
import MovieDetails from './component/MovieDetails';

const Stack = createStackNavigator();

export default function App() {
    return (
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
    );
}
