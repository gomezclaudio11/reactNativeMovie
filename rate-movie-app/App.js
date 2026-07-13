import React from 'react';
import { StyleSheet, View, StatusBar, SafeAreaView, Platform } from 'react-native';
import { NativeRouter, Routes, Route, Link } from "react-router-native";
import TextModificado from './src/components/TextModificado';
import theme from './src/theme';
import MovieList from './src/components/MovieList';
import MovieDetail from './src/components/MovieDetail';
import MovieSearch from './src/components/MovieSearch';

export default function App() {
  return (
    <NativeRouter>
        <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor={theme.colors.background} />
          <Routes>
  {/* Ruta de la Cartelera Principal */}
  <Route path="/" element={
    <>
      <View style={styles.header}>
        <View style={{ width: 30 }} /> {/* Espaciador para centrar el título */}
        <TextModificado title> 
          🎬 MovieRate
        </TextModificado>
        <Link to="/search" activeOpacity={0.7}>
          <TextModificado style={{ fontSize: 22 }}>
            🔍
          </TextModificado>
        </Link>
      </View>
      <MovieList />
    </>
  } />

  {/* 🚀 RUTA CORREGIDA: Sin el anidamiento raro que causaba el error */}
  <Route path="/movie/:id" element={<MovieDetail />} /> 

  {/* Ruta del Buscador */}
  <Route path="/search" element={<MovieSearch />} />
</Routes>
      </View>
    </NativeRouter>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.surface,
    alignItems: 'center',
    //Le sumamos la altura del reloj del celular al espacio de arriba
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 15 : 15,
    backgroundColor: theme.colors.background, // Para que el fondo del header tape las películas al hacer scroll
  },
});