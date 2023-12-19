import { Prisma, User as PrismaUser } from "@prisma/client"



const completeUser = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
        client: {
            include: { clientInformation: true, proposal: true }
        },
        designer: {
            include: { designerInformation: true }
        }
    }
})

export type User = Prisma.UserGetPayload<typeof completeUser>



const userListing = Prisma.validator<Prisma.ProposalListingDefaultArgs>()({
    include: {
        proposal: true,
        client: {
            include: { clientInformation: true, proposal: true }
        },
        interestedDesigners: {
            include: {
                designer: {
                    include: { designerInformation: true, user: true }
                },
            }
        }
    }
})
export type UserListing = Prisma.ProposalListingGetPayload<typeof userListing>


const userProposal = Prisma.validator<Prisma.ProposalDefaultArgs>()({
    include: {
        listing: true,
        client: {
            include: { clientInformation: true, proposal: true }
        }
    }
})

export type UserProposal = Prisma.ProposalGetPayload<typeof userProposal>