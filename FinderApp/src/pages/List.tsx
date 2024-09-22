import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet, View, Text, Alert, Animated, PanResponder } from 'react-native';
// import { GestureDetector, Gesture } from 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Nav from "../components/Nav";
import useTheme from "../hooks/UseTheme";
import { useRef } from "react";

interface Props {
    navigation: any;
};

const Stack = createNativeStackNavigator();

export default function List({ navigation }: Props) {
    const { theme } = useTheme();

    const styles = StyleSheet.create({
        pagina: {
            display: "flex",
            justifyContent: "space-between",
            height: "100%",
            backgroundColor: theme.colors.background
        },
        lista: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
    });

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return Math.abs(gestureState.dx) > 20;
            },
            onPanResponderEnd: (evt, gestureState) => {
                if (gestureState.dx > 50) {
                    console.log('Swiped Right');
                } else if (gestureState.dx < -50) {
                    console.log('Swiped Left');
                }
            },
        })
    ).current;

    return (
        <View style={styles.pagina}>

            <View style={styles.lista}>
                <View {...panResponder.panHandlers}></View>
            </View>

            <Nav
                navigation={navigation}
            ></Nav>
        </View>
    )
}