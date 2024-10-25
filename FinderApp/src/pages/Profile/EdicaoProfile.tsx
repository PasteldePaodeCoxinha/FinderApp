import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import Nav from '../../components/Nav';
import useTheme from '../../hooks/UseTheme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../../components/inputs/CustomTextInput';
import CustomDateInput from '../../components/inputs/CustomDateInput';
import CustomLocationInput from '../../components/inputs/CustomLocationInput';
import CustomTextBoxInput from '../../components/inputs/CustomTextBoxInput';
import CustomOptionsInput from '../../components/inputs/CustomOptionsInput';

interface Props {
    navigation: any;
}

export default function EdicaoProfile({ navigation }: Props) {
    const [usuarioId, setUsuarioId] = useState<string>('');
    const [nome, setNome] = useState<string>('');
    const [dataNasc, setDataNasc] = useState<Date>(new Date());
    const [profissao, setProfissao] = useState<string>('');
    const [escolaridade, setEscolaridade] = useState<string>('');
    const [desc, setDesc] = useState<string>('');
    const [gostos, setGostos] = useState<Array<{ id: number; nome: string; }>>([]);
    const [interesses, setInteresses] = useState<Array<{ id: number; nome: string; }>>([]);
    const [gostosSelecionados, setGostosSelecionados] = useState<Array<{ nome: string, id: number }>>([]);
    const [interessesSelecionados, setInteressesSelecionados] = useState<Array<{ nome: string, id: number }>>([]);
    const [showGostos, setShowGostos] = useState<boolean>(false);
    const [showInteresses, setShowInteresses] = useState<boolean>(false);
    const { theme } = useTheme();

    const getUsuario = async () => {
        let idUsuario = await AsyncStorage.getItem('idUsuario');
        if (idUsuario === null) {
            idUsuario = '45';
            setUsuarioId('45');
        } else {
            setUsuarioId(idUsuario);
        }

        const response = await fetch(`https://finder-app-back.vercel.app/usuario/getUmUsuario?id=${idUsuario}`);
        const data = await response.json();
        if (response.status === 200) {
            const usuario = data.Usuario;
            setNome(usuario.nome);
            setDataNasc(usuario.datanascimento);
            setProfissao(usuario.profissao);
            setEscolaridade(usuario.escolaridade);
            setDesc(usuario.descricao)
        } else {
            Alert.alert('Erro: ', data.msg);
        }
    };

    const getGostos = async () => {
        const response = await fetch('https://finder-app-back.vercel.app/gosto/lista');

        const data = await response.json();
        if (response.ok) {
            setGostos(data.gostos);
            setGostosSelecionados(data.gostos);
        } else {
            Alert.alert('Falha buscando gostos:', data.msg);
        }
    };

    const getInteresses = async () => {
        const response = await fetch('https://finder-app-back.vercel.app/interesse/lista');

        const data = await response.json();
        if (response.ok) {
            setInteresses(data.interesses);
            setInteressesSelecionados(data.interesses);
        } else {
            Alert.alert('Falha buscando interesses:', data.msg);
        }
    };

    useEffect(() => {
        getUsuario();
        getGostos();
        getInteresses();
    }, []);

    const editarInfoUsuario = async () => {
        await fetch('https://finder-app-back.vercel.app/usuario/editar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': usuarioId,
                'nome': nome,
                'dataNasc': dataNasc.toISOString,
                'profissao': profissao,
                'escolaridade': escolaridade,
                'descricao': desc,
            }),
        });
    };

    const enviarReqEditarUsuario = () => {
        try {
            editarInfoUsuario();
            navigation.navigate('ProfileBase');
        } catch (error) {
            Alert.alert('Erro: ', (error as Error).message);
        }
    };

    const styles = StyleSheet.create({
        pagina: {
            display: 'flex',
            gap: 20,
            justifyContent: 'space-between',
            width: '100%',
            minHeight: 'auto',
            backgroundColor: theme.colors.background,
            alignItems: 'center',
            flexDirection: 'column',
            flexWrap: 'wrap',
            paddingBottom: 80,
        },
        titulo: {
            fontSize: 24,
            marginTop: '17%',
            marginBottom: '8%',
        },
        nascLocal: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '74%',
        },
        inputText: {
            width: '80%',
        },
        inputDesc: {
            paddingHorizontal: 20,
            height: '40%',
        },
        botaoSalvar: {
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
        botaoSalvarTexto: {
            color: theme.colors.text,
            fontSize: 24,
        },
        viewInputs: {
            display: 'flex',
            flex: 1,
            gap: 10,
            alignItems: 'center',
        },
        inputGostosInteresses: {
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            maxWidth: '80%',
        },
        textoShowInteGos: {
            fontSize: 24,
        },
        botoesShowInteGos: {
            width: 37,
            height: 37,
        },
        touchBotaoShowInteGos: {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            borderColor: '#DDD9D9',
            padding: 3,
            borderWidth: 3,
            borderRadius: 100,
        },
        inputOptions: {
            // backgroundColor: 'red',
            // flex: 1,
        },
        containerPagina: {
            width: '100%',
            minHeight: '100%',
        },
        nav: {
            position: 'absolute',
            width: '100%',
            bottom: 0,
        }
    });

    return (
        <View style={styles.containerPagina}>
            <ScrollView contentContainerStyle={styles.pagina}>
                <Text style={styles.titulo}>Informação do Perfil</Text>

                <View style={styles.viewInputs}>
                    <View style={styles.inputText}>
                        <CustomTextInput setText={setNome} value={nome} placeholder="Nome..." />
                    </View>

                    <View style={styles.nascLocal}>
                        <CustomDateInput setDate={setDataNasc} />
                        <CustomLocationInput setLocation={() => { }} />
                    </View>

                    <View style={styles.inputText}>
                        <CustomTextInput setText={setProfissao} value={profissao} placeholder="Profissão..." />
                    </View>

                    <View style={styles.inputText}>
                        <CustomTextInput setText={setEscolaridade} value={escolaridade} placeholder="Escolaridade" />
                    </View>

                    <View style={styles.inputDesc}>
                        <CustomTextBoxInput setText={setDesc} placeholder={desc} />
                    </View>
                </View>

                {/* <View style={styles.inputGostosInteresses}> */}
                {/* {((gostos.length > 0) && showGostos) ? (
                        <CustomOptionsInput
                            options={gostos}
                            style={styles.inputOptions}
                            setOptions={setGostosSelecionados}
                            titulo="Quais são seus gostos?"
                            minSelected={5}
                        />
                    ) : (
                        <TouchableOpacity style={styles.touchBotaoShowInteGos} onPress={() => { setShowGostos(true); }}>
                            <Image
                                style={styles.botoesShowInteGos}
                                source={require('../../../assets/images/perfil/lapisedicao.png')}
                            />
                            <Text style={styles.textoShowInteGos}>Gostos</Text>
                        </TouchableOpacity>
                    )}

                    {((interesses.length > 0) && showInteresses) ? (
                        <CustomOptionsInput
                            options={interesses}
                            setOptions={setInteressesSelecionados}
                            titulo="Quais são seus interesses?"
                            minSelected={3}
                        />
                    ) : (
                        <TouchableOpacity style={styles.touchBotaoShowInteGos} onPress={() => { setShowInteresses(true); }}>
                            <Image
                                style={styles.botoesShowInteGos}
                                source={require('../../../assets/images/perfil/lapisedicao.png')}
                            />
                            <Text style={styles.textoShowInteGos}>Interesses</Text>
                        </TouchableOpacity>
                    )} */}
                {/* </View> */}

                <TouchableOpacity style={styles.botaoSalvar} onPress={enviarReqEditarUsuario}>
                    <Text style={styles.botaoSalvarTexto}>Salvar</Text>
                </TouchableOpacity>

            </ScrollView>
            <Nav
                navigation={navigation}
                style={styles.nav}
            />
        </View>
    );
}
