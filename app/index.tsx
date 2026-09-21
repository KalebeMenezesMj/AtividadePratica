import { StatusBar } from 'expo-status-bar';
import {
  Text,
  View,
  FlatList,
  ImageBackground
} from 'react-native';

// importa um componente personalizado
import Card from '../components/card';
import Item from '../components/item';

// importa o css
import styles from '../assets/styles/styles';


export default function App() {

  const itens = [
    'Celulares',
    'Notebooks',
    'Tablets',
    'Smart TVs',
    'Informática',
    'Acessórios',
  ];

  return (
    <ImageBackground
      source={{
        uri: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/sunset-wallpaper-free-image.jpeg?w=600&quality=80'
      }}
      resizeMode="cover"
      style={styles.background}
    >

      <View style={styles.container}>

        {/* Cabeçalho da loja */}
        <Text style={styles.titulo}>
          FaTech
        </Text>

        <Text style={styles.subtitulo}>
          Tecnologia para transformar seu dia.
        </Text>

        {/* Categorias */}
        <View style={styles.categoriasContainer}>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={itens}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <Item texto={item} />
            )}
          />

        </View>

        {/* Card principal */}
        <Card />

        <StatusBar style="light" />

      </View>

    </ImageBackground>
  );
}
