import { StyleSheet, View, Text, PanResponder } from 'react-native';
import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import useTheme from "../hooks/UseTheme";
import ListSwipableImage from "../components/ListSwipableImage";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    navigation: any;
};

interface Usuario {
    id: number;
    nome: string;
    email: string;
    senha: string;
    datanascimento: string;
    profissao: string;
    escolaridade: string;
    descricao: string;
    imgperfil: string;
};

export default function List({ navigation }: Props) {
    const { theme } = useTheme();
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);
    const [indexUsuarioAtual, setIndexUsuarioAtual] = useState<number>(0);

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            backgroundColor: theme.colors.background
        },
        lista: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    useEffect(() => {
        async function getUsuarios() {
            const response = await fetch("https://finder-app-back.vercel.app/usuario/lista");

            const data = await response.json();
            if (response.status == 200) {
                const proprioId = await AsyncStorage.getItem("idUsuario");
                if (proprioId) {
                    setUsuarios(data.usuarios.filter((u: any) => u.id != parseInt(proprioId)));
                } else setUsuarios(data.usuarios);
            } else {
                console.log("Falha buscando usuarios:", data);
            }
        }

        getUsuarios();
    }, []);

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: (evt, gestureState) => {
            return Math.abs(gestureState.dx) > 20;
        },
        onPanResponderEnd: (evt, gestureState) => {
            if (gestureState.dx > 50) {
                proximoUsuario();
                console.log('Swiped Right');
            } else if (gestureState.dx < -50) {
                proximoUsuario();
                console.log('Swiped Left');
            }
        },
    });

    function proximoUsuario() {
        console.log("proximoUsuario usuarios.length", usuarios.length);
        if (usuarios.length > 1) {
            const proximoIndex = (indexUsuarioAtual + 1) % usuarios.length;
            setIndexUsuarioAtual(proximoIndex);
        } else setIndexUsuarioAtual(0);
    }

    function calcularIdade(): number {
        const dataNascimento = new Date(usuarios[indexUsuarioAtual].datanascimento);
        const hoje = new Date();

        const idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const diffMeses = hoje.getMonth() - dataNascimento.getMonth();

        if (diffMeses < 0 || (diffMeses === 0 && hoje.getDate() < dataNascimento.getDate())) {
            return idade - 1;
        }
        return idade;
    }

    function calcularDistancia(): number {
        return 0;
    }

    function img() {
        if (usuarios.length) {
            const { imgperfil, nome, descricao } = usuarios[indexUsuarioAtual];
            return (
                <View {...panResponder.panHandlers}>
                    <ListSwipableImage
                        imageSource={`data:image/jpg;base64,${imgperfil}`}
                        desc={`${nome}, ${calcularIdade()}, ${calcularDistancia()}`}
                        bio={descricao}
                    />
                </View>
            );
        }
        return <Text>Não há usuários</Text>
    }

    return (
        <View style={styles.pagina}>
            <View style={styles.lista}>
                {img()}
            </View>

            <Nav
                navigation={navigation}
            ></Nav>
        </View>
    )
}