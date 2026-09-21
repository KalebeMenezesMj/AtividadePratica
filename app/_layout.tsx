import { Stack } from "expo-router";

// Navegação principal do app em pilha (Stack): as abas ficam no primeiro nível
// e a tela de detalhes do anime abre empilhada por cima delas
export default function RootLayout(){
    return(
        <Stack screenOptions={{headerTintColor:'#F47521', headerStyle: {backgroundColor: '#16161D'}, }}>

            <Stack.Screen name="(tabs)"
                        options= {{headerShown:false}}
            />
            {/* rota dinâmica: /anime/1, /anime/2... o id chega como parâmetro */}
            <Stack.Screen name="anime/[id]"
                        options= {{title:'Detalhes do anime'}}
            />
        </Stack>
    )
}
