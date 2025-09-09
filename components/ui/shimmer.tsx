"use client";

import { cn } from "@/lib/utils";

function Shimmer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="shimmer"
      className={cn(
        "relative overflow-hidden bg-neutral-200 dark:bg-neutral-800 rounded-md before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export { Shimmer };
