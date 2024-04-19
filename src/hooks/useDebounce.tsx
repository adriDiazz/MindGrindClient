import { useEffect, useState } from "react";

function useDebounce<T>(value: T, delay: number): T {
	// Estado interno para almacenar el valor debounced
	const [debouncedValue, setDebouncedValue] = useState<T>(value);

	useEffect(() => {
		// Establece un temporizador que actualiza el valor debounced después del retraso
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		// Función de limpieza para cancelar el temporizador si el valor cambia
		// o si el componente que utiliza el hook se desmonta
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]); // Solo re-ejecutar si el valor o el delay cambian

	return debouncedValue;
}

export default useDebounce;
