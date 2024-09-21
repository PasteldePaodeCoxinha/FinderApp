import { Text, View } from "react-native";
import Nav from "../../components/Nav";

interface Props {
    navigation: any;
};

export default function ProfileBase({ navigation }: Props) {
    return (
        <View>
            <Text>Profile</Text>
            <Nav
                navigation={navigation}
            ></Nav>
        </View>
    )
}