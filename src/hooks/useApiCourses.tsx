import { useState, useEffect, useRef } from "react";
import { ICourse } from "./useCourses";
import { useApiConfig } from "./useApiConfig";

interface UseApiCoursesReturn {
  courses: ICourse[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

// Extender la interfaz Window para incluir callbacks dinámicos
declare global {
  interface Window {
    [key: string]: ((data: ICourse[]) => void) | undefined;
  }
}

export const useApiCourses = (): UseApiCoursesReturn => {
  const { config: apiConfig } = useApiConfig();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    // Cancelar petición anterior si existe
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Crear nuevo AbortController para esta petición
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch(apiConfig.baseUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        signal: abortControllerRef.current.signal,
        mode: "cors", // Habilitar CORS explícitamente
        credentials: "omit", // No enviar cookies para evitar problemas de CORS
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ICourse[] = await response.json();
      console.log("Cursos cargados:", data);
      setCourses(data);
    } catch (err) {
      if (err instanceof Error && err.name === "AbortError") {
        // La petición fue cancelada, no mostrar error
        return;
      }

      console.warn("Error fetching courses from API:", err);
      setCourses([]);
      setError(
        "No se pudo cargar los cursos desde el servidor. Verifique la configuración de la API."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();

    // Cleanup function
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [apiConfig.baseUrl, apiConfig.timeout]);

  const refetch = () => {
    fetchCourses();
  };

  return {
    courses,
    loading,
    error,
    refetch,
  };
};
