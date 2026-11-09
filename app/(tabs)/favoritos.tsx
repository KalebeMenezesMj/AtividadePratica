import {
    StyleSheet,
    Text,
    View,
    FlatList,
} from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

import { favoritos } from '../../data/animes';
import AnimeCard from '../../components/animeCard';

export default function Favoritos() {

    const [removidos, setRemovidos] = useState([])

    const router = useRouter()

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

    function removerFavorito(id){
        let novoArray = removidos.slice() 
        novoArray.push(id)
        setRemovidos(novoArray)
    }

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

            {}
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
