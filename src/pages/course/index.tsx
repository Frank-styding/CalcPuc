"use client";
import { ExamsList } from "@/components/course/ExamsList";
import { HomeIcon } from "@/components/icons/HomeIcon";
import { HeaderTitle } from "@/components/ui/HeaderTitle";
import Layout from "@/components/ui/layout";
import { useCourses } from "@/hooks/useCourses";
import { useGrades } from "@/hooks/useGrades";
import { useRouter } from "next/router";

export default function Course() {
  const { seletedCourse } = useCourses();
  const { getCourseGrade } = useGrades();

  const router = useRouter();
  const onClick = () => {
    router.push("/");
  };
  return (
    <Layout
      header={<HeaderTitle title={seletedCourse || ""} />}
      contain={<ExamsList />}
      value={getCourseGrade(seletedCourse || "")}
      buttons={[{ icon: <HomeIcon />, onClick }]}
    />
  );
}
