import { useState, useEffect } from "react";
import { ICourse } from "./useCourses";
import { useApiConfig } from "./useApiConfig";

interface UseApiCoursesWithConfigReturn {
  courses: ICourse[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  apiConfig: {
    baseUrl: string;
    timeout: number;
  };
}

export const useApiCoursesWithConfig = (): UseApiCoursesWithConfigReturn => {
  const { config: apiConfig } = useApiConfig();
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), apiConfig.timeout);

      const response = await fetch(`${apiConfig.baseUrl}/courses`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.warn("Error fetching courses from API:", err);
      // En caso de error, no mostrar datos de prueba
      setCourses([]);
      setError("No se pudo cargar los cursos desde el servidor.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [apiConfig.baseUrl, apiConfig.timeout]);

  const refetch = () => {
    fetchCourses();
  };

  return {
    courses,
    loading,
    error,
    refetch,
    apiConfig,
  };
};
