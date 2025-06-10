export interface IIconButton {
  icon: React.ReactNode;
  onClick?: () => void;
}

export const IconButton = ({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
}) => {
  const className = `cursor-pointer grid place-content-center p-4 rounded-full bg-[var(--color-dark1)] border border-1 border-[var(--color-dark2)]`;
  return (
    <div className={className} onClick={onClick}>
      {icon}
    </div>
  );
};
