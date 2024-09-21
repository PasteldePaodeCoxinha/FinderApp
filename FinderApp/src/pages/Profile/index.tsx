import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileBase from "./ProfileBase";

const Stack = createNativeStackNavigator();

export default function Profile() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="ProfileBase"
                component={ProfileBase}
                options={{ headerShown: false }}
            />
            {/* <Stack.Screen
                name="CadastroGostosInteresses"
                component={GostosInteresses}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CadastroBio"
                component={Bio}
                options={{ headerShown: false }}
            /> */}
        </Stack.Navigator>
    );
}