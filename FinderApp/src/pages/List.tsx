import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import Nav from "../components/Nav";

interface Props {
    navigation: any;
};

const Stack = createNativeStackNavigator();

export default function List({ navigation }: Props) {
    return (
        <View>
            <Text>List</Text>
            <Nav
                navigation={navigation}
            ></Nav>
            <Button
                title="Entrar"
            ></Button>
        </View>
    )
}