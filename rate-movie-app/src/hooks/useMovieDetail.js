import { useEffect, useState } from "react";
import apiClient from "../services/apiClient";

const useMovieDetail = (id) => {
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        if (!id) return;

        const fetchMovieDetail = async () =>{
            try {
                setLoading(true);

                const response = await apiClient.get(`/movie/${id}`, {
                    params: {
                        language: "es-ES",
                    }
                });

                setMovie(response.data);
                setError(null)
            } catch (err) {
                console.error("error fetching movie details", err);
                setError(null)
            } finally {
                setLoading(false)
            }
        }

        fetchMovieDetail();
    }, [id])

    return { movie, loading, error }
}

export default useMovieDetail;