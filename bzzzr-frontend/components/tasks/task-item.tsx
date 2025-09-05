"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"
import { useLanguage } from "@/context/language-context" // Импортируем useLanguage

interface TaskItemProps {
  points: number
  description: string
  status: "pending" | "completed" | "check"
  onCheck?: () => void
  isDaily?: boolean
}

export function TaskItem({ points, description, status, onCheck, isDaily }: TaskItemProps) {
  const { t } = useLanguage() // Получаем функцию перевода

  return (
    <div className="flex items-center justify-between bg-[var(--bg-tertiary)] p-3 rounded-lg">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center bg-[var(--accent-gold)] rounded-full text-black font-bold text-sm">
          {points}
        </div>
        <div>
          <p className="text-[var(--text-primary)] font-semibold">{description}</p>
          {isDaily && <span className="text-[var(--text-muted)] text-xs">{t("tasksPage.dailyTasks")}</span>}
        </div>
      </div>
      {status === "pending" && (
        <Button variant="secondary" size="sm" onClick={onCheck}>
          {t("tasksPage.check")}
        </Button>
      )}
      {status === "completed" && <CheckCircle className="w-6 h-6 text-[var(--success)]" />}
      {status === "check" && (
        <Button variant="gold" size="sm" onClick={onCheck}>
          {t("tasksPage.check")}
        </Button>
      )}
    </div>
  )
}
