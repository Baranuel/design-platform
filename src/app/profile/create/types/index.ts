
export type FieldType = {
    name: string;
    type: string;
    placeholder?: string;
    label?: string;
    options?: { value: string; label: string }[];
    message?: string | string[];
  };
  export type StepType = {
    category: string;
    description?: string;
    fields: FieldType[];
  };
  
  export type FormProps = {
    [key: string]: StepType;
  };
  
  export type RenderFormProps = {
    formSchema: FormProps;
  };