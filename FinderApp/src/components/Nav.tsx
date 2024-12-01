import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import NavButton from './inputs/NavButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    navigation: any;
    style?: any;
}

export default function Nav({ navigation, style }: Props) {
    const styles = StyleSheet.create({
        nav: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: 'white',
            paddingVertical: 5,
            paddingHorizontal: 25,
        },
    });
    const [temMensagem, setTemMensagem] = useState<boolean>(false);
    const [temMatch, setTemMatch] = useState<boolean>(false);

    useEffect(() => {
        async function listaMatch() {
            const proprioId = await AsyncStorage.getItem("idUsuario");
            if (!proprioId) return;

            const response = await fetch(`https://finder-app-back.vercel.app/curtir/listaMatch?usuarioId=${proprioId}`);

            const data = await response.json();
            if (response.ok) {
                return data.matches;
            }
            return [];
        }
        async function checaNovoMatch(proprioId: string, matchId: number) {
            const response = await fetch(`https://finder-app-back.vercel.app/chat/pegarUmChat?usuarioId1=${proprioId}&usuarioId2=${matchId}`);

            // console.log("checaNovoMatch", response.status, await response.json());
            if (response.ok)
                return false;
            return true;
        }
        async function checaMatch() {
            try {
                const proprioId = await AsyncStorage.getItem("idUsuario");
                if (!proprioId) return;

                const matches = await listaMatch();
                for (let i = 0; i < matches.length; i++) {
                    const novoMatch = await checaNovoMatch(proprioId, matches[i].id);
                    if (novoMatch) {
                        setTemMatch(true);
                        return;
                    }
                }
                setTemMatch(false);
            }
            catch (err) {
                console.log("Erro ao checar novos matches: ", err);
            }
        }

        async function checaNotificacoes() {
            try {
                const proprioId = await AsyncStorage.getItem("idUsuario");
                if (!proprioId) return;

                const userChat = await AsyncStorage.getItem("userChat");
                if (!userChat) return;

                const response = await fetch(`https://finder-app-back.vercel.app/mensagem/novaMsg?chatId=${JSON.parse(userChat).id}&usuarioId=${proprioId}`);

                const data = await response.json();
                // console.log("checaNotificacoes", response.status, data)
                if (response.ok) {
                    setTemMensagem(data.mensagens.filter((m: any) => !m.visualizado).length);
                }
            }
            catch (err) {
                console.log("Erro ao checar novas mensagens: ", err);
            }
        }

        setTimeout(checaMatch, 1000);
        setTimeout(checaNotificacoes, 1000);
    }, []);

    return (
        <View
            style={[styles.nav, style]}
        >
            <NavButton
                image={require("../../assets/images/nav/matches.png")}
                destacar={temMatch}
                callback={() => navigation.navigate("Matches")}
            ></NavButton>
            <NavButton
                image={require('../../assets/images/nav/list.png')}
                callback={() => navigation.navigate('List')}
            />
            <NavButton
                image={require("../../assets/images/nav/chat.png")}
                destacar={temMensagem}
                callback={() => navigation.navigate("Chat")}
            ></NavButton>
            <NavButton
                image={require('../../assets/images/nav/profile.png')}
                callback={() => navigation.navigate('Profile')}
            />
        </View>
    );
}
