import { currentUser } from "@clerk/nextjs"
import { redirect } from "next/navigation"

export const checkRole = async () => {
    const user = await currentUser()
    if(!user?.publicMetadata.role) {
        return redirect('/profile/create')
    }
    return user
}
