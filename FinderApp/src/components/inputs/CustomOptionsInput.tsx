import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import useTheme from "../../hooks/UseTheme";

interface Props {
    options: Array<{ nome: string, id: number }>;
    setOptions: (options: Array<{ nome: string, id: number }>) => void;
    titulo: string;
    minSelected: number;
};

export default function CustomOptionsInput(props: Props) {
    const { theme } = useTheme();
    const [selectedOptions, setSelectedOptions] = useState<Array<{
        nome: string,
        id: number,
        selected: boolean
    }>>(props.options.map((o) => {
        return {
            nome: o.nome,
            id: o.id,
            selected: false
        }
    }));

    const styles = StyleSheet.create({
        input: {
            display: "flex",
            alignItems: "center",
            borderRadius: 5,
            borderWidth: 3,
            borderColor: theme.colors.border,
            gap: 10,
            padding: 5,
        },
        output: {
            fontSize: 18,
        },
        texto: {
            color: theme.colors.text
        },
        textoErr: {
            color: theme.colors.primary
        },
        optionsContainer: {
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignContent: "center",
            gap: 5,
            padding: 5,
        },
        optionButton: {
            borderRadius: 15,
            borderWidth: 2,
            color: theme.colors.text,
            paddingHorizontal: 5,
            paddingVertical: 2,
        },
        optionButtonText: {
            color: theme.colors.text,
        },
        titulo: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            paddingHorizontal: 10,
        },
    });

    function selectedCount() {
        return selectedOptions.filter((o) => o.selected).length;
    }

    function optionsButtons() {
        return selectedOptions.map((o) => (
            <TouchableOpacity
                style={[styles.optionButton, {
                    borderColor: (o.selected ? theme.colors.primary : theme.colors.border)
                }]}
                onPress={() => {
                    setSelectedOptions(selectedOptions.map((op) => ({
                        nome: op.nome,
                        id: op.id,
                        selected: (o.id === op.id && (op.selected || selectedCount() < props.minSelected) ? !op.selected : op.selected)
                    })));
                }}
            >
                <Text style={styles.optionButtonText}>{o.nome}</Text>
            </TouchableOpacity>
        ));
    }

    return (
        <View style={styles.input}>
            <View style={styles.titulo}>
                <Text style={styles.texto}>{props.titulo}</Text>
                <Text style={styles.texto}>{selectedCount()}/{props.minSelected}</Text>
            </View>
            <View style={styles.optionsContainer}>
                {optionsButtons()}
            </View>
        </View>
    );
}