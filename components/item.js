import { View, Text, StyleSheet } from "react-native";

export default function Item(props) {
    return (
        <View style={styles.caixa}>
            <Text style={styles.texto}>
                {props.texto}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({

    caixa: {
        backgroundColor: '#EFF6FF',

        width: 130,
        height: 55,

        marginHorizontal: 6,
        marginVertical: 5,

        borderRadius: 10,

        borderWidth: 1,
        borderColor: '#720a0a',

        justifyContent: 'center',
        alignItems: 'center',

        elevation: 2,

        shadowColor: '#0F172A',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.08,
        shadowRadius: 2,
    },

    texto: {
        color: '#0F172A',

        fontSize: 15,
        fontWeight: '600',

        textAlign: 'center',
    }
});
