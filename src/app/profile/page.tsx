import { ProfileBannerClient } from "./_components/ProfileBannerClient";
import { ProfileBannerDesigner } from "./_components/ProfileBannerDesigner";
import { checkRole } from "../helpers/check-role-server";
import { Button } from "antd";
import { ApplicationFlow } from "./_components/ApplicationFlow";

export default async function Page() {
  const user = await checkRole();

  return (
    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
      {user?.publicMetadata.role === "CLIENT" ? (
        <ProfileBannerClient user={user} />
      ) : (
        <ProfileBannerDesigner user={user} />
      )}
      <hr className="border-none h-[1px] bg-stone-300" />
        <ApplicationFlow />
    </section>
  );
}
