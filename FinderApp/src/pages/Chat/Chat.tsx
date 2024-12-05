import { StyleSheet, View, Text, Alert, Image, TouchableOpacity, ScrollView } from "react-native";
import { useEffect, useRef, useState } from "react";
import useTheme from "../../hooks/UseTheme";
import Nav from "../../components/Nav";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CustomTextInput from "../../components/inputs/CustomTextInput";
import CustomAudioInput from "../../components/inputs/CustomAudioInput";
import CustomAudioPlayer from "../../components/inputs/CustomAudioPlayer";

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
    const [audioAtual, setAudioAtual] = useState<string>("");
    const [proprioId, setProprioId] = useState<number>(0);
    const { theme } = useTheme();
    const scrollViewRef = useRef<ScrollView>({} as ScrollView);

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
            height: "75%",
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
            width: "75%"
        },
        btnEnviar: {

        },
        enviarImage: {
            width: 40,
            height: 40,
        },
    });

    async function EnviarMsg() {
        try {
            console.log("audioAtual", audioAtual.length);
            if (msgAtual == undefined && audioAtual == undefined) return;

            const proprioId = await AsyncStorage.getItem("idUsuario");
            if (proprioId == undefined) return;

            if (chat == undefined) return;

            const response = await fetch("https://finder-app-back.vercel.app/mensagem/criarMsg", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "textMsg": msgAtual,
                    "usuarioId": proprioId,
                    "chatId": chat?.id,
                    "audMsg": audioAtual
                })
            });

            const data = await response.json();
            if (response.ok) {
                setMsgAtual("");
                setAudioAtual("");
            } else {
                console.log("Falha ao enviar mensagem chat:", data.msg);
                // Alert.alert("Falha ao enviar mensagem chat: ", data.msg);
            }
        }
        catch (err: any) {
            console.log("Falha ao enviar mensagem chat:", err);
            // Alert.alert("Falha ao enviar mensagem chat: ", err);
        }
    }

    function ListarMensagens() {
        return mensagens.filter(m => (m.audmsg && m.audmsg != undefined) || (m.textmsg && m.textmsg != undefined)).map((m, index) => {
            if (m.audmsg) {
                return (
                    <CustomAudioPlayer
                        usuario={m.usuario_id == proprioId}
                        key={index}
                        audio={m.audmsg}
                    />
                );
            }

            return (
                <View
                    style={(m.usuario_id == proprioId ? styles.msgUsuario : styles.msgMatch)}
                    key={index}
                >
                    <Text style={styles.msgText}>{m.textmsg}</Text>
                </View>
            );
        });
    }

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
            if (response.status != 200) {
                return false;
            }

            const data = await response.json();
            if (response.ok) {
                setChat(data.chat);
            } else {
                console.log("Falha carregando chat:", data.msg);
                // Alert.alert("Falha carregando chat:", data.msg);
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
                console.log("Falha criando chat:", data.msg);
                // Alert.alert("Falha criando chat:", data.msg);
            }
        }

        CriarChat();
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: false });
        }
    }, []);

    useEffect(() => {
        async function marcarVisualizado() {
            const response = await fetch(`https://finder-app-back.vercel.app/mensagem/marcarVisualizado?chatId=${chat?.id}&usuarioId=${proprioId}`);

            if (response.ok) {
                const data = await response.json();
                setMensagens(data.mensagens);
            }
        }
        async function mensagensChat() {
            const response = await fetch(`https://finder-app-back.vercel.app/mensagem/listaMsg?chatId=${chat?.id}`);

            if (response.ok) {
                const data = await response.json();
                setMensagens(data.mensagens.sort((a: any, b: any) => a.id - b.id));
                await marcarVisualizado();
            }
        }

        if (chat != undefined) {
            setInterval(() => {
                mensagensChat();
            }, 1000);
        }
    }, [chat]);

    useEffect(() => {
        EnviarMsg();
    }, [audioAtual]);

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

                <ScrollView
                    ref={scrollViewRef}
                    style={styles.mensagens}
                    horizontal={false}
                >
                    {ListarMensagens()}
                </ScrollView>

                <View style={styles.input}>
                    <CustomTextInput
                        style={styles.textInput}
                        setText={setMsgAtual}
                        value={msgAtual}
                    />
                    <CustomAudioInput
                        setAudio={setAudioAtual}
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