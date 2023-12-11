"use client";
import { InboxOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import { useState } from "react";
import { useUploadFileMutation } from "../mutations/upload-file-mutation";


const { Dragger } = Upload;

interface Props {
  onChange: (value: string[]) => void;
}

export const UploadFiles = ({ onChange }: Props) => {
  const [fileList, setFileList] = useState<string[]>([]);
  const {mutateAsync, status,} = useUploadFileMutation()

  const handleOnChange = async (fileData: any) => {
    const data = await mutateAsync(fileData)
    setFileList([...fileList, data.url])
    onChange([...fileList, data.url]);
  };

  return (
    <>
    <Dragger
      multiple
      beforeUpload={() => false}
      onChange={(data) => {handleOnChange(data)}}
      >
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
 
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">Support for a single or bulk upload.</p>
    </Dragger>
    {status}
      </>
  );
};
