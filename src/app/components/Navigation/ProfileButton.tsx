import { UserButton } from "@clerk/nextjs"
import Link from "next/link"


export const ProfileButton = () => {
    return (
        <div className="flex gap-3 items-center">
            <Link href={'profile'} className="no-underline">Profile</Link>
            <span className="text-stone-400">|</span>
            <UserButton afterSignOutUrl="/"/>
        </div>
    )
}