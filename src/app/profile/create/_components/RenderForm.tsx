import { Button, FormProps } from "antd";
import { useCallback,  useMemo, useState } from "react";
import { FieldsMapper } from "./fields/FieldsMapper";
import { useFormContext } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { RenderFormProps, StepType } from "../types";
import { axiosInstance } from "@/app/network/axios-instance";


export const RenderForm = ({ formSchema }: RenderFormProps) => {
  const {formState:{dirtyFields}, handleSubmit} = useFormContext()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1);
  const maxSteps = Object.keys(formSchema).length;
  const stepKey = `step-${currentStep}` as keyof typeof formSchema;
  const formData = useMemo(() => formSchema[stepKey], [stepKey, formSchema]);

  const filledFields = formData.fields.map(field => { return dirtyFields[field.name] === true && field.name})

  const renderFields = useCallback((formData: StepType) => {
    return <FieldsMapper fields={formData.fields} />;
  }, []);

  async function onSubmit(data: FormProps) {
    const response = await axiosInstance.put('clerk-profile', data)
    const profileObject = {
      clerkId: response.data.id,
      role: response.data.publicMetadata.role,
    }
    const createUser = await axiosInstance.post('user', profileObject)
    if(createUser.data.success) {
      router.push('/profile')
    }
  }

  return (
    <div className="flex flex-col">
     <div className="my-4">
     <span className="text-lg  flex gap-2">
        <span className="text-purple text-xl sm:text-base font-bold">{`${currentStep} / ${maxSteps}`}</span>{" "}
        <h3 className="font-medium sm:text-base">{formData.category}</h3>
      </span>
      <p className="text-sm text-stone-600">{formData.description}</p>
     </div>

      <form className="p-8 sm:p-4 flex flex-col gap-2  border border-solid border-stone-300 rounded-md" autoComplete="off" >
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
            className="p-2 w-[150px] h-full mt-2 shadow-none"
          >
            Submit
          </Button>
        )}
      </div>
    </div>
  );
};
