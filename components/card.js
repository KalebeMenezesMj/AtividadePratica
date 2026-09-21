import { useRouter } from 'expo-router';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Button,
    TouchableOpacity,
    Alert,
    ScrollView,
} from 'react-native';

export default function Card() {

    const router = useRouter()

    return (
        <View style={styles.card}>

            {/* Imagens do produto */}
            <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                style={styles.imagensContainer}
            >
                <View style={styles.imagemContainer}>
                    <Image
                        source={{
                            uri: 'https://eshop-api.avell.com.br/storage/resize/contain/_x500/5/catalog/productMedia/69443b8cdae6b6026/69494b1aaa6a14346.webp',
                        }}
                        style={styles.imagem}
                    />
                </View>

                <View style={styles.imagemContainer}>
                    <Image
                        source={{
                            uri: 'https://pngimg.com/uploads/iphone_14/iphone_14_PNG41.png',
                        }}
                        style={styles.imagem}
                    />
                </View>
            </ScrollView>

            <Text style={styles.txtCard}>
                Ofertas Especiais!
            </Text>

            {/* Button nativo */}
            <View style={styles.buttonContainer}>
                <Button
                    title="Comprar agora"
                    color="#16A34A"
                    onPress={() => router.navigate('/login')}
                />
            </View>

            {/* Botão personalizado */}
            <TouchableOpacity
                style={styles.btn}
                onPress={() =>
                    Alert.alert(
                        'Detalhes',
                        'Confira todos os detalhes deste produto.'
                    )
                }
            >
                <Text style={styles.btnTexto}>
                    Ver detalhes
                </Text>
            </TouchableOpacity>

        </View>
    );
}

const styles = StyleSheet.create({

    // Paleta:
    // Azul escuro: #0F172A
    // Azul:        #2563EB
    // Verde:       #16A34A
    // Fundo:       #F8FAFC
    // Cinza:       #E2E8F0
    // Branco:      #FFFFFF

    card: {
        width: '90%',
        alignSelf: 'center',

        backgroundColor: '#FFFFFF',
        borderRadius: 15,

        overflow: 'hidden',

        marginVertical: 20,

        elevation: 5,

        shadowColor: '#0F172A',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },

    imagensContainer: {
        width: '100%',
        height: 200,
    },

    imagemContainer: {
        width: 320,
        height: 200,

        justifyContent: 'center',
        alignItems: 'center',

        backgroundColor: '#F8FAFC',
    },

    imagem: {
        width: '100%',
        height: '100%',

        resizeMode: 'contain',
    },

    txtCard: {
        fontSize: 24,
        fontWeight: 'bold',

        color: 'black',

        marginVertical: 15,

        textAlign: 'center',
    },

    buttonContainer: {
        marginHorizontal: 20,
        marginVertical: 5,

        borderRadius: 8,
        overflow: 'hidden',
    },

    btn: {
        backgroundColor: '#720a0a',

        padding: 7,

        marginHorizontal: 20,
        marginVertical: 5,
        marginBottom: 20,

        borderRadius: 8,
    },

    btnTexto: {
        color: '#FFFFFF',

        textAlign: 'center',

        fontWeight: 'bold',

        fontSize: 16,
    },
});
