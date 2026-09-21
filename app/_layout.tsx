import { Stack } from "expo-router";

export default function RootLayout(){
    return(
        <Stack screenOptions={{headerTintColor:'#720a0a', headerStyle: {backgroundColor: 'yellow'}, }}>
           
            <Stack.Screen name="index" 
                        options={{headerShown:false }} 
            />
            <Stack.Screen name="login"  
                        options={{title:'Área Restrita'}}
            />
            <Stack.Screen name="cadastro"  
                        options= {{title:'Criar conta'}}
            />
            <Stack.Screen name="(tabs)"  
                        options= {{headerShown:false}}
            />
            <Stack.Screen name="drawer"  
                        options= {{headerShown:false}}
            />
        </Stack>
    )
}



