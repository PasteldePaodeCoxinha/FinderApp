import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomImageInput from "../../../components/inputs/CustomImageInput";
import useTheme from "../../../hooks/UseTheme";
import CustomButton from "../../../components/inputs/CustomButton";
import CustomTextInput from "../../../components/inputs/CustomTextInput";

interface Props {
    navigation: any;
};

export default function Basico({ navigation }: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 75,
            backgroundColor: theme.colors.background
        },
        titulo: {
            margin: "auto",
            fontSize: 32,
            color: theme.colors.text
        },
        inputs: {
            display: "flex",
            margin: "auto",
            flexWrap: "wrap",

            maxWidth: "70%"
        },
        textInput: {
            // width: "100%"
        },
        // dateInput: {
        //     // width: "100%"
        // },
        // locationInput: {
        //     // width: "100%"
        // },
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
        }
    });

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Preencha algumas informações básicas</Text>

            <View style={styles.inputs}>
                <CustomImageInput />
                <CustomTextInput
                    style={styles.textInput}
                    setText={() => { }}
                    placeholder="Nome"
                />
                
                {/* <CustomDateInput
                    style={styles.dateInput}
                    setText={() => { }}
                    placeholder="Nome"
                />
                <CustomLocationInput
                    style={styles.locationInput}
                    setText={() => { }}
                    placeholder="Nome"
                /> */}

                <CustomTextInput
                    style={styles.textInput}
                    setText={() => { }}
                    placeholder="Profissão"
                />
                <CustomTextInput
                    style={styles.textInput}
                    setText={() => { }}
                    placeholder="Escolaridade"
                />
            </View>

            <CustomButton
                onPress={() => navigation.navigate("CadastroGostosInteresses")}
            />
        </View>
    );
}