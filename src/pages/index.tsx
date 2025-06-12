"use client";
import { EditIcon } from "@/components/icons/EditIcon";
import { HeaderTitle } from "../components/ui/HeaderTitle";
import { useCoursesEditor } from "@/hooks/useCoursesEditor";
import { CancelIcon } from "@/components/icons/CancelIcon";
import { DeleteIcon } from "@/components/icons/DeleteIcon";
import { CourseList } from "../components/home/CourseList";
import { useVerificationModal } from "@/hooks/useVerificationModal";
import { useCourseManager } from "@/hooks/useCourseManager";
import { AddIcon } from "@/components/icons/AddIcon";
import { useRouter } from "next/router";
import Layout from "@/components/ui/layout";

export default function Home() {
  const { deleteCourses } = useCourseManager();
  const { isEditing, setIsEditing, coursesSelected } = useCoursesEditor();
  const { showValidation } = useVerificationModal();
  const router = useRouter();

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const onAccept = () => {
    deleteCourses(coursesSelected);
    setIsEditing(false);
  };

  const handleDelete = () => {
    showValidation("¿Esta seguro?", "Eliminar", onAccept);
  };

  const handleAdd = () => {
    router.push("/findCourse");
  };

  return (
    <Layout
      header={
        <HeaderTitle
          title="cursos"
          onLongPress={() => router.push("/settings")}
        />
      }
      contain={<CourseList />}
      buttons={
        !isEditing
          ? [
              { icon: <EditIcon />, onClick: handleEdit },
              { icon: <AddIcon />, onClick: handleAdd },
            ]
          : [
              { icon: <CancelIcon />, onClick: handleCancel },
              { icon: <DeleteIcon />, onClick: handleDelete },
            ]
      }
    />
  );
}
