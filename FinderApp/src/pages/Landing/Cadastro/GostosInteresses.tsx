import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";

interface Props {
    navigation: any;
};

const Stack = createNativeStackNavigator();

export default function GostosInteresses({ navigation }: Props) {
    return (
        <View>
            <Text>GostosInteresses</Text>
            <Button
                title="Continuar"
            ></Button>
        </View>
    );
}