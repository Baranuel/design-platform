import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import prismaClient from "../network/prismaClient"

export const getUser = async () => {
    const clerkUser = await currentUser()
    const user = await prismaClient.user.findUnique({where: {clerkId: clerkUser?.id}, include: {
        client: {
            include: {clientInformation: true}
        },
        designer: {
            include: {designerInformation: true}
        }
    }})
        console.log(user)
    if(!user?.role) {
        return redirect('/profile/create')
    }
    return user
}
