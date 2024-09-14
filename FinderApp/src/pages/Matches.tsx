import { Button, Text, View } from "react-native";
import Nav from "../components/Nav";

interface Props {
    navigation: any
}

export default function Matches({ navigation }: Props) {
    return (
        <View>
            <Text>Matches</Text>
            <Nav
                navigation={navigation}
            ></Nav>
            <Button
                title="Login"
                onPress={() => navigation.navigate('Login', { name: 'Jane' })}
            />
        </View>
    )
}