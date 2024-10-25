import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileBase from './ProfileBase';
import EdicaoProfile from './EdicaoProfile';

const Stack = createNativeStackNavigator();

export default function Profile() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileBase"
                component={ProfileBase}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="EdicaoProfile"
                component={EdicaoProfile}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
