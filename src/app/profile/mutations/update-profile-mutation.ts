import { axiosInstance } from "@/app/network/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { FormProps } from "antd";
import { useUser } from "@clerk/nextjs";
import { ClientInformation, DesignerInformation, User } from "@prisma/client";
import { useRouter } from "next/navigation";


type userData = {
  role: "CLIENT" | "DESIGNER";
  clerkId: string;
  country: string;
  postalCode: string;
}

interface clientData extends userData  {
  companyName: string;
  companyDescription: string;
  companyIndustry: string[];
  companySize: string;
  companyRegistration: string;
  companyWebsite: string;
}


interface designerData extends userData {
  university: string;
  yearsOfExperience: string;
  portfolio: string;
}

export type dataWithId = {
  id: string;
} & clientData & designerData




export const useUpdateProfileMutation = () => {
  const {user} = useUser();
  const router = useRouter();
  
    return useMutation({
        mutationFn: async (data:clientData | designerData) => {
          if(!user) return
          const dataWithId = {...data, clerkId: user.id}
          const createUser = await axiosInstance.post<User>("user", dataWithId);

          if(createUser.data.id) {
            return router.push("/profile")
          }
        },
      });
}