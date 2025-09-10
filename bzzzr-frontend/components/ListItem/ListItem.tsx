import Image from "next/image";
import { cn } from "@/lib/utils";
import { TonIcon } from "../icons/ton-icon";

interface ItemPriceWithDateProps {
  price: number;
  date: string;
}

export function ItemPriceWithDate({ price, date }: ItemPriceWithDateProps) {
  return (
    <div className="flex items-center text-sm text-[var(--text-muted)]">
      <TonIcon width={16} height={16} className="mr-1 text-[var(--accent-gold)]" />
      <span>{price}</span>
      <span className="ml-2">{date}</span>
    </div>
  );
}

interface TransactionTypeBadgeProps {
  type: "Покупка" | "Продажа";
}

export function TransactionTypeBadge({ type }: TransactionTypeBadgeProps) {
  return (
    <span
      className={cn("font-semibold", {
        "text-[var(--success)]": type === "Покупка",
        "text-[var(--error)]": type === "Продажа",
      })}
    >
      {type}
    </span>
  );
}

// interface ItemImageContainerProps {
//   src: string | undefined;
//   alt: string;
// }
// export function ItemImageContainer({ src, alt }: ItemImageContainerProps) {
//   return (
//     <div className="flex items-center gap-3">
//       <Image
//         src={src || "/placeholder.svg?height=48&width=48&query=item thumbnail"}
//         alt={alt}
//         width={48}
//         height={48}
//         className="rounded-md"
//       />
//     </div>
//   );
// }
