import prismaClient from "@/app/(network)/prismaClient";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";



export const getUserFromDb = async () => {
    const clerkUser = await currentUser();
    if (!clerkUser) { throw new Error('Not authenticated')}

    const prismaUser = await prismaClient.user.findUnique({
        where: {
            clerkId: clerkUser.id,
        },
        include: {
            client: {
                include: {clientInformation: true, proposal: true}
            },
            designer: {
                include: {designerInformation: true}
            }
        },
    })

    if(!prismaUser) redirect('/profile/create')
    return prismaUser
}