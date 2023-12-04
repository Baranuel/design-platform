"use client";

import { Button, Select } from "antd";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";

import { RenderForm } from "./RenderForm";
import { clientFormSchema } from "./client-form-schema";





const SelectRole = () => {
  const roleOptions = [
    { value: "designer", label: "Offer my design skills " },
    { value: "client", label: "Have my website redesigned" },
  ];
  const { control, watch, reset } = useFormContext();

  return (
    <div className="flex flex-col gap-2 mt-6">
      <span className="flex items-center justify-between">
        <p className="font-semibold">How are you going to use design platform ?</p>
        <Button className="w-[60px] self-end" onClick={() => reset()}>
          reset
        </Button>
      </span>
      <Controller
        name="role"
        control={control}
        disabled={watch("role")!!}
        render={({ field }) => (
          <Select
            {...field}
            className="w-full"
            options={roleOptions}
            placeholder="Select your role"
          />
        )}
      />
    </div>
  );
};

export const MultistepForm = () => {
  const methods = useForm();
  const role = methods.watch("role");

  return (
      <div className="flex flex-col gap-2">
        <FormProvider {...methods}>
          <SelectRole />
          {role && <RenderForm formSchema={clientFormSchema} />}
        </FormProvider>
      </div>

  );
};
