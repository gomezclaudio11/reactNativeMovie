import { useState, useEffect } from "react";
import apiClient from "../services/apiClient";

const useMovies = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            // Le pegamos al endpoint de películas populares de TMDb
            const response = await apiClient.get("/movie/popular", {
                params: {
                    language: "es-ES", // para ver los titulos en español
                    page: 1
                }
            });

        // TMDb devuelve los resultados dentro de un array llamado 'results'
        setMovies(response.data.results);
        setError(null);

        } catch (err) {
           console.error('Error fetching movies:', err);
            setError(err); 
        } finally {
      setLoading(false);
    }
    };

    useEffect(() => {
        fetchMovies()
    }, []);

    // Devolvemos lo mismo que te devolvía Apollo: los datos, el loading y la función para 
    // refrescar
    return { movies, loading, error, refetch: fetchMovies };
}

export default useMovies;