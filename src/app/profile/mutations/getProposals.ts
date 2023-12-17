import { axiosInstance } from "@/app/(network)/axios-instance";
import { useQuery } from "@tanstack/react-query";


export const useGetProposalsQuery = async () => {
  return useQuery({
        queryKey: ["proposal"],
        queryFn: async () => {
            const {data} = await axiosInstance.get("proposal");
            return data;
        }
    });

}