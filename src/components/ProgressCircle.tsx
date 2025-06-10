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

const Value = ({
  percentage,
  colour,
}: {
  percentage: number;
  colour: string;
}) => {
  return (
    <text
      x="50%"
      y="50%"
      dominantBaseline="central"
      textAnchor="middle"
      stroke={colour}
      strokeWidth="0.5px"
      fontSize={"1em"}
      fill={colour}
    >
      {percentage.toFixed(0)}%
    </text>
  );
};

export const ProgressCircle = ({
  percentage,
  colour,
  textColour,
}: {
  percentage: number;
  colour: string;
  textColour: string;
}) => {
  const pct = cleanPercentage(percentage);
  return (
    <div className="grid place-content-center ">
      <svg width={70} height={70}>
        <Circle colour={colour} percentage={pct} />
        <Value percentage={pct} colour={textColour} />
      </svg>
    </div>
  );
};
