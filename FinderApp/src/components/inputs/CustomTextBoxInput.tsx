import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import useTheme from "../../hooks/UseTheme";

interface Props {
    setText: (text: string) => void;
    placeholder?: string;
    secure?: boolean;
    obrigatorio?: boolean;
    errMsg?: string;
};

export default function CustomTextBoxInput(props: Props) {
    const { theme } = useTheme();
    const [touched, setTouched] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [erroMsg, setErroMsg] = useState<string>();
    const [text, setText] = useState<string>();

    if (props.obrigatorio) {
        useEffect(() => {
            if (isFocused) {
                setTouched(true);
            }
        }, [isFocused]);

        useEffect(() => {
            if (touched && props.errMsg) {
                setErroMsg(props.errMsg);
            } else if (touched && !text) {
                setErroMsg("Preencha o campo");
            } else {
                setErroMsg("");
            }
        }, [text, isFocused]);
    }

    const styles = StyleSheet.create({
        view: {
            display: "flex",
            alignItems: "center"
        },
        input: {
            height: 300,
            minWidth: "100%",
            borderColor: (isFocused ? theme.colors.primary : theme.colors.border),
            borderWidth: (isFocused ? 3 : 2),
            borderRadius: 15,
            paddingHorizontal: 10,
            backgroundColor: "white",
            color: theme.colors.text,
            textAlignVertical: "top",
            fontSize: 18,
        },
        textoErr: {
            color: theme.colors.primary
        }
    });

    return (
        <View style={styles.view}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                multiline={true}
                onChangeText={(txt: string) => { setText(txt); props.setText(txt); }}
                secureTextEntry={props.secure}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            />
            {erroMsg && <Text style={styles.textoErr}>{erroMsg}</Text>}
        </View>
    );
}