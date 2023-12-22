"use client";

import { Button } from "antd";
import { useTransition } from "react";

type ServerActionButtonProps<T> = {
  action: () => Promise<void>;
  children: React.ReactNode;
  className?: string;
};

export const ServerActionButton = <T, >({action, children, className}:ServerActionButtonProps<T>) => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={className}
      loading={isPending}
      onClick={() => {
        startTransition(async () => await action());
      }}
    >
      {children}
    </Button>
  );
};
