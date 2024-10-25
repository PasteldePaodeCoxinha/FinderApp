import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CustomImageInput from '../../../components/inputs/CustomImageInput';
import useTheme from '../../../hooks/UseTheme';
import CustomButton from '../../../components/inputs/CustomButton';
import CustomTextInput from '../../../components/inputs/CustomTextInput';
import CustomDateInput from '../../../components/inputs/CustomDateInput';
import CustomLocationInput from '../../../components/inputs/CustomLocationInput';

interface Props {
    propSetImg: React.Dispatch<React.SetStateAction<string>>;
    propSetNome: React.Dispatch<React.SetStateAction<string>>;
    propSetNascimento: React.Dispatch<React.SetStateAction<Date>>;
    propSetProfissao: React.Dispatch<React.SetStateAction<string>>;
    propSetEscolaridade: React.Dispatch<React.SetStateAction<string>>;
    continuar: () => void;
}

export default function Basico(props: Props) {
    const { theme } = useTheme();

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

    function Continuar() {
        props.continuar();
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Preencha algumas informações básicas</Text>

            <View style={styles.inputs}>
                <CustomImageInput setImage={props.propSetImg} />
                <CustomTextInput
                    setText={props.propSetNome}
                    placeholder="Nome"
                />

                <View style={styles.nascimentoLocalizacao}>
                    <CustomDateInput
                        setDate={props.propSetNascimento}
                    />
                    <CustomLocationInput
                        setLocation={() => { }}
                    />
                </View>

                <CustomTextInput
                    setText={props.propSetProfissao}
                    placeholder="Profissão"
                />
                <CustomTextInput
                    setText={props.propSetEscolaridade}
                    placeholder="Escolaridade"
                />
            </View>

            <CustomButton
                onPress={Continuar}
                text="Continue"
            />
        </View>
    );
}
