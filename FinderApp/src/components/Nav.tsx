import { StyleSheet, View } from "react-native";
import NavButton from "./inputs/NavButton";

interface Props {
    navigation: any
}

export default function Nav({ navigation }: Props) {
    const styles = StyleSheet.create({
        nav: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            backgroundColor: "white",
            paddingVertical: 5,
            paddingHorizontal: 25,
        },
    });

    return (
        <View
            style={styles.nav}
        >
            <NavButton
                image={require("../../assets/images/nav/search.png")}
                callback={() => navigation.navigate("Search")}
            ></NavButton>
            <NavButton
                image={require("../../assets/images/nav/matches.png")}
                callback={() => navigation.navigate("Matches")}
            ></NavButton>
            <NavButton
                image={require("../../assets/images/nav/list.png")}
                callback={() => navigation.navigate("List")}
            ></NavButton>
            <NavButton
                image={require("../../assets/images/nav/chat.png")}
                callback={() => navigation.navigate("Chat")}
            ></NavButton>
            <NavButton
                image={require("../../assets/images/nav/profile.png")}
                callback={() => navigation.navigate("Profile")}
            ></NavButton>
        </View>
    )
}