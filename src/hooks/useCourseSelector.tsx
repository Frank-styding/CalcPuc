import { create } from "zustand";

interface ICourseSelector {
  isSelecting: boolean;
  coursesSelected: string[];
  setIsSelecting: (value: boolean) => void;
  selectCourse: (name: string) => void;
  unSelectCourse: (name: string) => void;
  clearSelection: () => void;
}

export const useCourseSelector = create<ICourseSelector>()((set) => ({
  isSelecting: false,
  coursesSelected: [],
  setIsSelecting: (value) => set(() => ({ isSelecting: value })),
  selectCourse: (name: string) =>
    set((state) => {
      if (state.coursesSelected.indexOf(name) !== -1) return {};
      return { coursesSelected: [...state.coursesSelected, name] };
    }),
  unSelectCourse: (name: string) =>
    set((state) => ({
      coursesSelected: state.coursesSelected.filter((item) => item !== name),
    })),
  clearSelection: () => set(() => ({ coursesSelected: [] })),
}));
