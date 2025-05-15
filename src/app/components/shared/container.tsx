import { cn } from "@/lib/utils";
import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Container: React.FC<Props> = ({ children, className }) => {
  return <div className={cn("max-w-5xl m-auto", className)}>{children}</div>;
};
