import { useState, useEffect } from 'react';
import apiClient from '../services/apiClient';
import useDebounce from './useDebounce';

const useSearchMovies = (query) => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Pasamos el texto por el filtro del debounce (espera 500ms)
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    // Si el usuario borró todo el texto, limpiamos los resultados y no gastamos datos
    if (!debouncedQuery.trim()) {
      setResults([]);
      return;
    }

    const searchMovies = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get('/search/movie', {
          params: {
            query: debouncedQuery,
            language: 'es-ES',
            page: 1,
          },
        });
        setResults(response.data.results);
        setError(null);
      } catch (err) {
        console.error('Error buscando películas:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    searchMovies();
  }, [debouncedQuery]); // 🚀 Se ejecuta SOLO cuando el debounce termina de procesar el texto

  return { results, loading, error };
};

export default useSearchMovies;