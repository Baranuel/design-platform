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
  console.log(listing)
  const interestedDesigner = listing.interestedDesigners.find(
    (interestedDesigner) => interestedDesigner.designerId === user.designer?.id
  );

  return (
    <>
      {interestedDesigner ? (
        <span className={`${interestedDesigner.status === "PENDING" && "text-amber-500"} ${interestedDesigner.status === "APPROVED" && "text-green-500"} ${interestedDesigner.status === "REJECTED" && "text-red-500"}`}>{interestedDesigner.status}</span>
      ) : (
        <Button
          type="primary"
          loading={isPending}
          onClick={() => {
            startTransition(async () => {
              await requestCollaborationForListing(listing.id);
            });
          }}
          className="min-w-[120px] min-h-[40px] rounded-md text-white font-semibold"
        >
          Request Collaboration
        </Button>
      )}
    </>
  );
};
