import { ReactNode } from "react";
import { StatCard } from "../profile/stat-card";
import { ProgressBar } from "../ProgressBar/ProgressBar";

export interface ProgressData {
  currentValue: number;
  commissionRates: { title: ReactNode; value: number[] }[];
  className?: string;
}

interface LevelProgressProps {
  title: string;
  stats: {
    label: string;
    value: string;
  }[];
  progressData: ProgressData;
  className?: string;
}

export const LevelProgress = ({
  title,
  stats,
  progressData,
  className = "",
}: LevelProgressProps) => {
  return (
    <div className={`mb-6 ${className}`}>
      <h3 className="text-lg font-bold text-[var(--accent-gold)] mb-2">{title}</h3>

      <div className="grid grid-cols-3 gap-2 mb-4">
        {stats.map(({ label, value }) => (
          <StatCard
            key={label}
            label={label}
            value={value}
            className={"bg-[var(--bg-surface-primary)]"}
          />
        ))}
      </div>

      <ProgressBar {...progressData} />
    </div>
  );
};
