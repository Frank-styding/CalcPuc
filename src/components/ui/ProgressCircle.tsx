const cleanPercentage = (percentage: number) => {
  const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
  const isTooHigh = percentage > 100;
  return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
};

const Circle = ({
  colour,
  percentage = 0,
}: {
  colour: string;
  percentage?: number;
}) => {
  const r = 30;
  const circ = 2 * Math.PI * r;
  const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
  return (
    <circle
      r={r}
      cx={35}
      cy={35}
      fill="transparent"
      stroke={strokePct !== circ ? colour : ""} // remove colour as 0% sets full circumference
      strokeWidth={"4px"}
      strokeDasharray={circ}
      strokeDashoffset={percentage ? strokePct : 0}
      strokeLinecap="round"
    ></circle>
  );
};

export const ProgressCircle = ({
  percentage,
  fill: colour,
  background,
}: {
  percentage: number;
  fill: string;
  background: string;
}) => {
  const pct = cleanPercentage(percentage);
  return (
    <div className="grid place-content-center select-none">
      <svg width={70} height={70}>
        <Circle colour={background} percentage={100} />
        <Circle colour={colour} percentage={pct} />
      </svg>
    </div>
  );
};
