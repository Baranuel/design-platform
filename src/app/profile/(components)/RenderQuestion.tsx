import React, { useEffect } from "react";
import { Question } from "@prisma/client";
import { Controller, useFormContext } from "react-hook-form";
import { Input, Tooltip, Upload } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { UploadFiles } from "./UploadFiles";

interface Props {
  question: Question;
}

export const RenderQuestion = ({ question}: Props) => {
  const { control, formState:{errors} } = useFormContext();

  const validator = (data: string) => {
  const valid  = data.length && data.length >= 50 ? true : false
   return valid
  }


  return (
    <div className=" flex flex-col gap-4">
      <h3>{question.question}</h3>
      
      {question.toolTip && (
        <Tooltip  className="flex gap-1 w-fit hover:cursor-pointer" placement="right" title={question.toolTip}>
            <QuestionCircleOutlined className="text-purple" />
          <span>Why is this information relevant ?</span>
        </Tooltip>
      )}
    {question.title === 'files' ? 
    <Controller
    key={question.id}
        name={question.title}
        control={control}
        render={({ 
          field,
         }) => <UploadFiles  onChange={field.onChange} />}    
    />  :  <Controller 
      key={question.id}
      name={question.title}
      rules={{ required:true, validate: validator  }}
      control={control}
      render={({ 
        field,
       }) => {
        return  <Input.TextArea   className="min-h-[200px]" {...field}  />
       }}
    />}
    </div>
  );
};
