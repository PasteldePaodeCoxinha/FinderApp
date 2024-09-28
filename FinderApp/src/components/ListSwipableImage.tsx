import { ImageBackground, StyleSheet, Text, View } from "react-native";
import useTheme from "../hooks/UseTheme";

interface Props {
    imageSource: any;
    desc: string;
    bio: string;
};

export default function ListSwipableImage(props: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        backgroundImage: {
            width: 350,
            height: 700,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingVertical: 50,
            gap: 10,
            borderRadius: 15,
        },
        desc: {
            // color: theme.colors.text,
        },
        descText: {
            fontSize: 28,
            textAlign: "center",
            color: theme.colors.text,
            textShadowColor: "white",
            textShadowOffset: {
                width: 0,
                height: 0
            },
            textShadowRadius: 5,
        },
        bio: {
            backgroundColor: theme.colors.border,
            maxWidth: "90%",
            borderRadius: 15,
            padding: 10
        },
        bioText: {
            fontSize: 24,
            color: theme.colors.text,
        },
    });

    return (
        <ImageBackground
            style={styles.backgroundImage}
            source={{ uri: props.imageSource }}
        >
            <View style={styles.desc}>
                <Text style={styles.descText}>{props.desc}</Text>
                <View style={styles.bio}>
                    <Text style={styles.bioText}>{props.bio}</Text>
                </View>
            </View>
        </ImageBackground>
    )
}