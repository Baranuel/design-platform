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

    useEffect(() => {
        const pusher = new Pusher('a18fce71a9e083b2db11',{
            cluster: 'eu'
        });
        const channel = pusher.subscribe("my-channel");

        channel.bind("my-event", (data:any) => {
            console.log(data);
        });

        return () => {
            channel.unsubscribe();
            channel.unbind_all();
        }
    },[])

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
          Click me
        </Button>
      )}
    </>
  );
};
