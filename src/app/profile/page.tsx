import { Suspense } from "react";
import { getUser } from "../helpers/get-user";
import { ProfileBannerClient } from "./_components/ProfileBannerClient";




export default async function Page() {


  return (
    <section className=" z-40 px-72 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">

        <ProfileBannerClient  />

    </section>
  );
}
