import { Tabs } from "expo-router";
import AntDesign from '@expo/vector-icons/AntDesign';

export default function RootLayout(){
    return(
        <Tabs screenOptions={{headerStyle: {backgroundColor: 'green'}, headerTintColor: 'white', tabBarActiveTintColor: 'green', tabBarActiveBackgroundColor: 'yellow'}}>

            <Tabs.Screen name="dashboard" options={{title:'Dashboard', tabBarIcon:()=> <AntDesign name="home" size={24} color="black" />}} />

            <Tabs.Screen name="perfil" options={{title:'Perfil', tabBarIcon: ()=><AntDesign name="user" size={24} color="black" />}} />
        </Tabs> 
    )

}
