import { axiosInstance } from "@/app/network/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { FormProps } from "antd";
import router from "next/router";


export const useUpdateProfileMutation = () => {

    return useMutation({
        mutationFn: async (data: FormProps) => {
          const clerkResponse = await axiosInstance.put("clerk-profile", data);

          const profileObject = {
            clerkId: clerkResponse.data.id,
            role: clerkResponse.data.publicMetadata.role,
          };
          const createUser = await axiosInstance.post("user", profileObject);

          if (createUser.data.success) {
            router.push("/profile");
          }
        },
      });
}