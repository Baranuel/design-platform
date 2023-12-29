"use client";

import { Button } from "antd";
import { User, UserListing } from "../../../../../global";
import { useEffect, useTransition } from "react";
import { requestCollaborationForListing } from "@/app/(actions)/listing-actions";
import Pusher from "pusher-js";

interface RequestCollaborationButton {
  listing: UserListing;
  user: User;
}

export const RequestCollaborationButton = ({
  listing,
  user,
}: RequestCollaborationButton) => {


  const [isPending, startTransition] = useTransition();

  const alreadyRequested = listing.interestedDesigners.some(
    (interestedDesigner) => interestedDesigner.designerId === user.designer?.id
  );

  return (
    <>
      {alreadyRequested ? (
        <span className="text-amber-500">Approval Pending</span>
      ) : (
        <Button
          type="primary"
          loading={isPending}
          onClick={() => {
            startTransition(async () => {
              await requestCollaborationForListing(listing.id);
            });
          }}
          className="min-w-[100px] min-h-[40px] rounded-md text-white font-semibold"
        >
          Request Collaboration
        </Button>
      )}
    </>
  );
};
