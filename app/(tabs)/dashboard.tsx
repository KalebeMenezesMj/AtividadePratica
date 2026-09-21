import { StyleSheet,Text,TouchableOpacity,View} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function Dashboard() {
    const { user } = useLocalSearchParams()
    const router = useRouter()

    return(
        <View style={styles.container}>           
            <Text>Bem-vindo(a) {user}</Text>

            <TouchableOpacity 
                style={styles.btn}
                onPress={()=>router.navigate('../drawer/produtos')}
            >
                <Text style={styles.btnTexto}>Ver produtos</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        alignItems: 'center',    
        paddingTop: 50,      
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

})
