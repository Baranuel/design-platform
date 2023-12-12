"use client";

import { InboxOutlined } from "@ant-design/icons";
import { Upload, UploadFile } from "antd";
import { useCallback, useState } from "react";
import { useUploadFileMutation } from "../mutations/upload-file-mutation";
import { useFormContext } from "react-hook-form";


const { Dragger } = Upload;

interface Props {
  onChange: (value: string[]) => void;
}

export const UploadFiles = ({ onChange }: Props) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [urls, setUrls] = useState<string[]>([]);

  const {mutateAsync, status,} = useUploadFileMutation()
  const { watch } = useFormContext();

  const handleOnChange = useCallback(async (fileData: any) => {
    if(fileData.file.status === 'removed') return
    const fileSet = Array.from(new Set([...fileList, ...fileData.fileList]))
    setFileList(fileSet)

    const data = await mutateAsync(fileData)
    onChange([...urls, data.url]);
    
  },[fileList, mutateAsync, onChange, urls])
  
  console.log(fileList)
  console.log(watch('files'))

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

      </>
  );
};
