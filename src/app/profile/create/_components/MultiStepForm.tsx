"use client";

import {
  FormProvider,
  useForm,
} from "react-hook-form";

import { RenderForm } from "./RenderForm";
import { clientFormSchema } from "../config/client-form-schema";
import { designerFormSchema } from "../config/designer-form-schema";
import { SelectRole } from "./fields/SelectRole";
;

export const MultistepForm = () => {
  const methods = useForm();
  const role = methods.watch("role");

  return (
    <div className="flex flex-col gap-2">
      <FormProvider {...methods}>
        <SelectRole />
        {role && (
          <RenderForm
            formSchema={
              role === "CLIENT" ? clientFormSchema : designerFormSchema
            }
          />
        )}
      </FormProvider>
    </div>
  );
};
