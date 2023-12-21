"use client";

import { handleEvent } from "@/app/(actions)/pusher-events";
import { Button } from "antd";
import { useTransition } from "react";

export const ClientButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {
          await handleEvent();
        });
      }}
    >
      Click me
    </Button>
  );
};
