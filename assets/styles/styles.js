import { StyleSheet } from "react-native";

const styles = StyleSheet.create({

  background: {
    flex: 1,
  },

  container: {
    flex: 1,

    alignItems: 'center',

    paddingTop: 50,

    // Camada transparente sobre a imagem de fundo
    backgroundColor: 'rgba(15, 23, 42, 0.30)',
  },

  titulo: {
    color: '#FFFFFF',

    fontSize: 32,
    fontWeight: '800',

    letterSpacing: 1,

    marginTop: 10,

    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {
      width: 1,
      height: 2,
    },
    textShadowRadius: 4,
  },

  subtitulo: {
    color: '#FFFFFF',

    fontSize: 15,

    marginTop: 4,
    marginBottom: 15,

    textAlign: 'center',

    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 3,
  },

  categoriasContainer: {
    width: '90%',
    height: 65,
  },

});

export default styles;
