import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";
import useTheme from "../../../hooks/UseTheme";
import CustomButton from "../../../components/inputs/CustomButton";
import CustomTextBoxInput from "../../../components/inputs/CustomTextBoxInput";

interface Props {
    navigation: any;
};

const Stack = createNativeStackNavigator();

export default function Bio({ navigation }: Props) {
    const { theme } = useTheme();

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
            navigation.navigate("List");
        // }
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Como você vive e o que te atrai?</Text>

            {/* <View style={styles.inputs}> */}
            <CustomTextBoxInput
                setText={() => { }}
                placeholder="Escreva aqui sobre você"
            />
            {/* </View> */}

            <CustomButton
                onPress={Continuar}
            />
        </View>
    );
}