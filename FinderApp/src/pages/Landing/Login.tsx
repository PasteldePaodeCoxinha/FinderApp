import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/UseTheme";
import LandingIntroducao from "../../components/LandingIntroducao";

interface Props {
    navigation: any;
};

export default function Login({ navigation }: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            paddingBottom: 75,
        },
        titulo: {
            margin: "auto",
            fontSize: 32,
            color: theme.colors.text
        },
        appNameText: {
            color: theme.colors.primary
        },
        buttons: {
            display: "flex",
            gap: 20,
            margin: "auto"
        },
        btnEntrar: {
            backgroundColor: theme.colors.primary,
            margin: "auto",
            paddingHorizontal: 25,
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
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Bem-vindo ao <Text style={styles.appNameText}>Finder</Text></Text>

            // Campos de email e senha

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.btnEntrar}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={styles.btnTexto}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}