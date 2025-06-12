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
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    // Limpiar cualquier script anterior
    if (scriptRef.current && scriptRef.current.parentNode) {
      scriptRef.current.parentNode.removeChild(scriptRef.current);
      scriptRef.current = null;
    }

    // Limpiar timeout anterior
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    try {
      // Crear un callback único para esta petición
      const callbackName = `jsonpCallback_${Date.now()}_${Math.random()
        .toString(36)
        .substr(2, 9)}`;

      // Crear una promesa para manejar la respuesta JSONP
      const jsonpPromise = new Promise<ICourse[]>((resolve, reject) => {
        // Configurar el callback global
        window[callbackName] = (data: ICourse[]) => {
          console.log("Cursos cargados via JSONP:", data);
          resolve(data);
          // Limpiar el callback
          delete window[callbackName];
        };

        // Configurar timeout
        timeoutRef.current = setTimeout(() => {
          delete window[callbackName];
          reject(
            new Error(
              "Timeout: No se pudo cargar los datos en el tiempo esperado"
            )
          );
        }, apiConfig.timeout);

        // Crear el script tag
        const script = document.createElement("script");
        const url = `${apiConfig.baseUrl}?callback=${callbackName}`;
        console.log("Intentando cargar desde:", url);
        script.src = url;

        script.onerror = () => {
          delete window[callbackName];
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
          }
          reject(
            new Error("Error de red: No se pudo conectar con el servidor")
          );
        };

        script.onload = () => {
          // El script se cargó, pero el callback se ejecutará cuando se procese
          console.log("Script JSONP cargado exitosamente");
        };

        scriptRef.current = script;
        document.head.appendChild(script);
      });

      const data = await jsonpPromise;
      setCourses(data);
    } catch (err) {
      console.warn("Error fetching courses from API using JSONP:", err);
      setCourses([]);
      setError(
        err instanceof Error
          ? err.message
          : "Error desconocido al cargar los cursos"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();

    // Cleanup function
    return () => {
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
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
