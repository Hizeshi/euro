// src/app/components/shared/title.tsx

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface Props {
  className: string;
  children: ReactNode;
}
export const Title: React.FC<Props> = ({ className, children }) => {
  return (
    <h1 className={cn("text-2xl font-semibold text-center", className)}>
      {children}
    </h1>
  );
};
