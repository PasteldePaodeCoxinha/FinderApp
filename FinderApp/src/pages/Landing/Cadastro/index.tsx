import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Basico from "./Basico";
import GostosInteresses from "./GostosInteresses";
import Bio from "./Bio";

const Stack = createNativeStackNavigator();

export default function Cadastro() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CadastroBasico"
                component={Basico}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CadastroGostosInteresses"
                component={GostosInteresses}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="CadastroBio"
                component={Bio}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}