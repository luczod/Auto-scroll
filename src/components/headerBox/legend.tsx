import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export function Legend({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors shadow h-8 rounded-md px-3 text-xs md:h-10 md:rounded-md md:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
