import { Button, Text, View } from "react-native";
import Nav from "../components/Nav";

interface Props {
    navigation: any
}

export default function Chat({ navigation }: Props) {
    return (
        <View>
            <Text>Chat</Text>
            <Nav
                navigation={navigation}
            ></Nav>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}