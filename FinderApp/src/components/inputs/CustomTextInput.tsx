import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import useTheme from '../../hooks/UseTheme';

interface Props {
    setText: (text: string) => void;
    placeholder?: string;
    secure?: boolean;
    obrigatorio?: boolean;
    limpar?: boolean;
    errMsg?: string;
    style?: any;
    value?: string;
};

export default function CustomTextInput(props: Props) {
    const { theme } = useTheme();
    const [touched, setTouched] = useState<boolean>(false);
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [text, setText] = useState<string>("");
    const [erroMsg, setErroMsg] = useState<string>();

    if (props.obrigatorio) {
        useEffect(() => {
            if (isFocused) {
                setTouched(true);
            }
        }, [isFocused]);

        useEffect(() => {
            if (touched && props.errMsg) {
                setErroMsg(props.errMsg);
            } else if (touched && !(props.value ? props.value : text)) {
                setErroMsg("Preencha o campo");
            } else {
                setErroMsg('');
            }
        }, [(props.value ? props.value : text), isFocused]);
    }

    const styles = StyleSheet.create({
        view: {
            display: 'flex',
            alignItems: 'center',
        },
        input: {
            height: 40,
            minWidth: '100%',
            borderColor: (isFocused ? theme.colors.primary : theme.colors.border),
            borderWidth: (isFocused ? 3 : 2),
            borderRadius: 15,
            paddingHorizontal: 10,
            backgroundColor: 'white',
            color: theme.colors.text,
        },
        textoErr: {
            color: theme.colors.primary,
        },
    });

    return (
        <View style={[styles.view, props.style]}>
            <TextInput
                style={styles.input}
                placeholder={props.placeholder}
                onChangeText={(txt: string) => { setText(txt); props.setText(txt) }}
                secureTextEntry={props.secure}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                value={(props.value ? props.value : text)}
            />
            {erroMsg && <Text style={styles.textoErr}>{erroMsg}</Text>}
        </View>
    );
}
