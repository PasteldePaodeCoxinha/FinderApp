import { StyleSheet, View, Text, Alert, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import useTheme from "../../hooks/UseTheme";
import Nav from "../../components/Nav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/inputs/CustomTextInput";

interface Props {
    navigation: any;
};

interface Usuario {
    id: number;
    nome: string;
    imgperfil: string;
};

interface IChat {
    id: number;
    idusuario1: number;
    idusuario2: number;
};

interface IMensagem {
    id: number,
    textmsg: string,
    imgmsg: string,
    audmsg: string,
    usuario_id: number,
    chat_id: number
};

export default function Chat({ navigation }: Props) {
    const [match, setMatch] = useState<Usuario>({} as Usuario);
    const [chat, setChat] = useState<IChat | null>(null);
    const [mensagens, setMensagens] = useState<Array<IMensagem>>([]);
    const [msgAtual, setMsgAtual] = useState<string>("");
    const [proprioId, setProprioId] = useState<number>(0);
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            height: "100%",
            width: "100%",
            backgroundColor: theme.colors.background,
            paddingTop: 15,
        },
        chat: {
            display: "flex",
            justifyContent: "space-between",
            gap: 10,
            paddingHorizontal: 20,
        },
        tituloContainer: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
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
        titulo: {
            margin: "auto",
            fontSize: 32,
            color: theme.colors.text
        },
        mensagens: {
            display: "flex",
            borderRadius: 15,
            borderColor: theme.colors.border,
            borderWidth: 2,
            minHeight: "75%",
            padding: 5,
        },
        msgUsuario: {
            display: "flex",
            alignSelf: "flex-end",
            backgroundColor: theme.colors.msgBG,
            borderWidth: 2,
            borderColor: theme.colors.border,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            padding: 5,
            paddingHorizontal: 10,
            maxWidth: "60%",
        },
        msgMatch: {
            display: "flex",
            alignSelf: "flex-start",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: theme.colors.border,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            padding: 5,
            paddingHorizontal: 10,
            maxWidth: "60%",
        },
        msgText: {
            fontSize: 18,
            color: theme.colors.text
        },
        input: {
            display: "flex",
            flexDirection: "row",
        },
        textInput: {
            width: "85%"
        },
        btnEnviar: {

        },
        enviarImage: {
            width: 40,
            height: 40,
        },
    });

    useEffect(() => {
        async function ChecaChat() {
            const proprioId = await AsyncStorage.getItem("idUsuario");
            if (!proprioId) {
                navigation.navigate("Landing");
                return;
            }
            setProprioId(parseInt(proprioId));

            const userChat = await AsyncStorage.getItem("userChat");
            if (!userChat) {
                navigation.navigate("Matches");
                return false;
            }
            setMatch(JSON.parse(userChat));

            const response = await fetch(`https://finder-app-back.vercel.app/chat/pegarUmChat?usuarioId1=${proprioId}&usuarioId2=${parseInt(JSON.parse(userChat).id)}`);
            if (response.status != 200)
                return false;

            const data = await response.json();
            if (response.ok) {
                setChat(data.chat);
            } else {
                Alert.alert("Falha carregando chat:", data.msg);
            }

            return true;
        }

        async function CriarChat() {
            if (await ChecaChat())
                return;

            const proprioId = await AsyncStorage.getItem("idUsuario");
            if (!proprioId) return;

            const userChat = await AsyncStorage.getItem("userChat");
            if (!userChat) {
                navigation.navigate("Matches");
                return;
            }

            const response = await fetch("https://finder-app-back.vercel.app/chat/criarChat", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "idUsuario1": proprioId,
                    "idUsuario2": JSON.parse(userChat).id
                })
            });

            const data = await response.json();
            if (response.ok) {
                await ChecaChat();
            } else {
                Alert.alert("Falha criando chat:", data.msg);
            }
        }

        CriarChat();
    }, []);

    useEffect(() => {
        async function mensagensChat() {
            if (chat == null) return;
            const response = await fetch(`https://finder-app-back.vercel.app/mensagem/listaMsg?chatId=${chat.id}`);

            const data = await response.json();
            if (response.ok) {
                setMensagens(data.mensagens);
            }
        }
        setInterval(() => {
            mensagensChat();
        }, 1000);
    }, [chat]);

    function ListarMensagens() {
        return mensagens.map((m, index) => (
            <View
                style={(m.usuario_id == proprioId ? styles.msgUsuario : styles.msgMatch)}
                key={index}
            >
                <Text style={styles.msgText}>{m.textmsg}</Text>
            </View>
        ));
    }

    async function EnviarMsg() {
        if (!msgAtual) return;

        const proprioId = await AsyncStorage.getItem("idUsuario");
        if (!proprioId) return;

        const response = await fetch("https://finder-app-back.vercel.app/mensagem/criarMsg", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "textMsg": msgAtual,
                "usuarioId": proprioId,
                "chatId": chat?.id
            })
        });

        const data = await response.json();
        if (response.ok) {
            setMsgAtual("");
        } else {
            Alert.alert("Falha ao enviar mensagem chat:", data.msg);
        }
    }

    return (
        <View style={styles.pagina}>
            <View style={styles.chat}>
                <View style={styles.tituloContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={(match.imgperfil ? { uri: match.imgperfil } : require("../../../assets/images/nav/profile.png"))}
                            style={styles.image}
                        ></Image>
                    </View>
                    <Text style={styles.titulo}>{match.nome}</Text>
                </View>

                <View style={styles.mensagens}>
                    {ListarMensagens()}
                </View>

                <View style={styles.input}>
                    <CustomTextInput
                        style={styles.textInput}
                        setText={(text) => setMsgAtual(text)}
                        value={msgAtual}
                    />
                    <TouchableOpacity
                        style={styles.btnEnviar}
                        onPress={EnviarMsg}
                    >
                        <Image
                            source={require("../../../assets/images/chat/send.png")}
                            style={styles.enviarImage}
                        ></Image>
                    </TouchableOpacity>
                </View>
            </View>
            <Nav
                navigation={navigation}
            ></Nav>
        </View>
    );
}