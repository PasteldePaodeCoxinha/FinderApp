import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Basico from "./Basico";
import GostosInteresses from "./GostosInteresses";
import Bio from "./Bio";

interface Props {
    navigation: any;
};

const Stack = createNativeStackNavigator();

export default function Cadastro({ navigation }: Props) {
    return (
        <NavigationContainer
            independent={true}
        >
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
        </NavigationContainer>
    );
}