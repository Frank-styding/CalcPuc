"use client";
import { IExam, useCourses } from "@/hooks/useCourses";
import { useState } from "react";
import { ExamInfo } from "./ExamInfo";
import { GradeInput } from "./GradeInput";
import { useGrades } from "@/hooks/useGrades";

export const ExamItem = ({ data }: { data: IExam }) => {
  const { seletedCourse } = useCourses();
  const { getExamGrade } = useGrades();

  const [show, setShow] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div className=" flex-col w-[90vw] box-content bg-[var(--color-dark)] rounded-lg border border-[var(--color-dark2)]">
      <ExamInfo
        {...data}
        grade={getExamGrade(seletedCourse || "", data.name)}
        onClick={handleClick}
      />
      <div
        className={
          "overflow-hidden flex flex-col items-center transition-[max-height] duration-200 ease-in-out " +
          (show ? "max-h-400" : "max-h-0")
        }
      >
        {new Array(data.count).fill(0).map((_, i) => (
          <GradeInput examName={data.name} index={i} key={data.name + i} />
        ))}
      </div>
    </div>
  );
};
