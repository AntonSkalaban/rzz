"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import { TaskItem } from "@/components/tasks/task-item";
import { useLanguage } from "@/context/language-context"; // Импортируем useLanguage
import { Dialog, DialogTrigger } from "@/components/ui/dialog"; // Import Dialog and DialogTrigger
import { EarnPointsInfoModal } from "@/components/modals/earn-points-info-modal"; // Import the new modal
import Image from "next/image";

const mockOnetimeTasks = [
  { points: 50, description: "Subscribe to @bzzzzr_bot", status: "check" as const },
  { points: 50, description: "Subscribe to @bzzzzr", status: "pending" as const },
  { points: 5, description: "Invite friend (for every 1 friend)", status: "completed" as const },
];

const mockDailyTasks = [
  {
    points: 10,
    description: "Buy/sold items (for every 10 TON)",
    status: "check" as const,
    isDaily: true,
  },
  { points: 10, description: "Boost channel", status: "pending" as const, isDaily: true },
  { points: 1, description: "Add item", status: "pending" as const, isDaily: true },
];

export default function TasksPage() {
  const { t, language } = useLanguage(); // Получаем функцию перевода
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false); // State for the info modal

  return (
    <div className="flex-1 rounded-xl p-4 gradient-bg-marketplace-page p-4 space-y-6">
      {/* Battle 1 / My Points section */}
      <div className="flex justify-center items-center w-full mb-4">
        <div className="relative w-40 h-40 md:w-48 md:h-48">
          {" "}
          {/* Фиксированный размер контейнера */}
          <Image
            src="/images/Воин 1.png"
            alt="warrior"
            fill // Используем fill вместо width/height
            className="object-contain" // Сохраняем пропорции
          />
        </div>
      </div>
      <div className="bg-[var(--bg-secondary)] rounded-xl p-4 card-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[var(--text-primary)]">
            {t("tasksPage.battle")} 1
          </h2>
          <span className="text-[var(--text-muted)] text-sm">01.08.2025 - 07.08.2025</span>
        </div>
        <p className="text-[var(--text-secondary)] mb-4">{t("tasksPage.earnPointsDescription")}</p>

        <div
          className="relative bg-[var(--bg-tertiary)] rounded-lg p-4 flex items-center justify-between"
          style={{
            backgroundImage: "url('/images/battle.png')",
            backgroundSize: "160px 100px",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-gold rounded-full opacity-10" />
          <div
            className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-gold rounded-full opacity-10"
           
          /> */}

          <div className="grid grid-cols-2 gap-2 text-[var(--text-primary)] font-semibold">
            <span className="text-[var(--text-muted)]">{t("tasksPage.daily")}</span>
            <span>100</span>
            <span className="text-[var(--text-muted)]">{t("tasksPage.sales")}</span>
            <span>1150</span>
            <span className="text-[var(--text-muted)]">{t("tasksPage.referrals")}</span>
            <span>855</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[var(--text-muted)] text-sm mb-2">{t("tasksPage.myPoints")}</span>
            <span className="text-[var(--accent-gold)] text-3xl font-bold">2510</span>
            <Dialog key={language} open={isInfoModalOpen} onOpenChange={setIsInfoModalOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="mt-2">
                  <Info className="w-5 h-5 text-[var(--text-muted)]" />
                </Button>
              </DialogTrigger>
              <EarnPointsInfoModal isOpen={isInfoModalOpen} onOpenChange={setIsInfoModalOpen} />
            </Dialog>
          </div>
        </div>
      </div>
      {/* Tasks List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">{t("tasksPage.tasks")}</h2>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {t("tasksPage.onetime")}
          </h3>
          {mockOnetimeTasks.map((task, index) => (
            <TaskItem key={index} {...task} />
          ))}
        </div>
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-[var(--text-primary)]">
            {t("tasksPage.dailyTasks")}
          </h3>
          {mockDailyTasks.map((task, index) => (
            <TaskItem key={index} {...task} />
          ))}
        </div>
      </div>
    </div>
  );
}
