import React, { useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, StyleSheet, Platform, StatusBar } from 'react-native';
import { Link } from 'react-router-native';
import useSearchMovies from '../hooks/useSearchMovies';
import MovieItem from './MovieItem';
import TextModificado from './TextModificado';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 15,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: theme.colors.surface,
    borderRadius: 8,
    marginRight: 10,
  },
  input: {
    flex: 1,
    backgroundColor: theme.colors.surface,
    color: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    fontSize: theme.fontSizes.body,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  list: {
    paddingHorizontal: 15,
  },
});

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const { results, loading, error } = useSearchMovies(query);

  return (
    <View style={styles.container}>
      {/* Barra superior: Botón Volver + Input */}
      <View style={styles.header}>
        <Link to="/" style={styles.backButton} activeOpacity={0.8}>
          <TextModificado bold> ← Volver </TextModificado>
        </Link>
        <TextInput
          style={styles.input}
          placeholder="Buscar películas..."
          placeholderTextColor={theme.colors.textSecondary}
          value={query}
          onChangeText={setQuery} // Actualiza el estado con cada letra
          autoFocus
        />
      </View>

      {/* Estados de la pantalla */}
      {loading && (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      )}

      {error && (
        <View style={styles.centerContainer}>
          <TextModificado style={{ color: theme.colors.primary }}>Error en la búsqueda.</TextModificado>
        </View>
      )}

      {!loading && results.length === 0 && query.trim() !== '' && (
        <View style={styles.centerContainer}>
          <TextModificado secondary>
            {`No se encontraron resultados para "${query}"`}
        </TextModificado>
        </View>
      )}

      {!loading && results.length === 0 && query.trim() === '' && (
        <View style={styles.centerContainer}>
          <TextModificado secondary>
            Escribe el título de una película para comenzar 🔍
          </TextModificado>
        </View>
      )}

      {/* Lista de resultados */}
      <FlatList
        data={results}
        contentContainerStyle={styles.list}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MovieItem item={item} />}
      />
    </View>
  );
};

export default MovieSearch;