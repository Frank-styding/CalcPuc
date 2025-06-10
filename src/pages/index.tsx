import { IconButton } from "@/components/IconButton";
import { AddIcon } from "@/components/icons/AddIcon";
import { GearIcon } from "@/components/icons/GearIcon";
import { HomeIcon } from "@/components/icons/HomeIcon";
import Layout from "@/components/layout";
import { ProgressCircle } from "@/components/ProgressCircle";
import { useRouter } from "next/router";

export const Header = ({ text }: { text: string }) => {
  return (
    <div className="w-screen h-[75px] relative">
      <div className="grid place-content-center absolute top-2 left-2">
        <IconButton icon={<GearIcon size={24} />} />
      </div>
      <div className="w-screen h-full grid place-content-center text-3xl text-[var(--color-dark3)]">
        {text}
      </div>
    </div>
  );
};

export const Course = ({ name }: { name: string }) => {
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    router.push("/course");
  };
  return (
    <div
      onClick={handleClick}
      className="cursor-pointer grid grid-cols-[auto_100px] w-[90vw] min-h-20 h-20 bg-[var(--color-dark1)] rounded-lg border border-[var(--color-dark2)]"
    >
      <div className="grid place-content-center text-2xl text-[var(--color-dark3)]">
        {name}
      </div>
      <div className="grid place-content-center">
        <ProgressCircle
          percentage={60}
          colour="var(--color-primary)"
          textColour="var(--color-dark3)"
        />
      </div>
    </div>
  );
};
export const CourseList = () => {
  return (
    <div className="w-screen h-full flex flex-col gap-4 items-center pt-8 pb-25 overflow-y-scroll hide-scrollbar">
      <Course name="AMGA" />
      <Course name="A" />
      <Course name="A" />
      <Course name="A" />
      <Course name="A" />
      <Course name="A" />
      <Course name="A" />
      <Course name="A" />
      <Course name="A" />
    </div>
  );
};

export default function Home() {
  return (
    <Layout
      header={<Header text="cursos" />}
      contain={<CourseList />}
      buttons={[{ icon: <HomeIcon /> }, { icon: <AddIcon /> }]}
    />
  );
}
