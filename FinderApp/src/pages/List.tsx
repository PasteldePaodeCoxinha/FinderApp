import { StyleSheet, View, Text, Alert, ImageBackground } from 'react-native';
import { useEffect, useState } from "react";
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

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            width: "100%",
            backgroundColor: theme.colors.background,
            paddingTop: 50,
        },
        lista: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        backgroundImage: {
            zIndex: -1,
            width: 350,
            height: 700,
            position: "absolute",
            top: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingVertical: 50,
            gap: 10,
            borderRadius: 15,
        },
        desc: {
            // color: theme.colors.text,
        },
        descText: {
            fontSize: 28,
            textAlign: "center",
            color: theme.colors.text,
            textShadowColor: "white",
            textShadowOffset: {
                width: 0,
                height: 0
            },
            textShadowRadius: 5,
        },
        bio: {
            backgroundColor: theme.colors.border,
            maxWidth: "90%",
            borderRadius: 15,
            padding: 10
        },
        bioText: {
            fontSize: 24,
            color: theme.colors.text,
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
                Alert.alert("Falha buscando usuarios:", data.msg);
            }
        }

        getUsuarios();
    }, []);

    function proximoUsuario(direction: "left" | "right") {
        switch (direction) {
            case "left":
                Alert.alert("Passou");
                break;
            case "right":
                Alert.alert("Curtiu");
                break;
        }

        setUsuarios(usuarios.filter((_, i) => i != 0));
    }

    function calcularIdade(usuario: Usuario): number {
        const dataNascimento = new Date(usuario.datanascimento);
        const hoje = new Date();

        const idade = hoje.getFullYear() - dataNascimento.getFullYear();
        const diffMeses = hoje.getMonth() - dataNascimento.getMonth();

        if (diffMeses < 0 || (diffMeses === 0 && hoje.getDate() < dataNascimento.getDate())) {
            return idade - 1;
        }
        return idade;
    }

    function calcularDistancia(usuario: Usuario): number {
        return 0;
    }

    function imgBehind() {
        if (usuarios.length > 1) {
            const { imgperfil, nome, descricao } = usuarios[1];
            return (
                <ImageBackground
                    style={styles.backgroundImage}
                    source={{ uri: `data:image/jpg;base64,${imgperfil}` }}
                >
                    <View style={styles.desc}>
                        <Text style={styles.descText}>{`${nome}, ${calcularIdade(usuarios[1])}, ${calcularDistancia(usuarios[1])}`}</Text>
                        <View style={styles.bio}>
                            <Text style={styles.bioText}>{descricao}</Text>
                        </View>
                    </View>
                </ImageBackground>

            );
        }
        return <Text>Não há usuários</Text>
    }

    function img() {
        if (usuarios.length) {
            const { imgperfil, nome, descricao } = usuarios[0];
            return (
                <ListSwipableImage
                    onSwipe={proximoUsuario}
                    imageSource={`data:image/jpg;base64,${imgperfil}`}
                    desc={`${nome}, ${calcularIdade(usuarios[0])}, ${calcularDistancia(usuarios[0])}`}
                    bio={descricao}
                />
            );
        }
        return <Text>Não há usuários</Text>
    }

    return (
        <View style={styles.pagina}>
            <View style={styles.lista}>
                {imgBehind()}
                {img()}
            </View>

            <Nav
                navigation={navigation}
            ></Nav>
        </View>
    )
}