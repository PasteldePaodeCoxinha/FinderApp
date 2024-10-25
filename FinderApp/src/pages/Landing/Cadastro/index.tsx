import { useState } from "react";
import EmailSenha from "./EmailSenha";
import Basico from "./Basico";
import GostosInteresses from "./GostosInteresses";
import Bio from "./Bio";
import { Alert } from "react-native";

interface Props {
    navigation: any;
};

export default function Cadastro({ navigation }: Props) {
    const [usuarioId, setUsuarioId] = useState<number>(0);
    const [imagem, setImagem] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    const [nascimento, setNascimento] = useState<Date>(new Date());
    const [profissao, setProfissao] = useState<string>("");
    const [escolaridade, setEscolaridade] = useState<string>("");
    const [gostosSelecionados, setGostosSelecionados] = useState<Array<{ nome: string, id: number }>>([]);
    const [interessesSelecionados, setInteressesSelecionados] = useState<Array<{ nome: string, id: number }>>([]);
    const [descricao, setDescricao] = useState<string>("");
    const [etapa, setEtapa] = useState<string>("EmailSenha");

    function formatDate(date: Date): string {
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, "0");
        const dia = String(date.getDate()).padStart(2, "0");

        return `${ano}-${mes}-${dia}`;
    }

    async function cadastrar() {
        const response = await fetch("https://finder-app-back.vercel.app/usuario/cadastro", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "nome": nome,
                "email": email,
                "senha": senha,
                "datanascimento": formatDate(nascimento),
                "profissao": profissao,
                "escolaridade": escolaridade,
                "descricao": "",
                "imgperfil": imagem
            })
        });

        const data = await response.json();
        if (response.ok) {
            setUsuarioId(data.id);
            setEtapa("GostosInteresses");
        } else {
            Alert.alert("Falha ao cadastrar:", data.msg);
        }
    }

    async function atualizarGostosInteresses() {
        const response = await fetch("https://finder-app-back.vercel.app/usuario/associarInteGos", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "usuario": usuarioId,
                "gostos": gostosSelecionados.map((g) => g.nome),
                "interesses": interessesSelecionados.map((i) => i.nome)
            })
        });

        const data = await response.json();
        if (response.ok) {
            setEtapa("CadastroBio");
        } else {
            Alert.alert("Falha cadastrando usuário:", data.msg);
        }
    }

    async function atualizarBio() {
        const response = await fetch("https://finder-app-back.vercel.app/usuario/editar", {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "id": usuarioId,
                "descricao": descricao
            })
        });

        const data = await response.json();
        if (response.ok) {
            navigation.navigate("List");
        } else {
            Alert.alert("Falha cadastrando usuário:", data.msg);
        }
    }

    function proximaEtapa() {
        switch (etapa) {
            case "EmailSenha":
                setEtapa("CadastroBasico");
                break;
            case "CadastroBasico":
                cadastrar();
                break;
            case "GostosInteresses":
                atualizarGostosInteresses();
                break;
            case "CadastroBio":
                atualizarBio();
                break;
        }
    }

    function etapaAtual() {
        switch (etapa) {
            case "EmailSenha":
                return (
                    <EmailSenha
                        propSetEmail={setEmail}
                        propSetSenha={setSenha}
                        continuar={proximaEtapa}
                    />
                );
            case "CadastroBasico":
                return (
                    <Basico
                        propSetImg={setImagem}
                        propSetNome={setNome}
                        propSetNascimento={setNascimento}
                        propSetProfissao={setProfissao}
                        propSetEscolaridade={setEscolaridade}
                        continuar={proximaEtapa}
                    />
                );
            case "GostosInteresses":
                return (
                    <GostosInteresses
                        propsSetGostosSelecionados={setGostosSelecionados}
                        propsSetInteressesSelecionados={setInteressesSelecionados}
                        continuar={proximaEtapa}
                    />
                );
            case "CadastroBio":
                return (
                    <Bio
                        propsSetDescricao={setDescricao}
                        continuar={proximaEtapa}
                    />
                );
        }
    }

    return (
        etapaAtual()
    );
}