import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import useTheme from '../hooks/UseTheme';

export default function LandingIntroducao() {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        introducao: {
            margin: 'auto',
        },
        introducaoDiv: {
            display: 'flex',
            flexDirection: 'row',
            alignContent: 'center',
            alignItems: 'center',
            gap: 10,
        },
        introducaoTexto: {
            fontSize: 18,
            color: theme.colors.text,
        },
        image: {
            width: 35,
            height: 35,
        },
    });

    return (
        <View style={styles.introducao}>
            <View style={styles.introducaoDiv}>
                <Image
                    source={require('../../assets/images/introducao/handshake.png')}
                    style={styles.image}
                />
                <Text style={styles.introducaoTexto}>Conheça novas pessoas</Text>
            </View>
            <View style={styles.introducaoDiv}>
                <Image
                    source={require('../../assets/images/introducao/peace.png')}
                    style={styles.image}
                />
                <Text style={styles.introducaoTexto}>Mantenha o respeito</Text>
            </View>
            <View style={styles.introducaoDiv}>
                <Image
                    source={require('../../assets/images/introducao/heart.png')}
                    style={styles.image}
                />
                <Text style={styles.introducaoTexto}>Encontre seu amor</Text>
            </View>
            <View style={styles.introducaoDiv}>
                <Image
                    source={require('../../assets/images/introducao/confetti.png')}
                    style={styles.image}
                />
                <Text style={styles.introducaoTexto}>Divirta-se</Text>
            </View>
        </View>
    );
}
