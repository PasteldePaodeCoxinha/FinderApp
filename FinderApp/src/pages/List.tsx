import { StyleSheet, View, Text, PanResponder } from 'react-native';
import { useEffect, useRef, useState } from "react";
import Nav from "../components/Nav";
import useTheme from "../hooks/UseTheme";
import ListSwipableImage from "../components/ListSwipableImage";

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

    const panResponder = useRef(
        PanResponder.create({
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
        })
    ).current;

    function proximoUsuario() {
        const proximoIndex = (indexUsuarioAtual + 1) % usuarios.length;
        setIndexUsuarioAtual(proximoIndex);
    }

    useEffect(() => {
        async function getUsuarios() {
            const response = await fetch("https://finder-app-back.vercel.app/usuario/lista");

            const data = await response.json();
            if (response.status == 200) {
                // filtrar aqui para não aparecer o usuário logado
                setUsuarios(data.usuarios);
            } else {
                console.log("Falha buscando usuarios:", data);
            }
        }

        getUsuarios();
    }, []);

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

    return (
        <View style={styles.pagina}>
            <View style={styles.lista}>
                {usuarios.length > 0 && (
                    <View {...panResponder.panHandlers}>
                        <ListSwipableImage
                            imageSource={
                                (usuarios[indexUsuarioAtual].imgperfil ?
                                    `data:image/png;base64,${usuarios[indexUsuarioAtual].imgperfil}` :
                                    require("../../assets/images/nav/profile.png"))
                            }
                            desc={`${usuarios[indexUsuarioAtual].nome}, ${calcularIdade()}, ${calcularDistancia()}`}
                            bio={usuarios[indexUsuarioAtual].descricao}
                        />
                    </View>
                )}
            </View>

            <Nav
                navigation={navigation}
            ></Nav>
        </View>
    )
}