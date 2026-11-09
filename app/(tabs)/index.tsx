import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    FlatList,
    Alert,
    ImageBackground,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { animes } from '../../data/animes';

import AnimeCard from '../../components/animeCard';

export default function Animes() {

    const [removidos, setRemovidos] = useState([])

    const [busca, setBusca] = useState("")

    const router = useRouter()

    let listaExibida = []
    for (let i = 0; i < animes.length; i++) {
        let removido = false
        for (let j = 0; j < removidos.length; j++) {
            if (animes[i].id === removidos[j]) {
                removido = true
                break
            }
        }
        if (!removido) {
            listaExibida.push(animes[i])
        }
    }

    function buscarAnime(){
        if (!busca) return

        let resultadoBusca = null
        for (let i = 0; i < animes.length; i++) {
            if (animes[i].nome.toLowerCase() === busca.toLowerCase()) {
                resultadoBusca = animes[i]
                break
            }
        }

        if (resultadoBusca) {
            Alert.alert('Anime encontrado', resultadoBusca.nome + ' - ' + resultadoBusca.categoria)
        } else {
            Alert.alert('Anime não encontrado')
        }
    }

    function removerAnime(id){
        let novoArray = removidos.slice()
        novoArray.push(id)
        setRemovidos(novoArray)
    }

    return (
        <View style={styles.container}>

            {}
            <ImageBackground
                source={require('../../assets/imagens/an7.jpg')}
                resizeMode="cover"
                style={styles.cabecalho}
            >
                <View style={styles.cabecalhoFundo}>
                    <Text style={styles.cabecalhoTitulo}>
                        Crunchyroll
                    </Text>
                    <Text style={styles.cabecalhoSubtitulo}>
                        Animes para transformar seu dia.
                    </Text>
                </View>
            </ImageBackground>

            {}
            <View style={styles.linhaBusca}>
                <TextInput
                    placeholder="Nome do anime"
                    placeholderTextColor="#A0A0AB"
                    style={styles.input}
                    value={busca}
                    onChangeText={setBusca}
                />
                <TouchableOpacity style={styles.btn} onPress={buscarAnime}>
                    <Text style={styles.btnTexto}>
                        Buscar
                    </Text>
                </TouchableOpacity>
            </View>

            {}
            <FlatList
                data={listaExibida}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AnimeCard
                        anime={item}
                        onVerDetalhes={() => router.navigate('/anime/' + item.id)}
                        onRemover={() => removerAnime(item.id)}
                    />
                )}
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

        backgroundColor: '#16161D',
    },

    cabecalho: {
        width: '100%',
        height: 150,
    },

    cabecalhoFundo: {
        flex: 1,
        alignSelf: 'stretch',

        backgroundColor: 'rgba(0, 0, 0, 0.60)',

        justifyContent: 'center',
        alignItems: 'center',
    },

    cabecalhoTitulo: {
        fontSize: 28,
        fontWeight: 'bold',

        color: '#F47521',
    },

    cabecalhoSubtitulo: {
        fontSize: 14,

        color: '#FFFFFF',

        marginTop: 4,

        textAlign: 'center',
    },

    linhaBusca: {
        flexDirection: 'row',
        alignItems: 'center',

        paddingHorizontal: 10,
        paddingTop: 10,

        marginBottom: 10,
    },

    input: {
        flex: 1,

        borderWidth: 1,
        borderColor: '#3A3A45',
        borderRadius: 5,

        backgroundColor: '#1F1F29',

        padding: 8,
        marginRight: 5,

        color: '#FFFFFF',
    },

    btn: {
        backgroundColor: '#F47521',
        padding: 10,
        borderRadius: 8,
    },

    btnTexto: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 14,
    },
})
