import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";

interface Props {
    navigation: any;
};

const Stack = createNativeStackNavigator();

export default function Basico({ navigation }: Props) {
    return (
        <View>
            <Text>Basico</Text>
            <Button
                title="Continuar"
            ></Button>
        </View>
    );
}