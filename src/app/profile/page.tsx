import {  currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

const checkRole = async () => {
    const user = await currentUser()
    if(!user?.publicMetadata.role) {
        return redirect('/profile/create')
    }

}

export default async function Page() {
    await checkRole()

    return <div className='w-screen h-screen bg-white'>

    </div>


}