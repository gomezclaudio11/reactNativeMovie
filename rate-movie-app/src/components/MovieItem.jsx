import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Link } from "react-router-native";
import TextModificado from "./TextModificado";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row', // Poster a la izquierda, textos a la derecha
    padding: 10,
    backgroundColor: theme.colors.surface,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000', // Sombrita sutil para que despegue del fondo
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Sombra para Android
  },
  poster: {
    width: 90,
    height: 135,
    borderRadius: 8,
    backgroundColor: '#2a2a2a', // Fondo gris mientras descarga la imagen
  },
  infoContainer: {
    flex: 1, // Ocupa todo el espacio restante a la derecha
    marginLeft: 12,
    justifyContent: 'space-between', // Separa el título arriba y el rating abajo
  },
  rating: {
    color: theme.colors.rating,
    fontWeight: theme.fontWeights.bold,
    marginTop: 4,
  },
});

const MovieItem = ({ item }) => {
    // Armamos la URL completa del póster
    const posterUrl = `https://image.tmdb.org/t/p/w500${item.poster_path}`;
    
    
    return (
        // Envolvemos todo en el Link apuntando al ID de la película
        <Link to={`/movie/${item.id}`}  style={styles.link} activeOpacity={0.8}>
        <View style={styles.container}>
            {/* Mostramos el póster de la película */}
            <Image 
                source={{ uri: posterUrl }} 
                style={styles.poster} 
                resizeMode="cover"
            />

        {/* Contenedor de la información */}
        <View style={styles.infoContainer}>
            <View>
                <TextModificado bold style={{ fontSize: theme.fontSizes.subheading }}>
                    {item.title}
                </TextModificado>
          
                <TextModificado secondary style={{ marginTop: 6 }} numberOfLines={3}>
                    {item.overview || 'Sin sinopsis disponible.'}
                </TextModificado>
            </View>

        <TextModificado style={styles.rating}>
          ⭐ {item.vote_average.toFixed(1)}
        </TextModificado>
      </View>
    </View>
    </Link>
  );
};

export default MovieItem;