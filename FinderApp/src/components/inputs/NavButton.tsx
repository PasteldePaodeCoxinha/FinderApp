import { Image, StyleSheet, TouchableOpacity } from "react-native";
import useTheme from "../../hooks/UseTheme";

interface Props {
    image: any;
    callback: (_: any) => void;
};

export default function NavButton(props: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        image: {
            width: 35,
            height: 35,
        },
        touchable: {
            padding: 8,
            borderRadius: 100,
            borderColor: theme.colors.border,
            borderWidth: 2
        },
    });

    return (
        <TouchableOpacity
            style={styles.touchable}
            onPress={props.callback}
        >
            <Image
                style={styles.image}
                source={props.image}
            ></Image>
        </TouchableOpacity>
    );
}