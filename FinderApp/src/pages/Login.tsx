import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";

interface Props {
    navigation: any
}

const Stack = createNativeStackNavigator();

export default function Login({ navigation }: Props) {
    return (
        <View>
            <Text>Login</Text>
            <Button
                title="Entrar"
            ></Button>
        </View>
    )
}