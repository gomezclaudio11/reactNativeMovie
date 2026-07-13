import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@movie_rate_reviews';

const useReviews = (movieId) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Función para cargar las reseñas del celular
  const loadReviews = async () => {
    try {
      setLoading(true);
      const savedReviews = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (savedReviews) {
        const allReviews = JSON.parse(savedReviews);
        // Filtramos para quedarnos SOLO con las reseñas de ESTA película
        const filtered = allReviews.filter(r => r.movieId === movieId);
        setReviews(filtered);
      }
    } catch (error) {
      console.error('Error cargando reseñas desde AsyncStorage:', error);
    } finally {
      setLoading(false);
    }
  };

  // 2. Función para guardar una nueva reseña
  const saveReview = async (newReview) => {
    try {
      const savedReviews = await AsyncStorage.getItem(STORAGE_KEY);
      const allReviews = savedReviews ? JSON.parse(savedReviews) : [];
      
      // Agregamos la nueva reseña al principio de la lista general
      const updatedReviews = [newReview, ...allReviews];
      
      // Guardamos la lista completa convertida en texto plano JSON
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReviews));
      
      // Actualizamos el estado local para que la pantalla se refresque al instante
      // Agregamos al estado solo si pertenece a esta película (que sí pertenece)
      setReviews(prev => [newReview, ...prev]);
    } catch (error) {
      console.error('Error guardando reseña en AsyncStorage:', error);
      alert('No se pudo guardar tu comentario. Intenta de nuevo.');
    }
  };

  // Disparamos la carga inicial cuando entramos a la pantalla o cambia la película
  useEffect(() => {
    if (movieId) {
      loadReviews();
    }
  }, [movieId]);

  return { reviews, loading, saveReview };
};

export default useReviews;