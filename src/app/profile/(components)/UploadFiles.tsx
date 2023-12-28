"use client";

import { InboxOutlined } from "@ant-design/icons";
import { Spin, Upload, UploadFile } from "antd";
import { useCallback, useRef, useState } from "react";
import { useUploadFileMutation } from "../(mutations)/upload-file-mutation";
import { useFormContext } from "react-hook-form";
import { PutBlobResult } from "@vercel/blob";
import { UploadChangeParam } from "antd/es/upload";


const { Dragger } = Upload;

interface Props {
  onChange: (value: string[]) => void;
}

export const UploadFiles = ({ onChange }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const files = useRef<string[]>([])

  const {mutateAsync, status} = useUploadFileMutation()

  const handleOnChange = useCallback(async (fileData:UploadChangeParam<UploadFile>) => {
    if(fileData.file.status === 'removed') return
    const fileSet = Array.from(new Set([...fileList, ...fileData.fileList]))
    setFileList(fileSet)

    const form = new FormData()
    form.append('file', fileData.file as unknown as Blob) 

    const data = await mutateAsync(form)
    files.current = [...files.current, data.url]

    onChange(files.current);
  },[fileList, mutateAsync, onChange])
  

  

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
      <Spin spinning={status === 'pending'} />
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
