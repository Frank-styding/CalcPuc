export const CheckBox = ({
  onChange,
  defaultValue,
  value,
}: {
  onChange?: (value: boolean) => void;
  value?: boolean;
  defaultValue?: boolean;
}) => {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    onChange?.((e.target as unknown as { value: boolean }).value);
  };

  const className = [
    "bg-[var(--color-dark1)] w-10 h-10 appearance-none border-2 border-[var(--color-dark2)] rounded-lg",
    "transition duration-80 ease-in",
    "checked:bg-[var(--color-primary)] checked:border-0 checked:animate-scale-pulse",
  ].join(" ");

  return (
    <input
      onChange={handleChange}
      defaultChecked={defaultValue}
      className={className}
      checked={value}
      type="checkbox"
    />
  );
};
