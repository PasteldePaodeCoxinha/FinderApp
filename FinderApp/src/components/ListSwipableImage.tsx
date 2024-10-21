import { ImageBackground, Animated, StyleSheet, Text, View, Dimensions } from "react-native";
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent, State } from "react-native-gesture-handler";
import useTheme from "../hooks/UseTheme";

const { width } = Dimensions.get("window");

interface Props {
    imageSource: any;
    desc: string;
    bio: string;
    onSwipe: (direction: "left" | "right") => void;
};

export default function ListSwipableImage(props: Props) {
    const { theme } = useTheme();

    const cardWidth = 350;
    const cardHeight = 700;

    const styles = StyleSheet.create({
        card: {
            width: cardWidth,
            height: cardHeight,
            justifyContent: "center",
            alignItems: "center",
        },
        backgroundImage: {
            width: cardWidth,
            height: cardHeight,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingVertical: 50,
            gap: 10,
            borderRadius: 15,
        },
        desc: {
            // color: theme.colors.text,
        },
        descText: {
            fontSize: 28,
            textAlign: "center",
            color: theme.colors.text,
            textShadowColor: "white",
            textShadowOffset: {
                width: 0,
                height: 0
            },
            textShadowRadius: 5,
        },
        bio: {
            backgroundColor: theme.colors.border,
            maxWidth: "90%",
            borderRadius: 15,
            padding: 10
        },
        bioText: {
            fontSize: 24,
            color: theme.colors.text,
        },
    });

    const translateX = new Animated.Value(0);
    const translateY = new Animated.Value(0);

    const onGestureEvent = Animated.event<PanGestureHandlerGestureEvent>(
        [{ nativeEvent: { translationX: translateX, translationY: translateY } }],
        { useNativeDriver: true }
    );

    const onHandlerStateChange = ({ nativeEvent }: { nativeEvent: { state: number; translationX: number } }) => {
        if (nativeEvent.state === State.END) {
            const threshold = width / 2;

            if (nativeEvent.translationX > threshold) {
                // Swiped right
                Animated.timing(translateX, {
                    toValue: width,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => props.onSwipe("right"));
            } else if (nativeEvent.translationX < -threshold) {
                // Swiped left
                Animated.timing(translateX, {
                    toValue: -width,
                    duration: 300,
                    useNativeDriver: true,
                }).start(() => props.onSwipe("left"));
            } else {
                // Reset position
                Animated.spring(translateX, {
                    toValue: 0,
                    friction: 5,
                    tension: 0,
                    useNativeDriver: true,
                }).start();
                Animated.spring(translateY, {
                    toValue: 0,
                    friction: 5,
                    tension: 0,
                    useNativeDriver: true,
                }).start();
            }
        }
    };

    return (
        <GestureHandlerRootView>
            <PanGestureHandler
                onGestureEvent={onGestureEvent}
                onHandlerStateChange={onHandlerStateChange}
            >
                <Animated.View
                    style={[
                        styles.card,
                        {
                            transform: [
                                { translateX },
                                { translateY },
                            ],
                        },
                    ]}
                >
                    <ImageBackground
                        style={styles.backgroundImage}
                        source={{ uri: props.imageSource }}
                    >
                        <View style={styles.desc}>
                            <Text style={styles.descText}>{props.desc}</Text>
                            <View style={styles.bio}>
                                <Text style={styles.bioText}>{props.bio}</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </Animated.View>
            </PanGestureHandler>
        </GestureHandlerRootView>
    );
}