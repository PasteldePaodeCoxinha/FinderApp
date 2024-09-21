import { useState } from "react";
import { StyleProp, StyleSheet, TextInput, View, ViewStyle } from "react-native";
import useTheme from "../../hooks/UseTheme";

interface Props {
    style?: StyleProp<ViewStyle>,
    setText: (text: string) => void;
    placeholder?: string;
    secure?: boolean;
};

export default function CustomTextInput(props: Props) {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);

    const styles = StyleSheet.create({
        input: {
            height: 40,
            borderColor: (isFocused ? theme.colors.primary : theme.colors.border),
            borderWidth: (isFocused ? 3 : 2),
            borderRadius: 15,
            marginBottom: 20,
            paddingHorizontal: 10,
            backgroundColor: "white"
        },
        output: {
            fontSize: 18,
        },
    });

    return (
        <View style={props.style}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={props.setText}
                secureTextEntry={props.secure}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
        </View>
    );
}