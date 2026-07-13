import axios from 'axios';

// Leemos el token del .env de Expo de forma segura
const TMDB_TOKEN = process.env.EXPO_PUBLIC_TMDB_TOKEN;

const apiClient = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_TOKEN}`, // Inyectamos el Token v4 de lectura
  },
});

export default apiClient;