import { StyleSheet, Text, View } from 'react-native';
import useTheme from '../../../hooks/UseTheme';
import CustomButton from '../../../components/inputs/CustomButton';
import CustomTextInput from '../../../components/inputs/CustomTextInput';
import React, { useState } from 'react';

interface Props {
    propSetEmail: React.Dispatch<React.SetStateAction<string>>;
    propSetSenha: React.Dispatch<React.SetStateAction<string>>;
    continuar: () => void;
}

export default function EmailSenha(props: Props) {
    const { theme } = useTheme();
    const [tmpEmail, setTmpEmail] = useState<string>('');
    const [tmpSenha, setTmpSenha] = useState<string>('');
    const [confSenha, setConfSenha] = useState<string>();

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

    function ValidarEmail() {
        if (!tmpEmail) {return false;}
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(tmpEmail);
    }

    function Continuar() {
        if (ValidarEmail() && tmpSenha === confSenha) {
            props.propSetEmail(tmpEmail);
            props.propSetSenha(tmpSenha);
            props.continuar();
        }
    }

    return (
        <View style={styles.pagina}>
            <Text style={styles.titulo}>Preencha algumas informações básicas</Text>

            <View style={styles.inputs}>
                <CustomTextInput
                    setText={setTmpEmail}
                    placeholder="Email"
                    obrigatorio={true}
                    errMsg={tmpEmail && !ValidarEmail() ? 'E-mail inválido' : ''}
                />
                <CustomTextInput
                    setText={setTmpSenha}
                    placeholder="Senha"
                    secure={true}
                    obrigatorio={true}
                />
                <CustomTextInput
                    setText={setConfSenha}
                    placeholder="Confirmar Senha"
                    secure={true}
                    obrigatorio={true}
                    errMsg={tmpSenha !== confSenha ? 'As senhas devem ser iguais' : ''}
                />
            </View>

            <CustomButton
                onPress={Continuar}
            />
        </View>
    );
}
