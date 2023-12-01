import { UserButton, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const checkRole = async () => {
    const user = await currentUser()
    console.log(user)
    if(!user?.publicMetadata.role) {
        return redirect('/profile/create')
    }

}

export default async function Page() {
    await checkRole()

    return <UserButton/>
}