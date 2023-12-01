"use client";

import { Select } from "antd";
import { useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from "react-hook-form";
import { ClientForm } from "./ClientForm";

const SelectRole = () => {
  const roleOptions = [
    { value: "designer", label: "Designer" },
    { value: "client", label: "Client" },
  ];

  const { control, watch, reset } = useFormContext();
  return (
    <div className="flex flex-col gap-2">
    <span className="flex justify-between">
    <p>What is your role</p>
      <button className="w-[60px] self-end" onClick={() => reset()}>reset</button>
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

  const renderForm = () => {
    if (role === "client") {
      return <ClientForm />;
    }
    if (role === "designer") {
      return <p>Designer</p>;
    }
  };

  return (
    <div>
    <div className="flex flex-col gap-2">
      <FormProvider {...methods}>
        <div className="mt-6 bg-white border border-solid border-stone-200 rounded-md p-8 w-full flex flex-col">
          <SelectRole />
        </div>
        {role && (
            <div className="mt-6 bg-white border border-solid border-stone-200 rounded-md p-8 w-full flex flex-col">
            {renderForm()}
          </div>
        )}
      </FormProvider>

      <div className="flex gap-2 justify-end"></div>
    </div>
    </div>
  );
};
