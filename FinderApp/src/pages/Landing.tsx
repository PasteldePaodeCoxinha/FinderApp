import { Button, StyleSheet, Text, View } from "react-native";
import LandingIntroducao from "../components/LandingIntroducao";
import useTheme from "../hooks/UseTheme";

interface Props {
    navigation: any
}

export default function Landing({ navigation }: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        appNameText: {
            color: theme.colors.primary
        }
    });

    return (
        <View>
            <Text>Bem-vindo ao <Text style={styles.appNameText} >Finder</Text></Text>

            <LandingIntroducao
                navigation={navigation}
            ></LandingIntroducao>

            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
            <Button
                title="Cadastrar"
                onPress={() => navigation.navigate('Cadastro')}
            />
        </View>
    )
}