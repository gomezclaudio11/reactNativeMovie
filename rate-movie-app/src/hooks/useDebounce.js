import { useState, useEffect } from "react";

const useDebounce = (value, delay = 500) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
       // Configuramos un temporizador para actualizar el valor después del "delay"
       const handler = setTimeout(() => {
        setDebouncedValue(value);
       }, delay) 

       // Si el usuario vuelve a escribir antes de los 500ms, limpiamos el timer anterior y
       //  vuelve a empezar
       return () => {
        clearTimeout(handler);
       }
    }, [value, delay]);

    return debouncedValue
};

export default useDebounce;