import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import CustomButton from "../../../components/inputs/CustomButton";
import CustomOptionsInput from "../../../components/inputs/CustomOptionsInput";
import { useState } from "react";
import useTheme from "../../../hooks/UseTheme";

interface Props {
    navigation: any;
    route: any;
};

const Stack = createNativeStackNavigator();

export default function GostosInteresses({ navigation, route }: Props) {
    // const { } = route.params;
    const { theme } = useTheme();
    const [gostosSelecionados, setGostosSelecionados] = useState<Array<{ nome: string, id: number }>>();
    const [interessesSelecionados, setInteressesSelecionados] = useState<Array<{ nome: string, id: number }>>();
    const [gostos, setGostos] = useState<Array<{ nome: string, id: number }>>();
    const [interesses, setInteresses] = useState<Array<{ nome: string, id: number }>>();

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 75,
            paddingHorizontal: 50,
            backgroundColor: theme.colors.background,
        },
        titulo: {
            margin: "auto",
            fontSize: 32,
            color: theme.colors.text
        },
        inputs: {
            display: "flex",
            gap: 5,
            flexDirection: "column",
            alignItems: "center",
            margin: "auto",
            maxWidth: "80%"
        },
        textInput: {
            minWidth: "100%"
        },
        btnContinuar: {
            backgroundColor: theme.colors.primary,
            margin: "auto",
            paddingHorizontal: 20,
            paddingVertical: 5,
            textAlign: "center",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 35,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 25,
        },
        btnTexto: {
            color: theme.colors.text,
            fontSize: 24
        },
        nascimentoLocalizacao: {
            display: "flex",
            gap: 5,
            flexDirection: "row"
        }
    });

    function Continuar() {
        // if (ValidarEmail() && tmpSenha === confSenha) {
        //     propSetEmail(tmpEmail);
        //     propSetSenha(tmpSenha);
            navigation.navigate("CadastroBio");
        // }
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Diga mais sobre você</Text>

            <View style={styles.inputs}>
                <CustomOptionsInput
                    options={gostos || [
                        { nome: "gosto 0", id: 0 },
                        { nome: "gosto 1", id: 1 },
                        { nome: "gosto 2", id: 2 },
                        { nome: "gosto 3", id: 3 },
                        { nome: "gosto 4", id: 4 },
                        { nome: "gosto 5", id: 5 },
                        { nome: "gosto 6", id: 6 },
                        { nome: "gosto 7", id: 7 },
                    ]}
                    setOptions={setGostosSelecionados}
                    titulo="Email"
                    minSelected={5}
                // errMsg={tmpEmail && !ValidarEmail() ? "E-mail inválido" : ""}
                />
                <CustomOptionsInput
                    options={interesses || []}
                    setOptions={setInteressesSelecionados}
                    titulo="Senha"
                    minSelected={3}
                // errMsg={tmpSenha != confSenha ? "Senhas devem ser iguais" : ""}
                />
            </View>

            <CustomButton
                onPress={Continuar}
            />
        </View>
    );
}