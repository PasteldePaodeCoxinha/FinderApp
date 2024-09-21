import { Image, StyleSheet, TouchableOpacity } from "react-native";

interface Props {
    image: any;
    callback: (_: any) => void;
};

export default function NavButton(props: Props) {
    const styles = StyleSheet.create({
        image: {
            width: 45,
            height: 45,
        },
    });

    return (
        <TouchableOpacity onPress={props.callback}>
            <Image
                source={props.image}
                style={styles.image}
            ></Image>
        </TouchableOpacity>
    );
}