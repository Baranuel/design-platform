import prismaClient from "@/app/(network)/prismaClient";
import Link from "next/link";


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


export const ProposalsList = async () => {
    const proposalList = await getProposalList()
    
    return (
        <section>
         <div className="my-4 flex flex-col gap-3">
        {proposalList.map((proposal) => {
                return (
                    <Link href={`/proposal/${proposal.id}`} className="flex flex-col gap-1 no-underline text-black bg-white shadow-sm min-h-[140px] border-solid border-stone-200 rounded-md p-6" key={proposal.id}>
                        <div className=" flex items-center gap-2">
                        <span className="text-lg font-semibold">{proposal.client?.clientInformation?.companyName}</span>
                        <div className="mb-1 flex gap-2">{proposal.client?.clientInformation?.companyIndustry.map((category,index) => (
                            <span className="p-1  bg-orange/5 border border-solid border-orange/50 font-semibold rounded-md text-xs text-orange" key={index}>{category}</span>
                        ))}</div>
                        </div>
                        <p className="text-base">{proposal.client?.clientInformation?.companyDescription}</p>
                    </Link>
                )
            })}
        </div>
        </section>
    );
}