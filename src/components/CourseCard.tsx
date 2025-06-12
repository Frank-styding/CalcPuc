"use client";
import { CheckBox } from "./ui/CheckBox";
import { ProgressCircle } from "./ui/ProgressCircle";

export const CourseCard = ({
  name,
  showCheckBox,
  value,
  onChange,
  onClick,
  grade,
  disabled = false,
}: {
  name: string;
  showCheckBox?: boolean;
  value?: boolean;
  onChange?: () => void;
  onClick?: () => void;
  grade?: number;
  disabled?: boolean;
}) => {
  return (
    <div
      onClick={disabled ? undefined : onClick}
      className={`grid grid-cols-[80px_auto_100px] w-[90vw] min-h-20 h-20 bg-[var(--color-dark1)] rounded-lg border border-[var(--color-dark2)] ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      <div className="grid place-content-center">
        {showCheckBox != undefined && showCheckBox && (
          <CheckBox value={value} onChange={onChange} />
        )}
      </div>
      <div className="select-none grid place-content-center text-2xl text-[var(--color-dark3)]">
        {name}
        {disabled && (
          <span className="text-sm text-[var(--color-dark2)] ml-2">
            (Ya agregado)
          </span>
        )}
      </div>
      {grade != undefined ? (
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
      ) : (
        <div></div>
      )}
    </div>
  );
};
