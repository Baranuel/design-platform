import { axiosInstance } from "@/app/network/axios-instance";
import { QueryClient, useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const client = new QueryClient();

export const useCreateProposalMutation = () => {
    const router = useRouter();

    return useMutation({
        mutationFn: async (proposalData:any) => {
            console.log(proposalData);
            const {data} = await axiosInstance.post("proposal", proposalData);
            return data;
        },
        onSettled: (data) => {
                router.refresh()
        }
      });
}