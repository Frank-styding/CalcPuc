import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ICourse } from "./useCourses";
import { convertCourseToCourseGrade, formatNumber } from "@/utils";

export interface IExamGrade {
  name: string;
  data: number[];
  grade: number;
}

export interface ICourseGrade {
  name: string;
  grade: number;
  exams: IExamGrade[];
}

interface useGrades {
  courses: ICourseGrade[];
  getCourseGrade: (name: string) => number;
  getExamGrade: (courseName: string, examName: string) => number;
  getExamData: (courseName: string, examName: string, index: number) => number;
  setGrade: (
    course: ICourse,
    examName: string,
    index: number,
    value: number
  ) => void;
  addCourseGrade: (course: ICourse) => void;
  deleteCourseGrades: (courseNames: string[]) => void;
}

export const useGrades = create<useGrades>()(
  persist(
    (set, get) => ({
      courses: [
        {
          name: "AMGA",
          grade: 0,
          exams: [
            { name: "PC", grade: 0, data: [0, 0] },
            { name: "Exam", grade: 0, data: [0, 0] },
          ],
        },
      ] as ICourseGrade[],
      getCourseGrade: (name: string) => {
        const course = get().courses.find((item) => item.name == name);
        if (!course) return 0;

        // Por defecto usar 2 decimales con redondeo
        return parseFloat(formatNumber(course.grade));
      },
      getExamGrade: (courseName: string, examName: string) => {
        const course = get().courses.find((item) => item.name == courseName);
        if (!course) return 0;

        const exam = course.exams.find((item) => item.name == examName);
        if (!exam) return 0;

        // Por defecto usar 2 decimales con redondeo
        return parseFloat(formatNumber(exam.grade));
      },
      getExamData: (courseName: string, examName: string, index: number) => {
        const course = get().courses.find((item) => item.name == courseName);
        if (!course) return 0;

        const exam = course.exams.find((item) => item.name == examName);
        if (!exam) return 0;

        const value = exam.data[index] || 0;

        // Por defecto usar 2 decimales con redondeo
        return parseFloat(formatNumber(value));
      },
      setGrade: (
        course: ICourse,
        examName: string,
        index: number,
        value: number
      ) => {
        set((state) => ({
          courses: state.courses.map((item) => {
            if (item.name == course.name) {
              item.exams = item.exams.map((exam, i) => {
                const examStruct = course.exams[i];

                if (exam.name == examName) {
                  exam.data[index] = value;
                  const aux = examStruct.count - examStruct.deleteCount;
                  exam.grade =
                    [...exam.data]
                      .sort((a, b) => b - a)
                      .slice(0, aux)
                      .reduce((p, c) => p + c, 0) / aux;
                }
                return exam;
              });

              item.grade = item.exams.reduce((o, item, i) => {
                const examStruct = course.exams[i];
                return o + item.grade * examStruct.weight;
              }, 0);
            }
            return item;
          }),
        }));
      },
      addCourseGrade: (course: ICourse) => {
        set((state) => {
          // Check if course grade already exists
          if (state.courses.some((item) => item.name === course.name)) {
            return {};
          }

          // Create new course grade using the utility function
          const newCourseGrade = convertCourseToCourseGrade(course);
          return { courses: [...state.courses, newCourseGrade] };
        });
      },
      deleteCourseGrades: (courseNames: string[]) => {
        set((state) => ({
          courses: state.courses.filter(
            (course) => !courseNames.includes(course.name)
          ),
        }));
      },
    }),
    {
      name: "grades",
    }
  )
);
