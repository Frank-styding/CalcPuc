import { ICourse } from "@/hooks/useCourses";
import { ICourseGrade } from "@/hooks/useGrades";

/**
 * Opciones para formatear números
 */
export interface FormatNumberOptions {
  /** Número de decimales a mostrar (por defecto: 2) */
  decimals?: number;
  /** Si debe redondear el número (por defecto: true) */
  round?: boolean;
  /** Si debe mostrar solo la parte entera (por defecto: false) */
  onlyInteger?: boolean;
}

/**
 * Convierte un ICourse en un ICourseGrade
 * @param course - El curso a convertir
 * @returns Un objeto ICourseGrade con datos inicializados
 */
export const convertCourseToCourseGrade = (course: ICourse): ICourseGrade => {
  return {
    name: course.name,
    grade: 0,
    exams: course.exams.map((exam) => ({
      name: exam.name,
      grade: 0,
      data: new Array(exam.count).fill(0),
    })),
  };
};

/**
 * Convierte una lista de ICourse en una lista de ICourseGrade
 * @param courses - La lista de cursos a convertir
 * @returns Un array de objetos ICourseGrade con datos inicializados
 */
export const convertCoursesToCourseGrades = (
  courses: ICourse[]
): ICourseGrade[] => {
  return courses.map(convertCourseToCourseGrade);
};

/**
 * Formatea un número con opciones de decimales y redondeo
 * @param value - El número a formatear
 * @param options - Opciones de formateo
 * @returns El número formateado como string
 */
export const formatNumber = (
  value: number,
  options: FormatNumberOptions = {}
): string => {
  const { decimals = 2, round = true, onlyInteger = false } = options;

  // Si solo se quiere la parte entera
  if (onlyInteger) {
    return Math.floor(value).toString();
  }

  // Si no se quiere redondear, solo truncar
  if (!round) {
    const factor = Math.pow(10, decimals);
    const truncated = Math.floor(value * factor) / factor;
    return truncated.toFixed(decimals);
  }

  // Redondear con el número de decimales especificado
  return value.toFixed(decimals);
};
