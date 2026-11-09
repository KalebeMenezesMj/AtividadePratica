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

import * as ImagePicker from 'expo-image-picker';

import { animes } from '../../data/animes';

export default function NovoAnime() {

    const [nome, setNome] = useState("")
    const [categoria, setCategoria] = useState("")
    const [episodios, setEpisodios] = useState("")
    const [descricao, setDescricao] = useState("")

    const [imagem, setImagem] = useState(null)

    const router = useRouter()

    let imagemPadrao = require('../../assets/imagens/logo.png')

    async function escolherImagem(){
        let permissao = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (!permissao.granted) {
            Alert.alert('Precisamos da permissão para acessar suas fotos')
            return
        }

        let resultado = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [3, 4],
            quality: 1,
        })

        if (!resultado.canceled) {
            setImagem({ uri: resultado.assets[0].uri })
        }
    }

    function adicionarAnime(){
        if (!nome || !categoria || !episodios || !descricao) {
            Alert.alert('Preencha todos os campos')
            return
        }

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

        let imagemFinal = imagem || imagemPadrao

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

                {}
                {
                    imagem ?
                    <Image source={imagem} style={styles.preview} />
                    :
                    null
                }

                {}
                <TouchableOpacity style={styles.btnImagem} onPress={escolherImagem}>
                    <Text style={styles.btnTexto}>
                        Anexar imagem da galeria
                    </Text>
                </TouchableOpacity>

                {}
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

                {}
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
