"use client";
import { CourseItem } from "@/components/home/CourseItem";
import { useCourses } from "@/hooks/useCourses";

export const CourseList = () => {
  const { courses } = useCourses();
  return (
    <div className="w-screen h-full flex flex-col gap-4 items-center pt-8 pb-25 overflow-y-scroll hide-scrollbar">
      {courses.map((item) => (
        <CourseItem name={item.name} key={item.name} />
      ))}
    </div>
  );
};
