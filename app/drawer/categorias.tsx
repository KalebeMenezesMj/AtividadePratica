import { StyleSheet,Text,View} from 'react-native';

export default function Categorias() {

    return(
        <View style={styles.container}>           
            <Text>Categorias</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,    
        alignItems: 'center',    
        paddingTop: 50,      
    },

})
