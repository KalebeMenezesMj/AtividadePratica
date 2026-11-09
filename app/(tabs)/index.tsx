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

// importa o array de objetos com os animes (nossa "base" em tempo de execução)
import { animes } from '../../data/animes';

// importa o componente reutilizável do card de anime
import AnimeCard from '../../components/animeCard';

// Tela inicial: lista os animes do catálogo com FlatList, com cabeçalho de imagem
// igual à tela de receitas do exemplo, além de busca por nome e remoção de itens
export default function Animes() {

    // ids dos animes removidos (o array original continua intacto, só a exibição filtra)
    const [removidos, setRemovidos] = useState([])

    // campo de busca controlado pelo useState
    const [busca, setBusca] = useState("")

    const router = useRouter()

    // monta a lista exibida: percorre o array de animes e ignora os ids removidos
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

    // busca por nome comparando em minúsculas, como visto no conteúdo de arrays de objetos
    function buscarAnime(){
        if (!busca) return // evita buscar com o campo vazio

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

    // remove o anime da exibição guardando o id no state (slice cria cópia, push adiciona)
    function removerAnime(id){
        let novoArray = removidos.slice() // cópia do array para manter a imutabilidade do state
        novoArray.push(id)
        setRemovidos(novoArray)
    }

    return (
        <View style={styles.container}>

            {/* Cabeçalho com imagem de fundo e camada escura, como na tela de receitas do exemplo */}
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

            {/* linha com o campo de busca e o botão */}
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

            {/* lista de animes usando FlatList */}
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

    // Camada transparente sobre a imagem, escurecendo para o texto aparecer bem
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
