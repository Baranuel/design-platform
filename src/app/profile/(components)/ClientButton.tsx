"use client";


import { Button } from "antd";
import { useTransition } from "react";

export const ClientButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(async () => {

        });
      }}
    >
      Click me
    </Button>
  );
};
