import { StyleSheet, Text, View } from "react-native";
import useTheme from "../../../hooks/UseTheme";
import CustomButton from "../../../components/inputs/CustomButton";
import CustomTextInput from "../../../components/inputs/CustomTextInput";

interface Props {
    propSetNumCasa: React.Dispatch<React.SetStateAction<number>>;
    propSetRua: React.Dispatch<React.SetStateAction<string>>;
    propSetBairro: React.Dispatch<React.SetStateAction<string>>;
    propSetCidade: React.Dispatch<React.SetStateAction<string>>;
    propSetEstado: React.Dispatch<React.SetStateAction<string>>;
    propSetRegiao: React.Dispatch<React.SetStateAction<string>>;
    propSetCep: React.Dispatch<React.SetStateAction<string>>;
    continuar: () => void;
};

export default function Endereco(props: Props) {
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
    });

    function Continuar() {
        props.continuar();
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Preencha o seu endereço</Text>

            <View style={styles.inputs}>
                <CustomTextInput
                    setText={props.propSetRua}
                    placeholder="Rua"
                />
                <CustomTextInput
                    setText={props.propSetBairro}
                    placeholder="Bairro"
                />
                <CustomTextInput
                    setText={props.propSetCidade}
                    placeholder="Cidade"
                />
                <CustomTextInput
                    setText={props.propSetEstado}
                    placeholder="Estado"
                />
                <CustomTextInput
                    setText={props.propSetRegiao}
                    placeholder="Regiao"
                />
                <CustomTextInput
                    setText={props.propSetCep}
                    placeholder="CEP"
                />
            </View>

            <CustomButton
                onPress={Continuar}
                text="Continue"
            />
        </View>
    );
}