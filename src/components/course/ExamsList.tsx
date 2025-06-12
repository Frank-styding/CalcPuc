"use client";
import { useCourses } from "@/hooks/useCourses";
import { ExamItem } from "./ExamItem";

export const ExamsList = () => {
  const { getCourse, seletedCourse } = useCourses();
  const course = getCourse(seletedCourse || "");

  return (
    <div className="w-screen h-full flex flex-col gap-4 items-center pt-8 pb-25 overflow-y-scroll hide-scrollbar">
      {course?.exams.map((item) => (
        <ExamItem key={item.name + "examn"} data={item} />
      ))}
    </div>
  );
};
