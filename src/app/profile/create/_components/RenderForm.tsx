import { Button, FormProps } from "antd";
import { useCallback, useMemo, useState } from "react";
import { FieldsMapper } from "./fields/FieldsMapper";
import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RenderFormProps, StepType } from "../types";
import { axiosInstance } from "@/app/network/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { useUpdateProfileMutation } from "../../mutations/update-profile-mutation";

export const RenderForm = ({ formSchema }: RenderFormProps) => {
  const {
    formState: { dirtyFields },
    watch,
    handleSubmit,
  } = useFormContext();

  const {mutate, status} = useUpdateProfileMutation()
  const [currentStep, setCurrentStep] = useState(1);
  const maxSteps = Object.keys(formSchema).length;
  const stepKey = `step-${currentStep}` as keyof typeof formSchema;
  const formData = useMemo(() => formSchema[stepKey], [stepKey, formSchema]);

  const filledFields = formData.fields.map((field) => {
    return dirtyFields[field.name] === true && field.name;
  });

  const renderFields = useCallback((formData: StepType) => {
    return <FieldsMapper fields={formData.fields} />;
  }, []);

  async function onSubmit(data: FormProps) {
    mutate(data);
  }

  return (
    <div className="flex flex-col ">
      <div className="my-4">
        <span className="text-lg  flex gap-2">
          <span className="text-purple text-xl sm:text-base font-bold">{`${currentStep} / ${maxSteps}`}</span>{" "}
          <h3 className="font-medium sm:text-base">{formData.category}</h3>
        </span>
        <p className="text-sm text-stone-600">{formData.description}</p>
      </div>

      <form
        className="p-8 sm:p-4 flex flex-col gap-2  border border-solid border-stone-300 rounded-md "
        autoComplete="off"
      >
        {renderFields(formData)}
      </form>

      <div className="flex justify-end gap-2  border-stone-300">
        <Button
          disabled={currentStep === 1}
          onClick={() => setCurrentStep(currentStep - 1)}
          className="p-2 w-[150px] mt-2 h-full "
        >
          Back
        </Button>
        {currentStep !== maxSteps ? (
          <Button
            type="primary"
            disabled={filledFields.includes(false)}
            onClick={() => setCurrentStep(currentStep + 1)}
            className="p-2 w-[150px] h-full mt-2 shadow-none"
          >
            Next
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={handleSubmit(onSubmit)}
            loading={status !== "idle"}
            className="p-2 w-[150px] h-full mt-2 shadow-none"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
