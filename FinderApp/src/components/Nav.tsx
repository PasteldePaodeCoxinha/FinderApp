import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
    navigation: any
}

export default function Nav({ navigation }: Props) {
    console.log(typeof navigation, navigation);
    return (
        <View
            style={styles.nav}
        >
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Image
                    source={require("../../assets/images/nav/search.png")}
                    style={styles.image}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Matches')}>
                <Image
                    source={require("../../assets/images/nav/matches.png")}
                    style={styles.image}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('List')}>
                <Image
                    source={require("../../assets/images/nav/list.png")}
                    style={styles.image}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
                <Image
                    source={require("../../assets/images/nav/chat.png")}
                    style={styles.image}
                ></Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image
                    source={require("../../assets/images/nav/profile.png")}
                    style={styles.image}
                ></Image>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nav: {
        backgroundColor: "black"
    },
    image: {
        width: 45,
        height: 45,
    },
});