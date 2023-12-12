import { axiosInstance } from "@/app/network/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";
import { FormProps } from "antd";



export const useUploadFileMutation = () => {

    return useMutation({
        mutationFn: async (data: any) => {
            const formData = new FormData();
            formData.append("file", data.file);
        
            const { data: blob } = await axiosInstance.post<PutBlobResult>(
              `files?filename=${data.file.name}`,
              formData,
              {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
            );
            return blob;
        },
  
      });
}