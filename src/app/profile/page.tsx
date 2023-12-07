import {  currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { BannerProps, ProfileBanner } from './_components/ProfileBanner';

const checkRole = async () => {
    const user = await currentUser()
    if(!user?.publicMetadata.role) {
        return redirect('/profile/create')
    }
    return user
}

export default async function Page() {
    const user = await checkRole()

    return  <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">

        <ProfileBanner user={user} />
        <hr />
    </section>


}