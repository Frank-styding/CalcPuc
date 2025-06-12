import { FormatNumberOptions } from "@/utils";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface IExam {
  name: string;
  count: number;
  deleteCount: number;
  weight: number;
  precision?: FormatNumberOptions;
}

export interface ICourse {
  name: string;
  exams: IExam[];
}

type ICourses = ICourse[];

interface IuseCourses {
  courses: ICourses;
  seletedCourse?: string;
  addCourse: (course: ICourse) => void;
  setSelectedCourse: (name: string) => void;
  deleteCourses: (names: string[]) => void;
  getCourses: () => ICourses;
  getCourse: (name: string) => ICourse | undefined;
}

export const useCourses = create<IuseCourses>()(
  persist(
    (set, get) => ({
      courses: [],
      setSelectedCourse: (name: string) =>
        set(() => ({
          seletedCourse: name,
        })),
      addCourse: (course) =>
        set((state) => {
          if (state.courses.some((item) => item.name == course.name)) return {};
          return { courses: [...state.courses, course] };
        }),
      deleteCourses: (names) =>
        set((state) => ({
          courses: state.courses.filter(
            (course) => !names.includes(course.name)
          ),
        })),
      getCourses: () => get().courses,
      getCourse: (name: string) =>
        get().courses.find((course) => course.name == name),
    }),
    {
      name: "courses-storage",
      partialize: (state) => ({
        courses: state.courses,
        seletedCourse: state.seletedCourse,
      }),
    }
  )
);
