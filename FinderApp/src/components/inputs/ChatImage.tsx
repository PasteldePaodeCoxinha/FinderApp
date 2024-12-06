import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import useTheme from '../../hooks/UseTheme';

interface Props {
    image: string;
    texto?: string;
    usuario: boolean;
};

export default function ChatImage(props: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        image: {
            width: 150,
            height: 150,
        },
        texto: {
            color: theme.colors.text,
        },
        msgUsuario: {
            display: "flex",
            alignSelf: "flex-end",
            backgroundColor: theme.colors.msgBG,
            borderWidth: 2,
            borderColor: theme.colors.border,
            borderTopLeftRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            padding: 5,
            maxWidth: "60%",
        },
        msgMatch: {
            display: "flex",
            alignSelf: "flex-start",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: theme.colors.border,
            borderTopRightRadius: 15,
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
            padding: 5,
            maxWidth: "60%",
        },
    });

    return (
        <View style={props.usuario ? styles.msgUsuario : styles.msgMatch}>
            <Image
                style={styles.image}
                source={{ uri: props.image }}
            />
            {props.texto &&
                <Text style={styles.texto}>{props.texto}</Text>
            }
        </View>
    );
}
