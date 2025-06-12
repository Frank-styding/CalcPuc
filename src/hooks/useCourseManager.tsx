import { useCourses } from "./useCourses";
import { useGrades } from "./useGrades";
import { ICourse } from "./useCourses";

/**
 * Custom hook that manages both courses and their corresponding grades
 * Ensures that when a course is added, a corresponding course grade is created
 * And when a course is deleted, its corresponding grade is also deleted
 */
export const useCourseManager = () => {
  const { addCourse: addCourseToStore, deleteCourses: deleteCoursesFromStore } =
    useCourses();
  const { addCourseGrade, deleteCourseGrades } = useGrades();

  const addCourse = (course: ICourse) => {
    // Add course to courses store
    addCourseToStore(course);
    // Add corresponding course grade
    addCourseGrade(course);
  };

  const deleteCourses = (courseNames: string[]) => {
    // Delete courses from courses store
    deleteCoursesFromStore(courseNames);
    // Delete corresponding course grades
    deleteCourseGrades(courseNames);
  };

  return {
    addCourse,
    deleteCourses,
  };
};
