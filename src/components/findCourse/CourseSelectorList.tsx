"use client";
import { CourseSelectorItem } from "./CourseSelectorItem";
import { useState, useEffect } from "react";
import { useCourses } from "@/hooks/useCourses";
import { useApiCourses } from "@/hooks/useApiCourses";

export const CourseSelectorList = ({
  searchQuery = "",
}: {
  searchQuery?: string;
}) => {
  const { courses: userCourses } = useCourses();
  const { courses: apiCourses, loading } = useApiCourses();
  const [filteredCourses, setFilteredCourses] = useState<string[]>([]);

  useEffect(() => {
    if (loading) return;

    // Filter out courses that are already added
    const userCourseNames = userCourses.map((course) => course.name);
    const availableCourses = apiCourses
      .map((course) => course.name)
      .filter((courseName) => !userCourseNames.includes(courseName));

    if (searchQuery.trim() === "") {
      setFilteredCourses(availableCourses);
    } else {
      const filtered = availableCourses.filter((course) =>
        course.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCourses(filtered);
    }
  }, [searchQuery, userCourses, apiCourses, loading]);

  if (loading) {
    return (
      <div className="w-screen h-full flex flex-col gap-4 items-center pt-8 pb-25 overflow-y-scroll hide-scrollbar">
        <div className="text-[var(--color-dark3)] text-xl mt-8">
          Cargando cursos...
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-full flex flex-col gap-4 items-center pt-8 pb-25 overflow-y-scroll hide-scrollbar">
      {filteredCourses.length === 0 ? (
        <div className="text-[var(--color-dark3)] text-xl mt-8">
          {searchQuery.trim() === ""
            ? "No hay cursos disponibles para agregar"
            : `No se encontraron cursos que coincidan con "${searchQuery}"`}
        </div>
      ) : (
        filteredCourses.map((courseName) => (
          <CourseSelectorItem name={courseName} key={courseName} />
        ))
      )}
    </div>
  );
};
