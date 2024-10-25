import { StyleSheet, View, Image, Alert, TouchableOpacity, Text } from 'react-native';
import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import useTheme from '../../hooks/UseTheme';
import Nav from '../../components/Nav';

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

export default function ListaChat({ navigation }: Props) {
    const { theme } = useTheme();
    const [usuarios, setUsuarios] = useState<Array<Usuario>>([]);

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            height: "100%",
            width: "100%",
            backgroundColor: theme.colors.background,
            paddingTop: 50,
        },
        titulo: {
            margin: "auto",
            fontSize: 32,
            color: theme.colors.text
        },
        lista: {
            paddingHorizontal: 25,
            paddingVertical: 10,
            gap: 5,
            minHeight: "80%",
        },
        imageContainer: {
            borderRadius: 50,
            borderColor: theme.colors.primary,
            borderWidth: 2,
            padding: 0,
        },
        image: {
            width: 45,
            height: 45,
            borderRadius: 100
        },
        btnMatch: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            borderColor: theme.colors.border,
            borderWidth: 3,
            borderRadius: 15,
            padding: 5
        },
        text: {
            color: theme.colors.text,
            fontSize: 18
        }
    });

    useEffect(() => {
        async function getUsuarios() {
            const proprioId = await AsyncStorage.getItem("idUsuario");
            if (!proprioId) return;

            const response = await fetch(`https://finder-app-back.vercel.app/curtir/listaMatch?usuarioId=${proprioId}`);

            const data = await response.json();
            if (response.ok) {
                setUsuarios(data.matches);
            } else {
                Alert.alert("Falha buscando matches:", data.msg);
            }
        }

        getUsuarios();
    }, []);

    async function abrirChat(match: Usuario) {
        await AsyncStorage.setItem("userChat", JSON.stringify(match));
        navigation.navigate("Chat");
    }

    function lista() {
        return usuarios.map((u, index) => (
            <TouchableOpacity
                style={styles.btnMatch}
                onPress={() => abrirChat(u)}
                key={index}
            >
                <View style={styles.imageContainer}>
                    <Image
                        source={{ uri: u.imgperfil }}
                        style={styles.image}
                    ></Image>
                </View>
                <Text style={styles.text}>{u.nome}</Text>
            </TouchableOpacity>
        ));
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Matches</Text>

            <View style={styles.lista}>
                {lista()}
            </View>

            <Nav
                navigation={navigation}
            ></Nav>
        </View>
    )
}