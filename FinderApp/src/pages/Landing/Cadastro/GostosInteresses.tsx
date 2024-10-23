import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import CustomButton from '../../../components/inputs/CustomButton';
import CustomOptionsInput from '../../../components/inputs/CustomOptionsInput';
import { useEffect, useState } from 'react';
import useTheme from '../../../hooks/UseTheme';

interface Props {
    propsSetGostosSelecionados: React.Dispatch<React.SetStateAction<{ id: number; nome: string; }[]>>;
    propsSetInteressesSelecionados: React.Dispatch<React.SetStateAction<{ id: number; nome: string; }[]>>;
    continuar: () => void;
}

export default function GostosInteresses(props: Props) {
    const { theme } = useTheme();
    const [gostos, setGostos] = useState<Array<{ id: number; nome: string; }>>([]);
    const [interesses, setInteresses] = useState<Array<{ id: number; nome: string; }>>([]);

    const styles = StyleSheet.create({
        pagina: {
            display: 'flex',
            justifyContent: 'space-between',
            height: '100%',
            paddingBottom: 75,
            paddingHorizontal: 50,
            backgroundColor: theme.colors.background,
        },
        titulo: {
            margin: 'auto',
            fontSize: 32,
            color: theme.colors.text,
        },
        inputs: {
            display: 'flex',
            gap: 5,
            flexDirection: 'column',
            alignItems: 'center',
            margin: 'auto',
            maxWidth: '80%',
        },
        textInput: {
            minWidth: '100%',
        },
        btnContinuar: {
            backgroundColor: theme.colors.primary,
            margin: 'auto',
            paddingHorizontal: 20,
            paddingVertical: 5,
            textAlign: 'center',
            borderTopLeftRadius: 25,
            borderTopRightRadius: 35,
            borderBottomLeftRadius: 35,
            borderBottomRightRadius: 25,
        },
        btnTexto: {
            color: theme.colors.text,
            fontSize: 24,
        },
        nascimentoLocalizacao: {
            display: 'flex',
            gap: 5,
            flexDirection: 'row',
        },
    });

    useEffect(() => {
        async function getGostos() {
            const response = await fetch('https://finder-app-back.vercel.app/gosto/lista');

            const data = await response.json();
            if (response.ok) {
                setGostos(data.gostos);
            } else {
                Alert.alert('Falha buscando gostos:', data.msg);
            }
        }
        async function getInteresses() {
            const response = await fetch('https://finder-app-back.vercel.app/interesse/lista');

            const data = await response.json();
            if (response.ok) {
                setInteresses(data.interesses);
            } else {
                Alert.alert('Falha buscando interesses:', data.msg);
            }
        }

        getGostos();
        getInteresses();
    }, []);

    function Continuar() {
        props.continuar();
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Diga mais sobre você</Text>

            <View style={styles.inputs}>
                {gostos.length > 0 && (
                    <CustomOptionsInput
                        options={gostos}
                        setOptions={props.propsSetGostosSelecionados}
                        titulo="Quais são seus gostos?"
                        minSelected={5}
                    />
                )}
                {interesses.length > 0 && (
                    <CustomOptionsInput
                        options={interesses}
                        setOptions={props.propsSetInteressesSelecionados}
                        titulo="Quais são seus interesses?"
                        minSelected={3}
                    />
                )}
            </View>

            <CustomButton
                onPress={Continuar}
            />
        </View>
    );
}
