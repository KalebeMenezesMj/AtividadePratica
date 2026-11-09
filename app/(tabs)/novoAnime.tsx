import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// pacote do Expo que abre a galeria para o usuário escolher uma imagem
import * as ImagePicker from 'expo-image-picker';

// importa o array de animes para adicionar o novo item direto nele (sem banco de dados)
import { animes } from '../../data/animes';

// Tela de cadastro: formulário controlado com useState que adiciona um novo anime no array
export default function NovoAnime() {

    // estados do formulário: cada campo tem o próprio estado
    const [nome, setNome] = useState("")
    const [categoria, setCategoria] = useState("")
    const [episodios, setEpisodios] = useState("")
    const [descricao, setDescricao] = useState("")

    // imagem anexada pelo usuário: guarda um objeto { uri } que o Image aceita como fonte
    const [imagem, setImagem] = useState(null)

    const router = useRouter()

    // animes cadastrados na hora sem imagem usam a logo como capa padrão
    let imagemPadrao = require('../../assets/imagens/logo.png')

    // abre a galeria do celular para o usuário anexar a capa do anime
    async function escolherImagem(){
        // pede permissão de acesso às fotos antes de abrir a galeria
        let permissao = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permissao.granted) {
            Alert.alert('Precisamos da permissão para acessar suas fotos')
            return
        }

        // abre a galeria só com imagens e deixa cortar a foto no formato de capa
        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })

        // se o usuário não cancelou, guarda a uri da imagem escolhida
        if (!resultado.canceled) {
            setImagem({ uri: resultado.assets[0].uri })
        }
    }

    // valida os campos, verifica duplicidade e adiciona o anime no array
    function adicionarAnime(){
        // nenhum campo pode ficar vazio
        if (!nome || !categoria || !episodios || !descricao) {
            Alert.alert('Preencha todos os campos')
            return
        }

        // percorre o array para verificar se o anime já existe (comparando em minúsculas)
        let existe = false
        for (let i = 0; i < animes.length; i++) {
            if (animes[i].nome.toLowerCase() === nome.toLowerCase()) {
                existe = true
                break
            }
        }
        if (existe) {
            Alert.alert('Este anime já está no catálogo')
            return
        }

        // usa a imagem anexada; se o usuário não anexou nenhuma, cai na logo padrão
        let imagemFinal = imagem || imagemPadrao

        // gera o novo id e adiciona o objeto no array em tempo de execução
        let novoId = (animes.length + 1).toString() // convertido para string, igual aos outros ids
        animes.push({
            id: novoId,
            nome: nome,
            categoria: categoria,
            episodios: episodios,
            ano: '2026',
            estudio: 'Desconhecido',
            descricao: descricao,
            sinopse: descricao,
            imagem: imagemFinal,
        })

        // limpa o formulário (inclusive a imagem anexada) e volta para a lista
        setNome("")
        setCategoria("")
        setEpisodios("")
        setDescricao("")
        setImagem(null)
        Alert.alert('Anime adicionado com sucesso!')
        router.navigate('/')
    }

    return (
        <ScrollView style={styles.fundo}>
            <View style={styles.container}>

                <Text style={styles.titulo}>
                    Novo anime
                </Text>

                {/* preview da capa anexada, exibido enquanto o usuário não cadastra */}
                {
                    imagem ?
                    <Image source={imagem} style={styles.preview} />
                    :
                    null
                }

                {/* botão que abre a galeria para anexar a capa */}
                <TouchableOpacity style={styles.btnImagem} onPress={escolherImagem}>
                    <Text style={styles.btnTexto}>
                        Anexar imagem da galeria
                    </Text>
                </TouchableOpacity>

                {/* cada TextInput é controlado pelo estado correspondente */}
                <TextInput
                    placeholder="Nome do anime"
                    placeholderTextColor="#A0A0AB"
                    style={styles.input}
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    placeholder="Categoria (ex.: Ação)"
                    placeholderTextColor="#A0A0AB"
                    style={styles.input}
                    value={categoria}
                    onChangeText={setCategoria}
                />
                <TextInput
                    placeholder="Quantidade de episódios"
                    placeholderTextColor="#A0A0AB"
                    style={styles.input}
                    keyboardType='numeric'
                    value={episodios}
                    onChangeText={setEpisodios}
                />
                <TextInput
                    placeholder="Descrição do anime"
                    placeholderTextColor="#A0A0AB"
                    style={[styles.input, styles.inputDescricao]}
                    multiline
                    value={descricao}
                    onChangeText={setDescricao}
                />

                {/* botão que dispara a função de adicionar */}
                <TouchableOpacity style={styles.btn} onPress={adicionarAnime}>
                    <Text style={styles.btnTexto}>
                        Cadastrar anime
                    </Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    fundo: {
        flex: 1,

        backgroundColor: '#16161D',
    },

    container: {
        alignItems: 'center',

        paddingHorizontal: 15,
        paddingTop: 15,
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',

        color: '#FFFFFF',

        marginBottom: 15,
    },

    preview: {
        width: '90%',
        height: 180,

        borderRadius: 10,

        resizeMode: 'cover',
    },

    btnImagem: {
        backgroundColor: '#7F1D1D',
        padding: 10,
        borderRadius: 8,

        marginVertical: 10,

        width: '90%',
    },

    input: {
        borderWidth: 1,
        borderColor: '#3A3A45',
        borderRadius: 5,

        backgroundColor: '#1F1F29',

        padding: 8,
        marginVertical: 8,

        width: '90%',

        color: '#FFFFFF',
    },

    inputDescricao: {
        height: 90,

        textAlignVertical: 'top',
    },

    btn: {
        backgroundColor: '#2196F3',
        padding: 7,

        marginVertical: 10,
        borderRadius: 8,

        width: '90%',
    },

    btnTexto: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
})
