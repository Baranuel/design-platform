import { getCollaborations } from "@/app/(database-queries)/collaboration-queries"



export const Collaborations = async () => {
    const collaborations = await getCollaborations()
    return (
        <>
        {collaborations.length > 0 ? 
        <div>yes</div> :
        <div className="flex items-start justify-center h-full p-6 border-solid border-stone-200 rounded-md bg-stone-50 flex-col gap-3">
                <span>No Ongoing Collaborations, if you approve designers to work on your website you will abe able to see their work here.</span>

            </div>
        }
        </>

    )
}