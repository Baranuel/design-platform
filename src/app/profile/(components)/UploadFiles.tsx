"use client";

import { InboxOutlined } from "@ant-design/icons";
import { Spin, Upload, UploadFile } from "antd";
import { useCallback, useRef, useState, useTransition } from "react";


import { UploadChangeParam } from "antd/es/upload";
import { uploadFile } from "@/app/(actions)/proposal-actions";
import { useFormContext } from "react-hook-form";



const { Dragger } = Upload;

interface Props {
  onChange: (value: string[]) => void;
}

export const UploadFiles = ({ onChange }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {watch} = useFormContext()
  const files = useRef<string[]>([])
  const [isPending, startTransition] = useTransition()


  const handleOnChange = useCallback(async (fileData:UploadChangeParam<UploadFile>) => {
    if(fileData.file.status === 'removed') return
    const fileSet = Array.from(new Set([...fileList, ...fileData.fileList]))
    setFileList(fileSet)

    const form = new FormData()
    form.append('file', fileData.file as unknown as Blob) 

     startTransition( async () => {
      const data = await uploadFile(form)
      files.current = [...files.current, data?.url]
      onChange(files.current);
    })

  },[fileList, onChange])



  

  return (
    <>
    <Dragger
      multiple
      listType="picture"
      fileList={fileList}
      beforeUpload={() => false}
      onChange={handleOnChange}
      onRemove={(file) => {
        const index = fileList.indexOf(file);
        const newFileList = fileList.slice();
        newFileList.splice(index, 1);
        files.current.splice(index, 1);
        setFileList(newFileList);
      }}
      >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
 
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
      <div className="flex justify-start">
      <Spin spinning={isPending} />
      {
        fileList.length > 0 && <>
        {status === 'error' && <div className="text-red-500">Error uploading file</div>}
      {status === 'success' && <div className="text-green-500">Files uploaded successfully</div>}
        </>
      }
      </div>
      </>
  );
};
