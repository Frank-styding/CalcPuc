export const CancelIcon = ({
  size = 24,
  color = "var(--color-primary)",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 24}
      height={size || 24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        d="m5 19l7-7m0 0l7-7m-7 7L5 5m7 7l7 7"
      />
    </svg>
  );
};
