import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '../../hooks/UseTheme';
import Usuario from '../../interface/Usuario';

interface Props {
    navigation: any
    usuario: Usuario;
}

export default function Configuracao({ navigation, usuario }: Props) {
    const [visualizarOpcao, setVisualizacaoOpcao] = useState<boolean>(usuario.visualizar);
    const { theme } = useTheme();

    const salvarConfiguracoes = async () => {
        try {
            const response = await fetch('https://finder-app-back.vercel.app/usuario/editar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': usuario.id,
                    'visualizar': visualizarOpcao,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Configurações editadas');
                Alert.alert('Configurações editadas');
                navigation.navigate('ProfileBase');
            } else {
                Alert.alert('Falha ao editar usuário:', data.msg);
            }
        } catch (error) {
            console.log(error);
            Alert.alert((error as Error).message);
        }
    };

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
        titulo: {
            fontSize: 24,
            marginTop: '17%',
            marginBottom: '8%',
        },
        botaoSalvarConfiguracao: {
            backgroundColor: theme.colors.primary,
            paddingHorizontal: 25,
            paddingVertical: 5,
            textAlign: 'center',
            borderTopLeftRadius: 35,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 35,
        },
        botaoSalvarConfiguracaoTexto: {
            color: theme.colors.text,
            fontSize: 24,
        },
        containerOpcoesConfiguracoes: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderWidth: 1,
            borderRadius: 20,
            borderColor: '#999999',
            gap: 14,
            paddingLeft: 79,
            paddingRight: 79,
            paddingBottom: 21,
        },
        opcaoConfiguracao: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 19,
            borderWidth: 1,
            borderRadius: 14,
            borderColor: '#999999',
            padding: 7,
        },
        fontePadrao: {
            fontSize: 19,
        },
        botaoCheckOpcao: {
            borderWidth: 1,
            borderRadius: 8,
            padding: 12,
        },
        imagemVerificado: {
            width: 12,
            height: 12,
        },
    });
    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Configurações Gerais</Text>

            <View style={styles.containerOpcoesConfiguracoes}>
                <Text style={styles.fontePadrao}>Visibilidade</Text>

                <View style={styles.opcaoConfiguracao}>
                    <Image
                        source={require('../../../assets/images/perfil/olho.png')}
                    />
                    <Text style={styles.fontePadrao}>
                        Invisível
                    </Text>
                    <TouchableOpacity style={styles.botaoCheckOpcao} onPress={() => setVisualizacaoOpcao(!visualizarOpcao)}>
                        {visualizarOpcao ? (
                            <Image
                                style={styles.imagemVerificado}
                                source={require('../../../assets/images/perfil/verificado.png')}
                            />
                        ) : (
                            <></>
                        )
                        }
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.botaoSalvarConfiguracao} onPress={salvarConfiguracoes}>
                <Text style={styles.botaoSalvarConfiguracaoTexto}>Salvar</Text>
            </TouchableOpacity>
        </View>
    );
}
