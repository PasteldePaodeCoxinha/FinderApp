import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import Nav from '../../components/Nav';
import useTheme from '../../hooks/UseTheme';
import CustomImageInput from '../../components/inputs/CustomImageInput';
import Usuario from '../../interface/Usuario';

interface Props {
    navigation: any;
    usuario: Usuario
}

export default function ProfileBase({ navigation, usuario }: Props) {
    const [idade, setIdade] = useState<number>(0);
    const [img, setImg] = useState<string>('');
    const { theme } = useTheme();

    useEffect(() => {
        let timeDiff = Math.abs(Date.now() - (new Date(usuario.datanascimento)).getTime());
        let age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365.25);
        setIdade(age);
    }, [usuario.datanascimento]);

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
                        'id': usuario.id,
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
    }, [img, usuario.id]);

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
            minWidth: '90%',
        },
        desc: {
            fontSize: 29,
            color: '#1E1E1E',
        },
    });
    return (
        <View style={styles.pagina}>
            <View style={styles.informacoesBasi}>
                <CustomImageInput setImage={setImg} defaultImage={usuario.imgperfil} />
                <Text style={styles.textoInfo}>{usuario.nome}, {idade}</Text>
            </View>

            <View style={styles.containerBotoesAcoes}>
                <TouchableOpacity style={styles.touchBotaoAcoes} onPress={() => { navigation.navigate('EdicaoProfile'); }}>
                    <Image
                        style={styles.botoesAcoes}
                        source={require('../../../assets/images/perfil/lapisedicao.png')}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.containerDesc}>
                <Text style={styles.desc}>
                    {usuario.descricao}
                </Text>
            </View>

            <Nav
                navigation={navigation}
            />
        </View>
    );
}
