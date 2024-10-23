import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTheme from '../../hooks/UseTheme';
import CustomTextInput from '../../components/inputs/CustomTextInput';

interface Props {
    navigation: any;
}

export default function Login({ navigation }: Props) {
    const { theme } = useTheme();
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();

    const styles = StyleSheet.create({
        pagina: {
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            paddingBottom: 75,
            backgroundColor: theme.colors.background,
        },
        titulo: {
            margin: 'auto',
            fontSize: 32,
            color: theme.colors.text,
        },
        appNameText: {
            color: theme.colors.primary,
        },
        buttons: {
            display: 'flex',
            gap: 20,
            margin: 'auto',
        },
        btnEntrar: {
            backgroundColor: theme.colors.primary,
            margin: 'auto',
            paddingHorizontal: 25,
            paddingVertical: 5,
            textAlign: 'center',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 35,
        },
        btnTexto: {
            color: theme.colors.text,
            fontSize: 24,
        },
        inputContainer: {
            display: 'flex',
            marginHorizontal: 50,
        },
    });

    async function login() {
        const response = await fetch(`https://finder-app-back.vercel.app/usuario/login?email=${email}&senha=${senha}`);

        const data = await response.json();
        if (response.ok) {
            try {
                await AsyncStorage.setItem('idUsuario', data.idUsuario.toString());
                navigation.navigate('List');
            } catch (error) {
                Alert.alert('Falha ao fazer login', error as any);
            }
        } else {
            Alert.alert('Falha ao fazer login:', data.msg);
        }
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Bem-vindo ao <Text style={styles.appNameText}>Finder</Text></Text>

            <View style={styles.inputContainer}>
                <CustomTextInput
                    setText={setEmail}
                    placeholder="E-mail"
                />
                <CustomTextInput
                    setText={setSenha}
                    placeholder="Senha"
                    secure={true}
                />
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.btnEntrar}
                    onPress={login}
                >
                    <Text style={styles.btnTexto}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
