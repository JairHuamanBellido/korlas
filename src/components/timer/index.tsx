interface Props {
  percentage: number;
  fill: string;
}

export default function Timer({ percentage, fill }: Props) {
  return (
    <div className="absolute bottom-1 right-1">
      <svg className="w-[30px] h-[30px]">
        <Progress fill={fill} percentage={percentage} />
      </svg>
    </div>
  );
}

function Progress({ percentage, fill }: Props) {
  return (
    <circle
      cx="50%"
      cy="50%"
      r="8"
      style={{
        filter: `drop-shadow(0 0 6px ${fill})`,
        strokeLinecap: "round",
        strokeDasharray: 100,
        transformOrigin: "center center",
        transform: "rotate(-90deg)",
        transition: "all .2s ease",
      }}
      className="fill-none"
      pathLength="16"
      stroke={fill}
      strokeWidth="2"
      strokeDashoffset={-(percentage / 100) * 16}
    />
  );
}
