"use client";
import { useCourses } from "@/hooks/useCourses";
import { useCoursesEditor } from "@/hooks/useCoursesEditor";
import { useGrades } from "@/hooks/useGrades";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CourseCard } from "../CourseCard";

export const CourseItem = ({ name }: { name: string }) => {
  const { setSelectedCourse } = useCourses();
  const { isEditing, selectCourse, unSelectCourse } = useCoursesEditor();
  const { getCourseGrade } = useGrades();

  const [isSelected, setIsSelected] = useState(false);
  const [grade, setGrade] = useState(0);

  useEffect(() => {
    setGrade(getCourseGrade(name));
  }, [getCourseGrade, name]);

  const router = useRouter();
  const handleClick = () => {
    if (isEditing) {
      handleChangeCheckbox();
      return;
    }
    setSelectedCourse(name);
    router.push("/course");
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
      showCheckBox={isEditing}
      value={isSelected}
      onChange={handleChangeCheckbox}
      grade={grade}
    />
  );
};
