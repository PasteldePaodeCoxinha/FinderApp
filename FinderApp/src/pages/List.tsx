import { StyleSheet, View, Text, Alert, ImageBackground } from 'react-native';
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import useTheme from "../hooks/UseTheme";
import ListSwipableImage from "../components/ListSwipableImage";
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
    navigation: any;
};

interface Localizacao {
    id: number;
    numero_casa: number;
    rua: string;
    bairro: string;
    cidade: string;
    estado: string;
    regiao: string;
    cep: string;
    longi: number;
    lati: number;
    usuario_id: number;
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
    localizacao: Localizacao;
};

export default function List({ navigation }: Props) {
    const { theme } = useTheme();
    const [enderecoLogado, setEnderecoLogado] = useState<Localizacao>({} as Localizacao);
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

    async function getEndereco(usuario: Usuario) {
        const response = await fetch(`https://finder-app-back.vercel.app/localizacao/lista?idUsuario=${usuario.id}`);

        const data = await response.json();
        if (response.ok) {
            return data.localizacao as Localizacao;
        } else {
            console.log("Falha buscando endereco do usuário:", data.msg);
            // Alert.alert("Falha buscando endereco do usuário:", data.msg);
        }
        return {} as Localizacao;
    }

    async function getUsuarios() {
        const response = await fetch("https://finder-app-back.vercel.app/usuario/lista");

        const data = await response.json();
        if (response.ok) {
            const proprioId = await AsyncStorage.getItem("idUsuario");

            const tmpUsuarios = data.usuarios;
            for (let i = 0; i < tmpUsuarios.length; i++) {
                tmpUsuarios[i].localizacao = await getEndereco(tmpUsuarios[i]);
            }

            if (proprioId) {
                setUsuarios(
                    tmpUsuarios.filter((u: any) => u.id != parseInt(proprioId))
                );
            } else setUsuarios(data.usuarios);
        } else {
            Alert.alert("Falha buscando usuarios:", data.msg);
        }
    }

    useEffect(() => {
        async function getProprioEndereco() {
            const proprioId = await AsyncStorage.getItem("idUsuario");
            if (!proprioId) return {} as Localizacao;

            const endereco = await getEndereco({ id: parseInt(proprioId) } as Usuario);
            setEnderecoLogado(endereco);
        }

        getUsuarios();
        getProprioEndereco();
    }, []);

    async function checaMatch(usuario: Usuario) {
        const idUsuarioAtual = await AsyncStorage.getItem("idUsuario");
        const response = await fetch(`https://finder-app-back.vercel.app/curtir/match?curtiu=${usuario.id}&curtido=${idUsuarioAtual}`);

        if (response.status == 200)
            return true;

        return false;
    }

    async function proximoUsuario(direction: "left" | "right") {
        let sucesso: boolean = true;
        switch (direction) {
            case "left":
                // Alert.alert("Passou");
                break;
            case "right":
                // Alert.alert("Curtiu");

                const idUsuarioAtual = await AsyncStorage.getItem("idUsuario");
                const response = await fetch("https://finder-app-back.vercel.app/curtir/cadastro", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        "curtiu": idUsuarioAtual,
                        "curtido": usuarios[0].id
                    })
                });
                if (!response.ok) {
                    sucesso = false;
                }

                if (await checaMatch(usuarios[0])) {
                    Alert.alert("Match!");
                }
                break;
        }

        if (sucesso) setUsuarios(usuarios.slice(1));
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
        function deg2rad(deg: number) {
            return deg * (Math.PI / 180);
        }

        const lat1: number = enderecoLogado.lati;
        const long1: number = enderecoLogado.longi;
        const lat2: number = usuario.localizacao.lati;
        const long2: number = usuario.localizacao.longi;

        const R = 6371; // Raio da terra em Km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(long2 - long1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distancia em km
        return d;
    }

    function imgBehind() {
        if (usuarios.length > 1) {
            const { imgperfil, nome, descricao } = usuarios[1];
            return (
                <ImageBackground
                    style={styles.backgroundImage}
                    source={{ uri: imgperfil }}
                >
                    <View style={styles.desc}>
                        <Text style={styles.descText}>{`${nome}, ${calcularIdade(usuarios[1])}, ${calcularDistancia(usuarios[1]).toFixed(0)}Km`}</Text>
                        <View style={styles.bio}>
                            <Text style={styles.bioText}>{descricao}</Text>
                        </View>
                    </View>
                </ImageBackground>
            );
        }

        getUsuarios();
        if (usuarios.length > 1)
            return imgBehind();
        return <View></View>;
    }

    function img() {
        if (usuarios.length) {
            const { imgperfil, nome, descricao } = usuarios[0];
            return (
                <ListSwipableImage
                    onSwipe={proximoUsuario}
                    imageSource={imgperfil}
                    desc={`${nome}, ${calcularIdade(usuarios[0])}, ${calcularDistancia(usuarios[0]).toFixed(0)}Km`}
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