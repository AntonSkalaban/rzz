import { ReactNode } from "react";
import { ProgressData } from "../LevelProgress/LevelProgress";

interface ProgressDataProps extends ProgressData {}

const getLeftPosition = (index: number, length: number) => {
  return `${((index + 1) / length) * 100}%`;
};

const formatNumberWithK = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed() + "k";
  }
  return num.toString();
};

const calculateProgressPosition = (currentValue: number, thresholds: number[]): number => {
  // Если текущее значение меньше первого порога
  if (currentValue < thresholds[0]) {
    return 0;
  }
  
  // Если текущее значение больше последнего порога
  if (currentValue >= thresholds[thresholds.length - 1]) {
    return 100;
  }
  
  // Находим интервал, в котором находится текущее значение
  for (let i = 0; i < thresholds.length - 1; i++) {
    if (currentValue >= thresholds[i] && currentValue < thresholds[i + 1]) {
      const intervalStart = thresholds[i];
      const intervalEnd = thresholds[i + 1];
      const intervalWidth = 100 / (thresholds.length); // Ширина каждого интервала в процентах
      
      console.log('Это номер интервала', i)
      console.log("интервал в ")
      console.log(thresholds[i])
      console.log(currentValue)
      console.log(thresholds[i + 1])
      
      // Прогресс внутри текущего интервала
      const progressInInterval = (currentValue - intervalStart) / (intervalEnd - intervalStart);
      
      console.log('прогресс в интервале ', progressInInterval)
    
      // Общая позиция = позиция начала интервала + прогресс внутри интервала

      return (i + 1)* intervalWidth + progressInInterval * intervalWidth;
    }
  }
  
  return 0;
};



const RatesList = ({
  title,
  value,
  position = "bottom",
}: {
  title: ReactNode;
  value: number[] | ReactNode[];
  position?: "top" | "bottom";
}) => {
  return (
    <div
      className="absolute w-full flex justify-between text-xs text-[var(--text-muted)]"
      style={{ top: position === "top" ? "-20px" : "15px" }}
    >
      <span
        className="text-[var(--accent-gold)] text-sm font-small mb-1 text-center"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        {title}
      </span>

      {value.map((val, index) => (
        <span
          key={index}
          className="text-[var(--accent-gold)] text-sm font-medium mb-1 text-center"
          style={{
            position: "absolute",
            left: getLeftPosition(index, value.length),
            transform: "translateX(calc(-50% - 5px))",
          }}
        >
          {val}
        </span>
      ))}
    </div>
  );
};

export const ProgressBar = ({
  currentValue,
  commissionRates,
  className = "",
}: ProgressDataProps) => {

  const volumeValues = commissionRates[0].value as number[];
  const rateValues = commissionRates[1].value as number[];
  
  const progressPosition = calculateProgressPosition(currentValue, volumeValues);

  console.log(progressPosition)

  return (
    <div className={`bg-[var(--bg-secondary)] rounded-xl p-6 card-shadow ${className}`}>
      {/* Progress Bar с делениями */}
      <div className="relative w-full h-3 bg-[var(--bg-tertiary)] rounded-full mb-1 mt-1">
        {/* Деления шкалы */}
        <RatesList
          title={commissionRates[0].title}
          value={commissionRates[0].value.map(formatNumberWithK)}
          position={"top"}
        />
        <RatesList title={commissionRates[1].title} value={commissionRates[1].value} />
        <div className="absolute inset-0 flex justify-between items-center">
          {commissionRates[0].value.map((_, index) => (
            <div
              key={index}
              className="h-full bg-white rounded-full border border-white/30"
              style={{
                left: getLeftPosition(index, commissionRates[0].value.length),
                position: "absolute",
                width: "10px",
                transform: "translateX(-100%)",
              }}
            />
          ))}
        </div>

        {/* Заполнение прогресса */}
        <div
          className="gradient-gold h-full rounded-full transition-all duration-300"
          style={{ width: `${progressPosition}%` }}
        />
      </div>
    </div>
  );
};
