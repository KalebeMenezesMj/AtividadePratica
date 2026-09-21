import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
} from 'react-native';

// Componente reutilizável que representa um anime da lista
// Recebe por props o objeto do anime e as funções de clique (ver detalhes e remover),
// quem usa o componente decide o que acontece em cada botão
export default function AnimeCard(props) {
    return (
        <View style={styles.card}>

            {/* Capa do anime em largura total, igual ao card de receita do exemplo */}
            <Image
                source={props.anime.imagem}
                style={styles.imagem}
            />

            <View style={styles.info}>

                <Text style={styles.nome}>
                    {props.anime.nome}
                </Text>

                <Text style={styles.linha}>
                    {props.anime.categoria} - {props.anime.episodios} episódios
                </Text>

                {/* descricao curta, limitada em 2 linhas para o card não ficar gigante */}
                <Text style={styles.descricao} numberOfLines={2}>
                    {props.anime.descricao}
                </Text>

                {/* Botão que abre a tela de detalhes passando o id pela rota */}
                <TouchableOpacity
                    style={styles.btn}
                    onPress={props.onVerDetalhes}
                >
                    <Text style={styles.btnTexto}>
                        Ver anime
                    </Text>
                </TouchableOpacity>

                {/* Botão que remove o anime da lista */}
                <TouchableOpacity
                    style={styles.btnRemover}
                    onPress={props.onRemover}
                >
                    <Text style={styles.btnTexto}>
                        Remover
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    // Paleta (Crunchyroll):
    // Laranja:      #F47521
    // Fundo escuro: #16161D
    // Card:         #1F1F29
    // Cinza:        #A0A0AB
    // Branco:       #FFFFFF

    card: {
        backgroundColor: '#1F1F29',
        borderRadius: 15,

        overflow: 'hidden',

        marginVertical: 8,

        elevation: 5,

        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },

    imagem: {
        width: '100%',
        height: 180,

        resizeMode: 'cover',
    },

    info: {
        padding: 12,
    },

    nome: {
        fontSize: 17,
        fontWeight: 'bold',

        color: '#FFFFFF',
    },

    linha: {
        fontSize: 13,

        color: '#F47521',

        marginTop: 2,
    },

    descricao: {
        fontSize: 13,

        color: '#A0A0AB',

        marginTop: 6,
    },

    btn: {
        backgroundColor: '#F47521',

        padding: 10,
        marginTop: 10,

        borderRadius: 8,
    },

    btnRemover: {
        backgroundColor: '#7F1D1D',

        padding: 10,
        marginTop: 6,

        borderRadius: 8,
    },

    btnTexto: {
        color: '#FFFFFF',

        textAlign: 'center',

        fontWeight: 'bold',

        fontSize: 14,
    },
});
