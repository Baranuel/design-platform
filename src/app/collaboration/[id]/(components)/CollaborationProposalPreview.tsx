import { ProposalPreview } from "@/app/(components)/ProposalPreview";
import { getCollaborationById } from "@/app/(database-queries)/collaboration-queries";
import { getListingById } from "@/app/(database-queries)/listing-queries";


export const CollaborationProposalPreview = async ({ id }: { id: string }) => {
    const collaboration = await getCollaborationById(id);
    if(!collaboration) return 


    return <>
    { collaboration?.client?.proposal?.id &&  <ProposalPreview id={collaboration.client.proposal.id} /> }
    </>
    
}