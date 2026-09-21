import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

// importa o array de favoritos (preenchido na tela de detalhes) e o card reutilizável
import { favoritos } from '../../data/animes';
import AnimeCard from '../../components/animeCard';

// Aba de favoritos: lista os animes marcados com o coração na tela de detalhes
export default function Favoritos() {

    // ids removidos da exibição (o array original continua intacto)
    const [removidos, setRemovidos] = useState([])

    const router = useRouter()

    // monta a lista exibida: percorre os favoritos e ignora os ids removidos
    let listaExibida = []
    for (let i = 0; i < favoritos.length; i++) {
        let removido = false
        for (let j = 0; j < removidos.length; j++) {
            if (favoritos[i].id === removidos[j]) {
                removido = true
                break
            }
        }
        if (!removido) {
            listaExibida.push(favoritos[i])
        }
    }

    // tira o anime da lista de favoritos (slice cria cópia, push adiciona o id)
    function removerFavorito(id){
        let novoArray = removidos.slice() // cópia para manter a imutabilidade do state
        novoArray.push(id)
        setRemovidos(novoArray)
    }

    // enquanto não houver favoritos, mostra o aviso em vez da lista vazia
    if (listaExibida.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Favoritos</Text>
                <Text style={styles.vazio}>
                    Nenhum anime favoritado ainda. Toque no coração na tela de detalhes!
                </Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>

            <Text style={styles.titulo}>
                Favoritos ({listaExibida.length})
            </Text>

            {/* lista de favoritos usando FlatList com o mesmo card do catálogo */}
            <FlatList
                data={listaExibida}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <AnimeCard
                        anime={item}
                        onVerDetalhes={() => router.navigate('/anime/' + item.id)}
                        onRemover={() => removerFavorito(item.id)}
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

        paddingHorizontal: 10,
        paddingTop: 15,
    },

    titulo: {
        fontSize: 22,
        fontWeight: 'bold',

        color: '#FFFFFF',

        marginBottom: 10,
    },

    vazio: {
        color: '#A0A0AB',

        textAlign: 'center',

        marginTop: 20,
    },
})
