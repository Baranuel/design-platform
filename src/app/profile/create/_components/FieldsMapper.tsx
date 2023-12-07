import { Input, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FieldType } from "../types";

type FieldsMapperProps = {
  fields: FieldType[];
};

export const FieldsMapper = ({ fields }: FieldsMapperProps) => {
  const { control } = useFormContext();

  const checkIfArray = (value: string | string[] | undefined) => {
    if (!value) return null;

    if (Array.isArray(value)) {
      return value.map((item) => <span className="my-2" key={item}>{item}</span>);
    }
    return value;
  }

  return fields.map((field, index) => {

    switch (field.type) {
      case "text":
        return (
          <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>{field.label}</label>
            <Controller
              control={control}
              name={field.name}
              render={({ field: controlledField }) => (
                <Input
                  {...controlledField}
                  type="text"
                  placeholder={field.placeholder}
                />
              )}
            />
          </div>
        );
      case "select":
        return ( <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>{field.label}</label>
            <Controller
              control={control}
              name={field.name}
              render={({ field: controlledField }) => (
                <Select {...controlledField}
                showSearch
                 options={field.options} placeholder={field.placeholder} />
              )}
            />
          </div>
        );
      case "select-multi":
        return ( <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>{field.label}</label>
            <Controller
              control={control}
              name={field.name}
              render={({ field: controlledField }) => (
                <Select {...controlledField}
                showSearch
                mode="multiple"
                options={field.options} 
                placeholder={field.placeholder} />
                
              )}
            />
          </div>
        );
        case "read-only":
            return (
                <div key={index + field.name} className="flex flex-col gap-2 ">
                {checkIfArray(field.message) ? <ul className="flex flex-col gap-2">{checkIfArray(field.message)}</ul> : <p>{field.message}</p>}
                </div>
            );
      default:
        return null;
    }
  });
};
