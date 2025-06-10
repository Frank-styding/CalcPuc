export const AddIcon = ({
  size = 22,
  color = "#FED32C",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      width={size || "28"}
      height={size || "28"}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M14 8H8V14H6V8H0V6H6V0H8V6H14V8Z" fill={color} />
    </svg>
  );
};
