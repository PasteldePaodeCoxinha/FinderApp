import { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { launchImageLibrary, MediaType } from 'react-native-image-picker';
import useTheme from "../../hooks/UseTheme";

interface Props {
    setImage: (b64: string) => void;
    defaultImage?: string;
};

export default function CustomImageInput(props: Props) {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [imageB64, setImageB64] = useState<string>("");
    const [fileType, setFileType] = useState<string>("");

    const styles = StyleSheet.create({
        image: {
            width: 100,
            height: 100,
        },
        touchable: {
            borderRadius: 15,
            borderWidth: 3,
            borderColor: theme.colors.border,
            padding: 10,
            margin: "auto",
            width: "100%"
        },
    });

    function selectImage() {
        const options = {
            selectionLimit: 1,
            mediaType: "photo" as MediaType,
            includeBase64: true
        };

        launchImageLibrary(options, (response) => {
            if (response.assets && response.assets.length > 0) {
                const fileName = response.assets[0].fileName;
                const fileType = fileName?.match(/\.[0-9a-zA-Z]+$/i);
                const base64 = response.assets[0].base64;
                if (base64 && fileType) {
                    setImageB64(base64);
                    setFileType(fileType[0]);
                    props.setImage(`data:image/${fileType};base64,${base64}`);
                }
            }
        });
    };

    function img() {
        if (imageB64) {
            return ({
                uri: `data:image/${fileType};base64,${imageB64}`
            });
        } else if (props.defaultImage) {
            return ({
                uri: props.defaultImage
            });
        }
        return require("../../../assets/images/nav/profile.png");
    }

    return (
        <View>
            <TouchableOpacity
                style={styles.touchable}
                onPress={selectImage}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <Image
                    style={styles.image}
                    source={img()}
                />
            </TouchableOpacity>
        </View>
    );
}