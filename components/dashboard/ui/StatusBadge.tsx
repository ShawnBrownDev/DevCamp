import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: 'completed' | 'in-progress' | 'upcoming';
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        {
          "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100":
            status === "completed",
          "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100":
            status === "in-progress",
          "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100":
            status === "upcoming",
        }
      )}
    >
      {status}
    </span>
  );
}