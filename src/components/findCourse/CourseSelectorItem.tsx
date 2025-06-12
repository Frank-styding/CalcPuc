"use client";
import { useCourseSelector } from "@/hooks/useCourseSelector";
import { useState } from "react";
import { CourseCard } from "../CourseCard";

export const CourseSelectorItem = ({ name }: { name: string }) => {
  const { selectCourse, unSelectCourse } = useCourseSelector();
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    handleChangeCheckbox();
  };

  const handleChangeCheckbox = () => {
    setIsSelected(!isSelected);
    if (!isSelected) {
      selectCourse(name);
    } else {
      unSelectCourse(name);
    }
  };

  return (
    <CourseCard
      onClick={handleClick}
      name={name}
      showCheckBox={true}
      value={isSelected}
      onChange={handleChangeCheckbox}
    />
  );
};
