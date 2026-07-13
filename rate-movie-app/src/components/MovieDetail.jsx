import React from 'react';
import { View, Image, ScrollView, ActivityIndicator, StyleSheet, Platform, StatusBar } from 'react-native';
import { useParams, Link } from 'react-router-native'; // useParams para leer el ID
import useMovieDetail from '../hooks/useMovieDetail';
import TextModificado from './TextModificado';
import useReviews from '../hooks/useReviews';
import ReviewForm from './ReviewForm';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: theme.colors.surface,
    alignSelf: 'flex-start',
    marginLeft: 15,
    marginBottom: 10,
    borderRadius: 8,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 15,
    zIndex: 10,
  },
  backdrop: {
    width: '100%',
    height: 220,
    backgroundColor: '#2a2a2a',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: theme.fontSizes.heading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 8,
  },
  tagline: {
    fontStyle: 'italic',
    color: theme.colors.textSecondary,
    marginBottom: 15,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginTop: 20,
    marginBottom: 8,
  },
  overviewTitle: {
    fontSize: theme.fontSizes.subheading,
    fontWeight: theme.fontWeights.bold,
    marginBottom: 8,
  },
  // Estilos para la lista de comentarios
  reviewCard: {
    backgroundColor: theme.colors.surface,
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
});

const MovieDetail = () => {
  const { id } = useParams();
  const { movie, loading: movieLoading, error } = useMovieDetail(id);
  
  // Inicializamos el almacenamiento local para las reseñas de esta película
  const { reviews, loading: reviewsLoading, saveReview } = useReviews(id);

  if (movieLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (error || !movie) {
    return (
      <View style={styles.loadingContainer}>
        <TextModificado style={{ color: theme.colors.primary }}>
          No se pudo cargar el detalle de la película.
        </TextModificado>
        <Link to="/" style={styles.backButton}>
          <TextModificado bold>Volver al inicio</TextModificado>
        </Link>
      </View>
    );
  }

  const backdropUrl = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;

  return (
    <ScrollView style={styles.container}>
      <Link to="/" style={styles.backButton} activeOpacity={0.8}>
        <TextModificado bold>← Volver</TextModificado>
      </Link>

      <Image source={{ uri: backdropUrl }} style={styles.backdrop} resizeMode="cover" />

      <View style={styles.content}>
        <TextModificado title style={styles.title}>{movie.title}</TextModificado>
        {movie.tagline ? <TextModificado style={styles.tagline}>"{movie.tagline}"</TextModificado> : null}

        <View style={styles.metaContainer}>
          <TextModificado style={{ color: theme.colors.rating }} bold>
            ⭐ {movie.vote_average.toFixed(1)}
          </TextModificado>
          <TextModificado secondary>
            📅 {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
          </TextModificado>
          <TextModificado secondary>
            ⏱️ {movie.runtime} min
          </TextModificado>
        </View>

        <TextModificado style={styles.sectionTitle}>Sinopsis</TextModificado>
        <TextModificado secondary style={styles.overviewText}>
          {movie.overview || 'No hay sinopsis disponible para esta película.'}
        </TextModificado>

        {/*  FORMULARIO PARA DEJAR RESEÑA */}
        <ReviewForm movieId={id} onReviewSubmit={saveReview} />

        {/*  SECCIÓN DE RESEÑAS DE LOS USUARIOS */}
        <TextModificado style={styles.sectionTitle}>Opiniones de la comunidad</TextModificado>
        
        {reviewsLoading ? (
          <ActivityIndicator color={theme.colors.primary} style={{ marginTop: 10 }} />
        ) : reviews.length === 0 ? (
          <TextModificado secondary style={{ fontStyle: 'italic', marginTop: 5 }}>
            Nadie ha comentado todavía. ¡Sé el primero! 💬
          </TextModificado>
        ) : (
          reviews.map((review) => (
            <View key={review.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <TextModificado bold>{review.name}</TextModificado>
                <TextModificado style={{ color: theme.colors.rating }} bold>
                  {'⭐ '.repeat(review.rating)}
                </TextModificado>
              </View>
              <TextModificado secondary style={{ fontSize: 12, marginBottom: 6 }}>
                {review.date}
              </TextModificado>
              <TextModificado styles={styles.overviewText}>{review.comment}</TextModificado>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

export default MovieDetail;