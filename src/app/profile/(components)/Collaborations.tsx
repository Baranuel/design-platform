import { getCollaborations } from "@/app/(database-queries)/collaboration-queries"
import { DesignerListItem } from "./DesignerListItem"



export const Collaborations = async () => {
    const collaborations = await getCollaborations()
    return (
        <>
        {collaborations.length > 0 ? 
        <div>
            {collaborations.map((collaboration) => {
                return <DesignerListItem key={collaboration.designerId} designerId={collaboration.designerId} createdAt={new Date()} id={collaboration.id} />
            })}
        </div> :
        <div className="flex items-start justify-center h-full p-6 rounded-md bg-stone-100 border-solid border-[1px] border-gray-300  flex-col gap-3">
                <span className="text-base">No Ongoing Collaborations, if you approve designers to work on your website you will abe able to see their work here.</span>
            </div>
        }
        </>

    )
}