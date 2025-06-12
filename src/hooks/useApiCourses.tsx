import { useState, useEffect } from "react";
import { ICourse } from "./useCourses";
import { useApiConfig } from "./useApiConfig";

// Datos de prueba para desarrollo
const FALLBACK_COURSES: ICourse[] = [
  {
    name: "AMGA",
    exams: [
      {
        name: "PC",
        count: 2,
        deleteCount: 0,
        weight: 0.5,
      },
      {
        name: "Exam",
        count: 2,
        deleteCount: 0,
        weight: 0.5,
      },
    ],
  },
  {
    name: "Cálculo I",
    exams: [
      {
        name: "Tareas",
        count: 5,
        deleteCount: 1,
        weight: 0.3,
      },
      {
        name: "Exámenes",
        count: 3,
        deleteCount: 0,
        weight: 0.7,
      },
    ],
  },
  {
    name: "Física I",
    exams: [
      {
        name: "Laboratorios",
        count: 8,
        deleteCount: 1,
        weight: 0.4,
      },
      {
        name: "Exámenes",
        count: 2,
        deleteCount: 0,
        weight: 0.6,
      },
    ],
  },
  {
    name: "Programación",
    exams: [
      {
        name: "Proyectos",
        count: 4,
        deleteCount: 0,
        weight: 0.5,
      },
      {
        name: "Exámenes",
        count: 2,
        deleteCount: 0,
        weight: 0.5,
      },
    ],
  },
];

interface UseApiCoursesReturn {
  courses: ICourse[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useApiCourses = (): UseApiCoursesReturn => {
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

      const response = await fetch(`${apiConfig.baseUrl}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
        credentials: "include",
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setCourses(data);
    } catch (err) {
      console.warn(
        "Error fetching courses from API, using fallback data:",
        err
      );
      // En caso de error, usar datos de prueba para desarrollo
      setCourses(FALLBACK_COURSES);
      setError(
        "No se pudo cargar los cursos desde el servidor. Mostrando datos de prueba."
      );
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
  };
};
