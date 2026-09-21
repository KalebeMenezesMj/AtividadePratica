import {
    StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Link, useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Login() {

    const { user } = useLocalSearchParams()
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const router = useRouter()

    function entrar(){
        if(email==="admin@email.com" && senha==="123456"){
            router.navigate({pathname:'/dashboard', params:{'user':user}})
        }
    }

    return(
        <View style={styles.container}>
            {   
                user ? 
                <Text>Cadastro realizado com sucesso {user}</Text>  
                : 
                ""
            }
            <TextInput  
                placeholder="email@email.com" 
                style={styles.input} 
                keyboardType='email-address'
                value={email}
                onChangeText={setEmail}
            />
            <TextInput  
                placeholder="senha" 
                style={styles.input} 
                secureTextEntry
                keyboardType='numeric'
                value={senha}
                onChangeText={setSenha}
            />
            <TouchableOpacity style={styles.btn} onPress={entrar}>
                <Text style={styles.btnTexto}>
                    Entrar
                </Text>
            </TouchableOpacity>

            <Text>Não tem login?  {' '}  
                <Link href="/cadastro" style={styles.link}>
                    Cadastre-se
                </Link>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        alignItems: 'center',    
        paddingTop: 50,      
    },
    link:{
        color: 'blue',
        fontWeight: 'bold',
    },
    input:{
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        marginVertical: 10,
        width: '90%',
    },
    btn: {
        backgroundColor: '#720a0a',
        padding: 7,
        marginHorizontal: 20,
        marginVertical: 5,
        marginBottom: 20,
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
