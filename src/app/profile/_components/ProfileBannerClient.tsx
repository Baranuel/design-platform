
import { User } from "../../../../global";
import { ClientProfile } from "./ClientProfile";
import { Suspense } from "react";
import { Proposal } from "./Proposal";





export const ProfileBannerClient = async () => {

  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
      <ClientProfile/>
      </Suspense>
      <hr className="border-none h-[1px] bg-stone-300" />
      <Suspense fallback={<div>Loading...</div>}>
      <Proposal />
      </Suspense>
    </section>
  );
};
