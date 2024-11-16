import { useState } from "react";
import { Alert } from "react-native";
import EmailSenha from "./EmailSenha";
import Basico from "./Basico";
import Endereco from "./Endereco";
import GostosInteresses from "./GostosInteresses";
import Bio from "./Bio";

interface Props {
    navigation: any;
}

export default function Cadastro({ navigation }: Props) {
    const [usuarioId, setUsuarioId] = useState<number>(0);
    // Email e senha
    const [email, setEmail] = useState<string>("");
    const [senha, setSenha] = useState<string>("");
    // Cadastro básico
    const [imagem, setImagem] = useState<string>("");
    const [nome, setNome] = useState<string>("");
    const [nascimento, setNascimento] = useState<Date>(new Date());
    const [profissao, setProfissao] = useState<string>("");
    const [escolaridade, setEscolaridade] = useState<string>("");
    // Endereço
    const [numCasa, setNumCasa] = useState<number>(0);
    const [rua, setRua] = useState<string>("");
    const [bairro, setBairro] = useState<string>("");
    const [cidade, setCidade] = useState<string>("");
    const [estado, setEstado] = useState<string>("");
    const [regiao, setRegiao] = useState<string>("");
    const [cep, setCep] = useState<string>("");
    // Gostos e interesses
    const [gostosSelecionados, setGostosSelecionados] = useState<Array<{ nome: string, id: number }>>([]);
    const [interessesSelecionados, setInteressesSelecionados] = useState<Array<{ nome: string, id: number }>>([]);
    // Bio
    const [descricao, setDescricao] = useState<string>("");
    const [etapa, setEtapa] = useState<string>("EmailSenha");

    function formatDate(date: Date): string {
        const ano = date.getFullYear();
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const dia = String(date.getDate()).padStart(2, '0');

        return `${ano}-${mes}-${dia}`;
    }

    async function CoordEndereco() {
        const response = await fetch(`https://geocode.maps.co/search?q=${rua}&api_key=672e1c4343173104936362wko0de6b0`);

        const data = await response.json();
        if (response.ok) {
            if (data.length > 0) {
                return {
                    lat: data[0].lat,
                    lon: data[0].lon
                };
            }
        } else {
            Alert.alert("Endereço não encontrado:", data.msg);
        }
        return {
            lat: 0,
            lon: 0
        }
    }

    async function cadastrar() {
        const response = await fetch('https://finder-app-back.vercel.app/usuario/cadastro', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'nome': nome,
                'email': email,
                'senha': senha,
                'datanascimento': formatDate(nascimento),
                'profissao': profissao,
                'escolaridade': escolaridade,
                'descricao': '',
                'imgperfil': imagem,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            setUsuarioId(data.id);
            setEtapa("CadastroEndereco");
        } else {
            Alert.alert('Falha ao cadastrar:', data.msg);
        }
    }

    async function cadastrarEndereco() {
        // Buscar as coordenadas do endereço
        const coords = await CoordEndereco();
        if (coords == undefined) return;

        const response = await fetch("https://finder-app-back.vercel.app/localizacao/cadastrar", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "numero_casa": numCasa,
                "rua": rua,
                "bairro": bairro,
                "cidade": cidade,
                "estado": estado,
                "regiao": regiao,
                "cep": cep,
                "longi": coords.lon,
                "lati": coords.lat,
                "usuario_id": usuarioId
            })
        });

        const data = await response.json();
        if (response.ok) {
            setEtapa("GostosInteresses");
        } else {
            Alert.alert("Falha ao cadastrar endereço:", data.msg);
        }
    }

    async function atualizarGostosInteresses() {
        const response = await fetch('https://finder-app-back.vercel.app/usuario/associarInteGos', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'usuario': usuarioId,
                'gostos': gostosSelecionados.map((g) => g.nome),
                'interesses': interessesSelecionados.map((i) => i.nome),
            }),
        });

        const data = await response.json();
        if (response.ok) {
            setEtapa('CadastroBio');
        } else {
            Alert.alert('Falha cadastrando usuário:', data.msg);
        }
    }

    async function atualizarBio() {
        const response = await fetch('https://finder-app-back.vercel.app/usuario/editar', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'id': usuarioId,
                'descricao': descricao,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            navigation.navigate('List');
        } else {
            Alert.alert('Falha cadastrando usuário:', data.msg);
        }
    }

    function proximaEtapa() {
        switch (etapa) {
            case 'EmailSenha':
                setEtapa('CadastroBasico');
                break;
            case 'CadastroBasico':
                cadastrar();
                break;
            case "CadastroEndereco":
                cadastrarEndereco();
                break;
            case "GostosInteresses":
                atualizarGostosInteresses();
                break;
            case 'CadastroBio':
                atualizarBio();
                break;
        }
    }

    function etapaAtual() {
        switch (etapa) {
            case 'EmailSenha':
                return (
                    <EmailSenha
                        propSetEmail={setEmail}
                        propSetSenha={setSenha}
                        continuar={proximaEtapa}
                    />
                );
            case 'CadastroBasico':
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
            case "CadastroEndereco":
                return (
                    <Endereco
                        propSetNumCasa={setNumCasa}
                        propSetRua={setRua}
                        propSetBairro={setBairro}
                        propSetCidade={setCidade}
                        propSetEstado={setEstado}
                        propSetRegiao={setRegiao}
                        propSetCep={setCep}
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
            case 'CadastroBio':
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
