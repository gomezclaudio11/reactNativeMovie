import React from 'react';
import { FlatList, View, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import useMovies from '../hooks/useMovies';
import TextModificado from './TextModificado';
import theme from '../theme';
import MovieItem from './MovieItem';

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: 12,
    paddingTop: 12,
  },
});

const MovieList = () => {
    const { movies, loading, error, refetch } = useMovies();

    if (loading && movies.length === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
        )
    }

    if (error && movies.length === 0) {
        return (
        <View style={styles.loadingContainer}>
          <TextModificado style={{ color: theme.colors.primary }}>
            Error al cargar las películas.
          </TextModificado>
            {/* Al presionar, ejecuta refetch() para volver a pedir los datos */}
          <TouchableOpacity style={styles.button} onPress={refetch}>
            <TextModificado bold style={{ color: '#ffffff' }}>Reintentar</TextModificado>
          </TouchableOpacity>
        </View>
        );
    }

    return (
        <FlatList
            data={movies}
            contentContainerStyle={styles.listContainer}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <MovieItem item={item}/>}
            // AGREGAMOS EL DESLIZAR PARA ACTUALIZAR (Pull to Refresh)
            refreshing={loading}
            onRefresh={refetch}
            />
        )
    }

export default MovieList