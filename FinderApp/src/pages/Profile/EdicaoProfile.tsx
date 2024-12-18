import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView, Image } from 'react-native';
import Nav from '../../components/Nav';
import useTheme from '../../hooks/UseTheme';
import CustomTextInput from '../../components/inputs/CustomTextInput';
import CustomDateInput from '../../components/inputs/CustomDateInput';
import CustomLocationInput from '../../components/inputs/CustomLocationInput';
import CustomTextBoxInput from '../../components/inputs/CustomTextBoxInput';
import CustomOptionsInput from '../../components/inputs/CustomOptionsInput';
import Usuario from '../../interface/Usuario';

interface Props {
    navigation: any;
    usuario: Usuario
}

export default function EdicaoProfile({ navigation, usuario }: Props) {
    const [nome, setNome] = useState<string>(usuario.nome);
    const [dataNasc, setDataNasc] = useState<Date>(new Date(usuario.datanascimento));
    const [profissao, setProfissao] = useState<string>(usuario.profissao);
    const [escolaridade, setEscolaridade] = useState<string>(usuario.escolaridade);
    const [desc, setDesc] = useState<string>(usuario.descricao);
    const [gostos, setGostos] = useState<Array<{ id: number; nome: string; }>>([]);
    const [interesses, setInteresses] = useState<Array<{ id: number; nome: string; }>>([]);
    const [gostosSelecionados, setGostosSelecionados] = useState<Array<{ id: number, nome: string }>>([]);
    const [interessesSelecionados, setInteressesSelecionados] = useState<Array<{ nome: string, id: number }>>([]);
    const [gostosAntigos, setGostosAntigos] = useState<Array<number>>([]);
    const [interessesAntigos, setInteressesAntigos] = useState<Array<number>>([]);
    const [showGostos, setShowGostos] = useState<boolean>(false);
    const [showInteresses, setShowInteresses] = useState<boolean>(false);
    const { theme } = useTheme();

    const getGostos = useCallback(async () => {
        try {
            const response = await fetch('https://finder-app-back.vercel.app/gosto/lista');

            const data = await response.json();
            if (response.ok) {
                setGostos(data.gostos);

                const response2 = await fetch(`https://finder-app-back.vercel.app/usuario/getGostosUsuario?usuarioId=${usuario.id}`);
                const data2 = await response2.json();

                if (response2.ok) {
                    setGostosSelecionados(data2.Gostos);
                } else {
                    Alert.alert('Erro ao pegar gostos do usuário: ', data.msg);
                }
            } else {
                Alert.alert('Falha buscando gostos:', data.msg);
            }
        } catch (error) {
            console.log(error);
            Alert.alert((error as Error).message);
        }
    }, [usuario.id]);

    const getInteresses = useCallback(async () => {
        try {
            const response = await fetch('https://finder-app-back.vercel.app/interesse/lista');

            const data = await response.json();
            if (response.ok) {
                setInteresses(data.interesses);

                const response2 = await fetch(`https://finder-app-back.vercel.app/usuario/getInteressesUsuario?usuarioId=${usuario.id}`);
                const data2 = await response2.json();

                if (response2.ok) {
                    setInteressesSelecionados(data2.Interesses);
                } else {
                    Alert.alert('Erro ao pegar interesses do usuário: ', data.msg);
                }
            } else {
                Alert.alert('Falha buscando interesses:', data.msg);
            }
        } catch (error) {
            console.log(error);
            Alert.alert((error as Error).message);
        }
    }, [usuario.id]);

    const setGostosInteressesAntigos = useCallback(() => {
        setGostosAntigos(gostosSelecionados.map(g => g.id));
        setInteressesAntigos(interessesSelecionados.map(i => i.id));
    }, [gostosSelecionados, interessesSelecionados]);

    useEffect(() => {
        getGostos();
        getInteresses();
        // setGostosInteressesAntigos();
    }, [getGostos, getInteresses]);

    const editarInfoUsuario = async () => {
        try {
            const response = await fetch('https://finder-app-back.vercel.app/usuario/editar', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'id': usuario.id,
                    'nome': nome,
                    'datanascimento': dataNasc.toISOString(),
                    'profissao': profissao,
                    'escolaridade': escolaridade,
                    'descricao': desc,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                console.log('Usuário editado');
            } else {
                Alert.alert('Falha ao editar usuário:', data.msg);
            }
        } catch (error) {
            console.log(error);
            Alert.alert((error as Error).message);
        }
    };

    const editarGostosInteresses = async () => {
        try {
            const response = await fetch('https://finder-app-back.vercel.app/usuario/editarInteGos', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    'usuario': usuario.id,
                    'gostosAntigos': gostosAntigos,
                    'gostos': gostosSelecionados.map(g => g.nome),
                    'interesesAntigos': interessesAntigos,
                    'interesses': interessesSelecionados.map(i => i.nome),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Gostos e Interesses editados');
            } else {
                Alert.alert('Falha ao editar gostos e interesses: ', data.msg);
            }
        } catch (error) {
            console.log(error);
            Alert.alert((error as Error).message);
        }
    };

    const enviarReqEditarUsuario = () => {
        try {
            editarInfoUsuario();
            editarGostosInteresses();
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
            width: '47%',
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
        },
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
                        <CustomTextBoxInput setText={setDesc} placeholder="Descrição" text={desc} />
                    </View>
                </View>

                <View style={styles.inputGostosInteresses}>
                    {((gostos.length > 0) && showGostos) ? (
                        <CustomOptionsInput
                            options={gostos}
                            horizontal={true}
                            style={styles.inputOptions}
                            setOptions={setGostosSelecionados}
                            titulo="Quais são seus gostos?"
                            minSelected={5}
                            selected={gostosSelecionados.map(g => g.nome)}
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
                            horizontal={true}
                            setOptions={setInteressesSelecionados}
                            titulo="Quais são seus interesses?"
                            minSelected={3}
                            selected={interessesSelecionados.map(i => i.nome)}
                        />
                    ) : (
                        <TouchableOpacity style={styles.touchBotaoShowInteGos} onPress={() => { setShowInteresses(true); }}>
                            <Image
                                style={styles.botoesShowInteGos}
                                source={require('../../../assets/images/perfil/lapisedicao.png')}
                            />
                            <Text style={styles.textoShowInteGos}>Interesses</Text>
                        </TouchableOpacity>
                    )}
                </View>

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
