import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useTheme from '../../hooks/UseTheme';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
    setDate: (date: Date) => void;
}

export default function CustomDateInput(props: Props) {
    const { theme } = useTheme();
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const [date, setDate] = useState<Date | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [erroMsg, setErroMsg] = useState<string>();

    const styles = StyleSheet.create({
        input: {
            display: 'flex',
            alignItems: 'center',
        },
        image: {
            width: 25,
            height: 25,
        },
        touchable: {
            borderRadius: 15,
            borderColor: (date != null ? 'green' : theme.colors.border),
            borderWidth: (isFocused ? 3 : 2),
            padding: 10,
            backgroundColor: 'white',

            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
        },
        texto: {
            color: theme.colors.text,
        },
        textoErr: {
            color: theme.colors.primary,
        },
    });


    function onChange(event: any, selectedDate: Date | undefined) {
        const currentDate = selectedDate || date;
        setShow(false);
        setDate(currentDate);
        if (currentDate) { props.setDate(currentDate); }
    }

    return (
        <View style={styles.input}>
            <TouchableOpacity
                style={styles.touchable}
                onPress={() => setShow(true)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
            >
                <Image
                    style={styles.image}
                    source={require('../../../assets/images/cadastro/birthday.png')}
                />
                <Text style={styles.texto}>{date ? (
                    date.toLocaleDateString()
                ) : 'Nascimento'}
                </Text>
            </TouchableOpacity>
            {erroMsg && <Text style={styles.textoErr}>{erroMsg}</Text>}
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date ? date : new Date()}
                    mode="date"
                    is24Hour={true}
                    onChange={onChange}
                    maximumDate={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate())}
                />
            )}
        </View>
    );
}
