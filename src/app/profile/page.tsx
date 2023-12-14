import { getUser } from "../helpers/check-role-server";
import { ProfileBannerClient } from "./_components/ProfileBannerClient";
import { ProfileBannerDesigner } from "./_components/ProfileBannerDesigner";



export default async function Page() {
  const user = await getUser();

  return (
    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
        <ProfileBannerClient user={user} />

    
    </section>
  );
}
