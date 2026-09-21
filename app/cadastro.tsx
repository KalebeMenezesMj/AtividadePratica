import {
    StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';

export default function Cadastro() {

    const [nome, setNome]  = useState("")
    const [email, setEmail]  = useState("")
    const [senha, setSenha]  = useState("")

    const router = useRouter()

    function cadastrar(){
        router.navigate({pathname:'/login', params:{'user':nome}})
    }

    return(
        <View style={styles.container}>           
            <TextInput  
                placeholder="nome completo" 
                style={styles.input} 
                value={nome}
                onChangeText={setNome}
            />            
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
            <TouchableOpacity style={styles.btn} onPress={cadastrar}>
                <Text style={styles.btnTexto}>
                    Cadastrar
                </Text>
            </TouchableOpacity>

            <Text>{nome}</Text>
            <Text>{email}</Text>
            <Text>{senha}</Text>

            <Text>Já tem cadastro? {' '} 
                <Link href="/login"  style={styles.link}>
                    Fazer login
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
