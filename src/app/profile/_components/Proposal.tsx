
import { ApplicationFlow } from "./ApplicationFlow";
import { ProposalPreview } from "./ProposalPreveiw";
import { getUser } from "@/app/helpers/get-user";
import { auth } from "@clerk/nextjs";
import { axiosInstance } from "@/app/network/axios-instance";
import { UserProposal } from "../../../../global";


const getProposal = async () => {
  const {getToken} =  auth();
  const token = await getToken();

  const {data} = await axiosInstance.get<UserProposal>(`/proposal`,{
    headers: {Authorization: `Bearer ${token}`}
  })
  return data
}


export const Proposal = async () => {
    const user = await getUser();
    const proposal = await getProposal()
    console.log(proposal)
    return(
      <div className="w-full min-h-[250px] flex flex-col gap-3   ">
        <h1>Proposal</h1>
{!proposal ? <ApplicationFlow /> : <ProposalPreview id={user.client?.proposal?.id}  />} 
        </div>

)
}