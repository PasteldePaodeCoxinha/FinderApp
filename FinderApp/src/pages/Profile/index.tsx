import React, { useCallback, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileBase from './ProfileBase';
import EdicaoProfile from './EdicaoProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import Usuario from '../../interface/Usuario';

const Stack = createNativeStackNavigator();

export default function Profile() {
    const [usuario, setUsuario] = useState<Usuario>();

    const getUsuario = useCallback(async () => {
        let idUsuario = await AsyncStorage.getItem('idUsuario');
        if (idUsuario === null) {
            idUsuario = '47';
        }
        const response = await fetch(`https://finder-app-back.vercel.app/usuario/getUmUsuario?id=${idUsuario}`);
        const data = await response.json();
        if (response.status === 200) {
            setUsuario(data.Usuario as Usuario);
        } else {
            Alert.alert('Erro: ', data.msg);
        }
    }, []);

    useEffect(() => {
        getUsuario();
    }, [getUsuario]);

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileBase"
                options={{ headerShown: false }}
            >
                {(props) => <ProfileBase {...props} usuario={usuario ? usuario : { datanascimento: '', descricao: '', email: '', escolaridade: '', id: 0, imgperfil: '', nome: '', profissao: '', senha: '' }} />}
            </Stack.Screen>

            <Stack.Screen
                name="EdicaoProfile"
                options={{ headerShown: false }}
            >
                {(props) => <EdicaoProfile {...props} usuario={usuario ? usuario : { datanascimento: '', descricao: '', email: '', escolaridade: '', id: 0, imgperfil: '', nome: '', profissao: '', senha: '' }}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
}
