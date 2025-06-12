import { create } from "zustand";

interface ICoursesEditor {
  isEditing: boolean;
  coursesSelected: string[];
  setIsEditing: (value: boolean) => void;
  selectCourse: (name: string) => void;
  unSelectCourse: (name: string) => void;
}

export const useCoursesEditor = create<ICoursesEditor>()((set) => ({
  isEditing: false,
  coursesSelected: [],
  setIsEditing: (value) => set(() => ({ isEditing: value })),
  selectCourse: (name: string) =>
    set((state) => {
      if (state.coursesSelected.indexOf(name) != -1) return {};
      return { coursesSelected: [...state.coursesSelected, name] };
    }),
  unSelectCourse: (name: string) =>
    set((state) => ({
      coursesSelected: state.coursesSelected.filter((item) => item != name),
    })),
}));
