"use client";
import { SearchHeader } from "@/components/ui/SearchHeader";
import Layout from "@/components/ui/layout";
import { AddIcon } from "@/components/icons/AddIcon";
import { CancelIcon } from "@/components/icons/CancelIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CourseSelectorList } from "@/components/findCourse/CourseSelectorList";
import { useCourseSelector } from "@/hooks/useCourseSelector";
import { useCourseManager } from "@/hooks/useCourseManager";
import { useVerificationModal } from "@/hooks/useVerificationModal";
import { useApiCourses } from "@/hooks/useApiCourses";

export default function Course() {
  const router = useRouter();
  const { addCourse } = useCourseManager();
  const { coursesSelected, clearSelection } = useCourseSelector();
  const { showValidation } = useVerificationModal();
  const { courses: apiCourses } = useApiCourses();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleConfirmAdd = () => {
    coursesSelected.forEach((courseName) => {
      const courseData = apiCourses.find(
        (course) => course.name === courseName
      );
      if (courseData) {
        addCourse(courseData);
      }
    });

    clearSelection();
    router.push("/");
  };

  const handleAddClick = () => {
    if (coursesSelected.length === 0) {
      showValidation("No hay cursos seleccionados", "Aceptar", () => {});
      return;
    }
    showValidation(
      `¿Agregar ${coursesSelected.length} curso${
        coursesSelected.length > 1 ? "s" : ""
      }?`,
      "Agregar",
      handleConfirmAdd
    );
  };

  const handleAccept = () => {
    router.push("/");
  };

  const handleCancelClick = () => {
    if (coursesSelected.length > 0) {
      showValidation(
        `¿Esta seguro que quiere descartar ${coursesSelected.length} elementos`,
        "Aceptar",
        handleAccept
      );
      return;
    }
    router.push("/");
  };

  return (
    <Layout
      header={
        <SearchHeader onSearch={handleSearch} placeholder="Buscar cursos..." />
      }
      contain={<CourseSelectorList searchQuery={searchQuery} />}
      buttons={[
        {
          icon: <AddIcon />,
          onClick: handleAddClick,
        },
        {
          icon: <CancelIcon />,
          onClick: handleCancelClick,
        },
      ]}
    />
  );
}
