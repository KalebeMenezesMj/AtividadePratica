import { Tabs } from "expo-router";
import { AntDesign } from '@expo/vector-icons';

// Abas inferiores do app com as telas de Lista, Favoritos e Adicionar
// (a tela de Detalhes abre empilhada por cima ao tocar em um anime)
export default function RootLayout(){
    return(
        <Tabs screenOptions={{headerShown: false, tabBarStyle: {backgroundColor: '#16161D'}, tabBarActiveTintColor: '#F47521'}}>

            <Tabs.Screen name="index" options={{title:'Animes', tabBarIcon:()=> <AntDesign name="home" size={24} color="#F47521" />}} />

            <Tabs.Screen name="favoritos" options={{title:'Favoritos', tabBarIcon: ()=><AntDesign name="heart" size={24} color="#F47521" />}} />

            <Tabs.Screen name="novoAnime" options={{title:'Adicionar', tabBarIcon: ()=><AntDesign name="plus" size={24} color="#F47521" />}} />
        </Tabs>
    )

}
