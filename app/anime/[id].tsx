import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

// importa o array de animes para procurar o item recebido por parâmetro
// e o array de favoritos, que guarda os animes marcados na tela de detalhes
import { animes, favoritos } from '../../data/animes';

// Tela de detalhes: a rota é /anime/[id], então o id do anime chega pela URL (ex.: /anime/1)
export default function Anime() {

    // id do anime enviado pela navegação na hora do clique no card
    const { id } = useLocalSearchParams()

    // percorre o array de objetos procurando o anime com o id recebido
    let anime = null
    for (let i = 0; i < animes.length; i++) {
        if (animes[i].id === id) {
            anime = animes[i]
            break
        }
    }

    // evento de clique do botão de favoritos: guarda o anime no array em tempo de execução
    function favoritar(){
        // percorre os favoritos para não salvar o mesmo anime duas vezes
        let existe = false
        for (let i = 0; i < favoritos.length; i++) {
            if (favoritos[i].id === anime.id) {
                existe = true
                break
            }
        }

        if (existe) {
            Alert.alert('Favoritos', anime.nome + ' já está nos seus favoritos!')
        } else {
            favoritos.push(anime)
            Alert.alert('Favoritos', anime.nome + ' foi adicionado aos seus favoritos!')
        }
    }

    // caso o id não exista no array, mostra o aviso em vez de quebrar a tela
    if (!anime) {
        return (
            <View style={styles.container}>
                <Text style={styles.nome}>Anime não encontrado</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.fundo}>

            {/* capa do anime em tamanho grande, igual à tela de receitas do exemplo */}
            <Image
                source={anime.imagem}
                style={styles.imagem}
            />

            <View style={styles.container}>

                <Text style={styles.nome}>
                    {anime.nome}
                </Text>

                <Text style={styles.info}>
                    {anime.categoria} - {anime.episodios} episódios - {anime.ano}
                </Text>

                {/* seção com os principais dados do anime, como a lista de ingredientes do exemplo */}
                <Text style={styles.sessao}>
                    Informações
                </Text>

                <Text style={styles.item}>
                    • Categoria: {anime.categoria}
                </Text>
                <Text style={styles.item}>
                    • Episódios: {anime.episodios}
                </Text>
                <Text style={styles.item}>
                    • Ano: {anime.ano}
                </Text>
                <Text style={styles.item}>
                    • Estúdio: {anime.estudio}
                </Text>

                {/* sinopse completa do anime */}
                <Text style={styles.sessao}>
                    Sinopse
                </Text>

                <Text style={styles.sinopse}>
                    {anime.sinopse}
                </Text>

                {/* botão de favoritar com o coração, como o exemplo */}
                <TouchableOpacity style={styles.btn} onPress={favoritar}>
                    <AntDesign name="heart" size={18} color="#FFFFFF" />
                    <Text style={styles.btnTexto}>
                        Adicionar aos favoritos
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

        padding: 15,
    },

    imagem: {
        width: '100%',
        height: 300,

        resizeMode: 'cover',
    },

    nome: {
        fontSize: 24,
        fontWeight: 'bold',

        color: '#FFFFFF',

        marginTop: 10,

        textAlign: 'center',
    },

    info: {
        fontSize: 14,

        color: '#F47521',

        marginTop: 4,
    },

    sessao: {
        fontSize: 18,
        fontWeight: 'bold',

        color: '#FFFFFF',

        marginTop: 15,
        marginBottom: 5,

        alignSelf: 'flex-start',
    },

    item: {
        fontSize: 14,

        color: '#A0A0AB',

        alignSelf: 'flex-start',
    },

    sinopse: {
        fontSize: 14,

        color: '#A0A0AB',

        textAlign: 'justify',

        alignSelf: 'flex-start',
    },

    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#2196F3',

        padding: 12,

        marginVertical: 20,
        borderRadius: 8,

        width: '100%',
    },

    btnTexto: {
        color: '#FFFFFF',

        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,

        marginLeft: 8,
    },
})
