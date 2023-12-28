"use client";

import { Button } from "antd";
import { useTransition } from "react";

type ServerActionButtonProps<T> = {
  action: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: "primary" | "dashed" | "link" | "text" | undefined;
};

export const ServerActionButton = <T, >({action, children, className, type,disabled}:ServerActionButtonProps<T>) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={className}
      loading={isPending}
      onClick={() => {
        startTransition(async () => await action());
      }}
      type={type}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
