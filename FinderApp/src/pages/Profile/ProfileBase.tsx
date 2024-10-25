import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Nav from '../../components/Nav';
import useTheme from '../../hooks/UseTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomImageInput from '../../components/inputs/CustomImageInput';

interface Props {
    navigation: any;
}

export default function ProfileBase({ navigation }: Props) {
    const [usuarioId, setUsuarioId] = useState<number>(0);
    const [nome, setNome] = useState<string>('');
    const [idade, setIdade] = useState<number>(0);
    const [img, setImg] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const { theme } = useTheme();

    const getUsuario = async () => {
        let idUsuario = await AsyncStorage.getItem('idUsuario');
        if (idUsuario === null) {
            idUsuario = '45';
        }
        const response = await fetch(`https://finder-app-back.vercel.app/usuario/getUmUsuario?id=${idUsuario}`);
        const data = await response.json();
        if (response.status === 200) {
            const usuario = data.Usuario;

            setUsuarioId(usuario.id);
            setNome(usuario.nome);

            let timeDiff = Math.abs(Date.now() - (new Date(usuario.datanascimento)).getTime());
            let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
            setIdade(age);

            setDesc(usuario.descricao);
            setImg(usuario.imgperfil);
        } else {
            Alert.alert('Erro: ', data.msg);
        }
    };

    useEffect(() => {
        getUsuario();
    }, []);

    useEffect(() => {
        const mudarImgPerfil = async () => {
            try {
                const response = await fetch('https://finder-app-back.vercel.app/usuario/editar', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        'id': usuarioId,
                        'imgperfil': img,
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    console.log('Imagem de perfil alterada');
                } else {
                    Alert.alert('Falha ao cadastrar:', data.msg);
                }
            } catch (error) {
                console.log('Erro: ', error);
            }
        };

        mudarImgPerfil();
    }, [img, usuarioId]);

    const styles = StyleSheet.create({
        pagina: {
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            flexDirection: 'column',
        },
        informacoesBasi: {
            alignItems: 'center',
            marginTop: '21%',
            borderRadius: 15,
        },
        containerBotoesAcoes: {
            flexDirection: 'column',
            justifyContent: 'flex-start',
        },
        pfp: {
            borderColor: '#F05050',
            borderWidth: 3,
            borderRadius: 15,
            height: 221,
            width: 191,
        },
        botoesAcoes: {
            width: 37,
            height: 37,
        },
        touchBotaoAcoes: {
            borderColor: '#DDD9D9',
            padding: 3,
            borderWidth: 3,
            borderRadius: 100,
        },
        textoInfo: {
            fontSize: 24,
            color: '#1E1E1E',
        },
        containerDesc: {
            padding: '4%',
            borderColor: '#555050',
            borderRadius: 10,
            borderWidth: 1,
            height: '40%',
        },
        desc: {
            fontSize: 29,
            color: '#1E1E1E',
        },
    });
    return (
        <View style={styles.pagina}>
            <View style={styles.informacoesBasi}>
                <CustomImageInput setImage={setImg} defaultImage={img} />
                <Text style={styles.textoInfo}>{nome}, {idade}</Text>
            </View>

            <View style={styles.containerBotoesAcoes}>
                <TouchableOpacity style={styles.touchBotaoAcoes} onPress={() => { }}>
                    <Image
                        style={styles.botoesAcoes}
                        source={require('../../../assets/images/perfil/lapisedicao.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerDesc}>
                <Text style={styles.desc}>
                    {desc}
                </Text>
            </View>

            <Nav
                navigation={navigation}
            />
        </View>
    );
}
