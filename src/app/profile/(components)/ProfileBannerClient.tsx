
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

    </section>
  );
};
