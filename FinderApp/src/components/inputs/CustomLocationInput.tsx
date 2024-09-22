import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/UseTheme";
import Geolocation from 'react-native-geolocation-service';

interface Props {
    setLocation: (location: { latitude: number; longitude: number }) => void;
};

export default function CustomLocationInput(props: Props) {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [erroMsg, setErroMsg] = useState<string>();

    const styles = StyleSheet.create({
        input: {
            display: "flex",
            alignItems: "center"
        },
        image: {
            width: 25,
            height: 25,
        },
        touchable: {
            borderRadius: 15,
            borderColor: (location != null ? "green" : theme.colors.border),
            borderWidth: (isFocused ? 3 : 2),
            padding: 10,
            backgroundColor: "white",

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
        },
        texto: {
            color: theme.colors.text
        },
        textoErr: {
            color: theme.colors.primary
        }
    });

    const getLocation = () => {
        Geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setLocation({ latitude, longitude });
                setErroMsg("");
            },
            (error) => {
                setErroMsg(error.message);
                setLocation(null);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    };

    return (
        <View style={styles.input}>
            <TouchableOpacity
                style={styles.touchable}
                onPress={getLocation}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <Image
                    style={styles.image}
                    source={require("../../../assets/images/cadastro/location.png")}
                />
                <Text style={styles.texto}>{location ? "Localizado" : "Localização"}</Text>
            </TouchableOpacity>
            {erroMsg && <Text style={styles.textoErr}>{erroMsg}</Text>}
        </View>
    );
}