import prismaClient from "@/app/network/prismaClient"


const getProposalList = async () => {
    return await prismaClient.proposal.findMany({
        include: {
            client: {
                include: {
                    user: true,
                    clientInformation: true
                }
            }
        }
    })

}

export const Collaborations = async () => {
    const list = await getProposalList()
    return (
        <div className="w-full h-[250px] flex flex-col gap-3   ">
        <h1>Ongoing Collaborations</h1>
        <div className="w-full h-full flex flex-col items-center justify-start gap-4">
            {list.map((proposal) => {
                return (
                    <div key={proposal.id} className="w-full h-20 p-6 flex bg-white rounded-md border-solid border-stone-200 items-center justify-start gap-4">
                        <span>{proposal.client?.clientInformation?.companyName}</span>

                    </div>
                )
            })}
            </div>
    </div>
    )
}