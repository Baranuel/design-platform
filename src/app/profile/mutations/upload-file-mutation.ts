import { axiosInstance } from "@/app/(network)/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { PutBlobResult } from "@vercel/blob";




export const useUploadFileMutation = () => {

    return useMutation({
        mutationFn: async (data: FormData) => {

            const file = data.get('file') as File;
        
            const { data: blob } = await axiosInstance.post<PutBlobResult>(
              `/files?filename=${file.name}`,
              data,
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