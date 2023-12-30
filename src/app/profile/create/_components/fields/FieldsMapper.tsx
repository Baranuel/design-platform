import { Input, Select } from "antd";
import { Controller, useFormContext } from "react-hook-form";
import { FieldType } from "../../types";

type FieldsMapperProps = {
  fields: FieldType[];
};

export const FieldsMapper = ({ fields }: FieldsMapperProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const checkIfArray = (value: string | string[] | undefined) => {
    if (!value) return null;

    if (Array.isArray(value)) {
      return value.map((item) => (
        <span className="my-2" key={item}>
          {item}
        </span>
      ));
    }
    return value;
  };

  const urlValidator = (url: string) => {
    const regex = new RegExp(/^www\.\w+\.\w+$/);
    return regex.test(url)  || !url ? true : false;
  };

  return fields.map((field, index) => {
    switch (field.type) {
      case "text":
        return (
          <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>
              {field.label}
            </label>
            <Controller
              control={control}
              name={field.name}
              rules={{
                required: true,
              }}
              render={({ field: controlledField }) => (
                <Input
                  {...controlledField}
                  type="text"
                  placeholder={field.placeholder}
                  className={`${
                    errors?.[field.name] && "border-solid border-red-500"
                  }`}
                />
              )}
            />
            <span className="text-[11px] text-red-500">
              {errors?.[field.name] && " required field"}
            </span>
          </div>
        );
      case "url":
        return (
          <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>
              {field.label}
            </label>
            <Controller
              control={control}
              name={field.name}
              rules={{
                validate: urlValidator,
              }}
              render={({ field: controlledField }) => (
                <Input
                  {...controlledField}
                  type="text"
                  placeholder={"example: www.google.com"}
                  className={`${
                    errors?.[field.name] && "border-solid border-red-500"
                  }`}
                />
              )}
            />
            <span className="text-[11px] text-red-500">
              {errors?.[field.name] && "needs to be valid url"}
            </span>
          </div>
        );
      case "select":
        return (
          <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>
              {field.label}
            </label>
            <Controller
              control={control}
              name={field.name}
              render={({ field: controlledField }) => (
                <Select
                  {...controlledField}
                  showSearch
                  className={`${
                    errors?.[field.name] && "border-solid border-red-500"
                  }`}
                  options={field.options}
                  placeholder={field.placeholder}
                />
              )}
            />
              <span className="text-[11px] text-red-500">
              {errors?.[field.name] && " required field"}
            </span>
          </div>
        );
      case "select-multi":
        return (
          <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>
              {field.label}
            </label>
            <Controller
              control={control}
              name={field.name}
              render={({ field: controlledField }) => (
                <Select
                  {...controlledField}
                  className={`${
                    errors?.[field.name] && "border-solid border-red-500"
                  }`}
                  showSearch
                  mode="multiple"
                  options={field.options}
                  placeholder={field.placeholder}
                />
              )}
            />
            <span className="text-[11px] text-red-500">
              {errors?.[field.name] && " required field"}
            </span>
          </div>
        );
      case "read-only":
        return (
          <div key={index + field.name} className="flex flex-col gap-2 ">
            {checkIfArray(field.message) ? (
              <ul className="flex flex-col gap-2">
                {checkIfArray(field.message)}
              </ul>
            ) : (
              <p>{field.message}</p>
            )}
          </div>
        );
      case "textarea":
        return (
          <div key={index + field.name} className="flex flex-col gap-2 ">
            <label className="text-sm font-bold" htmlFor={field.name}>
              {field.label}
            </label>
            <Controller
              control={control}
              name={field.name}
              rules={{
                required: true,
              }}
              render={({ field: controlledField }) => (
                <Input.TextArea
                  className={`${
                    errors?.[field.name] && "border-solid border-red-500"
                  } min-h-[100px]`}
                  {...controlledField}
                  placeholder={field.placeholder}
                />
              )}
            />
             <span className="text-[11px] text-red-500">
              {errors?.[field.name] && " required field"}
            </span>
          </div>
        );
      default:
        return null;
    }
  });
};
