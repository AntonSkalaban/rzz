"use client";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import type { Raffle } from "@/types/raffle";
import { TonIcon } from "@/components/icons/ton-icon";
import { useLanguage } from "@/context/language-context";
import { formatTimeRemaining } from "@/lib/getDDHHMM";
import { defaultRaffleImg } from "@/constants/constants";

interface RaffleCardProps {
  raffle: Raffle;
  onViewDetails: (raffle: Raffle) => void;
}

export function RaffleCard({ raffle, onViewDetails }: RaffleCardProps) {
  const { t } = useLanguage();
  const [timeRemaining, setTimeRemaining] = useState(() => formatTimeRemaining(raffle.endTime));

  useEffect(() => {
    if (raffle.status !== "active") return;

    const timer = setInterval(() => {
      setTimeRemaining(formatTimeRemaining(raffle.endTime));
    }, 1000);

    return () => clearInterval(timer);
  }, [raffle.endTime, raffle.status]);

  const isEnded = raffle.status === "ended" || timeRemaining === "Ended";
  const isDrawing = raffle.status === "drawing";

  return (
    <div
      className={cn(
        "relative bg-[var(--bg-secondary)] rounded-xl p-3 card-shadow",
        "hover:-translate-y-1 hover:card-shadow-hover transition-all duration-200 ease-in-out",
        isEnded && "opacity-70 grayscale",
        "h-full flex flex-col" 
      )}
    >
      {/* Image and status badge */}
      <div className="relative w-full aspect-[3/4] bg-[var(--bg-tertiary)] rounded-lg overflow-hidden mb-3 flex-shrink-0">
        <Image
          src={raffle.imageUrl || defaultRaffleImg}
          alt={raffle.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
        <div className="absolute top-2 left-2">
          {isEnded ? (
            <Badge variant="destructive">{t("raffleCard.ended")}</Badge>
          ) : isDrawing ? (
            <Badge variant="warning">{t("raffleCard.drawing")}</Badge>
          ) : (
            <Badge variant="gold">{t("raffleCard.active")}</Badge>
          )}
        </div>
      </div>

      {/* Content area - растягивается и толкает кнопку вниз */}
      <div className="flex flex-col flex-1">
        {/* Name and Prize */}
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1 min-h-[60px]">
            <h3 className="text-lg font-bold text-[var(--text-primary)] leading-tight line-clamp-2">
              {raffle.name}
            </h3>
            <span className="text-[var(--accent-gold)] text-sm font-bold mt-1 block">
              {t("raffleDetailModal.prize")}
            </span>
          </div>
          <span className="text-[var(--text-muted)] text-sm font-mono flex-shrink-0 ml-2">
            #{raffle.id.substring(0, 4)}
          </span>
        </div>

        {/* Entry Cost */}
        <div className="flex items-center justify-between text-[var(--text-secondary)] text-sm mb-2">
          {raffle.costToJoin === 0 ? (
            <Badge variant="gold" className="text-sm p-0" style={{ height: "17.5px" }}>
              {t("raffleCard.freeEntry")}
            </Badge>
          ) : (
            <div className="flex items-center gap-1">
              <TonIcon width={14} height={14} className="text-[var(--text-muted)]" />
              <span className="text-[var(--text-muted)]">
                {raffle.costToJoin} {t("raffleDetailModal.entryCost")}
              </span>
            </div>
          )}
        </div>

        {/* Participants and Countdown */}
        <div className="flex items-center justify-between text-[var(--text-secondary)] text-sm mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>
              {raffle.participants}/{raffle.maxParticipants}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}</span>
          </div>
        </div>

        {/* Action Button - теперь прижмется к низу */}
        <Button
          variant="primary"
          className="w-full mt-3"
          onClick={() => onViewDetails(raffle)}
          disabled={isEnded}
        >
          {raffle.userParticipated || isEnded
            ? t("raffleCard.viewDetails")
            : t("raffleCard.joinRaffle")}
        </Button>
      </div>
    </div>
  );
}
