import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import Cadastro from './Cadastro';
import Introducao from './Introducao';

const Stack = createNativeStackNavigator();

export default function Landing() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Introducao"
                component={Introducao}
                options={{ headerShown: false }}
            />
            < Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
            />
            < Stack.Screen
                name="Cadastro"
                component={Cadastro}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
