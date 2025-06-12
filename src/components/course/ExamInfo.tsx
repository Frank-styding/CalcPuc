"use client";
import { ProgressCircle } from "@/components/ui/ProgressCircle";

export const ExamInfo = ({
  name,
  grade,
  weight,
  onClick,
}: {
  name: string;
  grade: number;
  weight: number;
  onClick: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className="select-none w-full min-h-20 h-20 grid grid-cols-[80px_auto_100px] bg-[var(--color-dark1)] rounded-lg border border-[var(--color-dark2)]"
    >
      <div className="grid place-content-center text-2xl text-[var(--color-dark3)]">
        {weight}
      </div>
      <div className="select-none grid place-content-center text-2xl text-[var(--color-dark3)]">
        {name}
      </div>
      <div className="grid place-content-center relative">
        <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-xl text-[var(--color-primary)]">
          {grade}
        </div>
        <ProgressCircle
          percentage={(grade / 20) * 100}
          background="var(--color-dark2)"
          fill="var(--color-primary)"
        />
      </div>
    </div>
  );
};
