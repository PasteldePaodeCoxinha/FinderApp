import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Basico from "./Basico";
import GostosInteresses from "./GostosInteresses";
import Bio from "./Bio";
import { useState } from "react";
import EmailSenha from "./EmailSenha";

const Stack = createNativeStackNavigator();

export default function Cadastro() {
    const [nome, setNome] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [senha, setSenha] = useState<string>();
    const [nascimento, setNascimento] = useState<string>();
    const [profissao, setProfissao] = useState<string>();
    const [escolaridade, setEscolaridade] = useState<string>();
    const [descricao, setDescricao] = useState<string>();

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="CadastroEmailSenha"
                component={EmailSenha}
                options={{ headerShown: false }}
                initialParams={{
                    propSetEmail: setEmail,
                    propSetSenha: setSenha
                }}
            />
            <Stack.Screen
                name="CadastroBasico"
                component={Basico}
                options={{ headerShown: false }}
                initialParams={{
                    propSetNome: setNome,
                    propSetNascimento: setNascimento,
                    propSetProfissao: setProfissao,
                    propSetEscolaridade: setEscolaridade
                }}
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