"use client";

import { useCourses } from "@/hooks/useCourses";
import { useGrades } from "@/hooks/useGrades";

export const GradeInput = ({
  examName,
  index,
}: {
  examName: string;
  index: number;
}) => {
  const { seletedCourse, getCourse } = useCourses();
  const { getExamData, setGrade } = useGrades();
  const defautlValue = getExamData(seletedCourse || "", examName, index);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const course = getCourse(seletedCourse || "");
    if (!course) return;
    console.log(index);
    setGrade(course, examName, index, +e.currentTarget.value);
  };

  return (
    <div className="flex gap-10 py-2 min-h-12">
      <div className="text-[var(--color-dark3)] text-xl">
        {examName + " " + (index + 1)}
      </div>
      <input
        onChange={handleChange}
        defaultValue={defautlValue}
        max={20}
        min={0}
        className="bg-[var(--color-dark1)] border border-[var(--color-dark2)] rounded-lg outline-none text-[var(--color-dark3)] text-center text-lg"
        type="number"
      />
    </div>
  );
};
