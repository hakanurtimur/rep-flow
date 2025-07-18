"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { PageBodyInnerTitle } from "@/components/layout-related/page-body-inner-title";

interface PageHeaderProps {
  title: string;
  children: ReactNode;
  className?: string;
}

export function PageBodyInnerHeader({
  title,
  children,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex w-full items-center justify-between gap-4 flex-wrap",
        className,
      )}
    >
      <PageBodyInnerTitle text={title} />
      <div className="flex items-center gap-2">{children}</div>
    </div>
  );
}
