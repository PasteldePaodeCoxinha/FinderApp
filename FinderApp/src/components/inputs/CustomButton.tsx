import { StyleSheet, Text, TouchableOpacity } from "react-native";
import useTheme from "../../hooks/UseTheme";

interface Props {
    onPress: () => void;

};

export default function CustomButton(props: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        btnContinuar: {
            backgroundColor: theme.colors.primary,
            margin: "auto",
            paddingHorizontal: 20,
            paddingVertical: 5,
            textAlign: "center",
            borderTopLeftRadius: 35,
            borderTopRightRadius: 25,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 35,
        },
        btnTexto: {
            color: theme.colors.text,
            fontSize: 24
        }
    });

    return (
        <TouchableOpacity
            style={styles.btnContinuar}
            onPress={props.onPress}
        >
            <Text style={styles.btnTexto}>Continue</Text>
        </TouchableOpacity>
    );
}