
import { ApplicationFlow } from "./ApplicationFlow";
import { ProposalPreview } from "./ProposalPreveiw";
import { getUser } from "@/app/(database-queries)/user-queries";
import { getProposal } from "@/app/(database-queries)/proposal-queries";



export const Proposal = async () => {
    const user = await getUser();
    const proposal = await getProposal()
    return(
      <div className="w-full min-h-[250px] flex flex-col gap-3   ">
        <h1>Proposal</h1>
{!proposal ? <ApplicationFlow /> : <ProposalPreview id={user.client?.proposal?.id}  />} 
        </div>

)
}