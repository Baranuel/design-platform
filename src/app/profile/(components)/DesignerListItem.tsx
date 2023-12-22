import { getUserByDesignerId } from "@/app/(database-queries)/user-queries";
import dayjs from "@/app/(packages)/extended-dayjs";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ServerActionButton } from "./ServerActionButton";

import { approveDesignerListing, rejectDesignerListing } from "@/app/(actions)/listing-actions";

export const DesignerListItem = async ({
  designerId,
  createdAt,
  id
}: {
  designerId: number;
  createdAt: Date;
  id: number;
}) => {
  const user = await getUserByDesignerId(designerId);
  const clerkUser = await clerkClient.users.getUser(user?.clerkId ?? "");

  return (
    <tr className=" max-h-[70px]  my-2 rounded-md ">
      <td className="flex gap-2 items-center">
        <Image
          className="bg-stone-300 rounded-full overflow-hidden"
          placeholder={"empty"}
          src={clerkUser?.imageUrl}
          alt="designer-user-image"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
        <span>  {clerkUser.firstName} {clerkUser.lastName}</span>
        <span className="text-xs text-stone-500">{dayjs(createdAt).fromNow()}</span>
        </div>
      </td>
      <td className="">
        {user?.designer?.designerInformation?.yearsOfExperience}
      </td>
      <td>
        {clerkUser?.emailAddresses?.[0]?.emailAddress}
      </td>
      <td>
        <Link target="blank" href={`https://${user?.designer?.designerInformation?.portfolio}`}>{user?.designer?.designerInformation?.portfolio}</Link>
      </td>
      <td className=" text-end ">

        <ServerActionButton action={ async () =>  {
          'use server'
          await approveDesignerListing(id)
        }} className="mx-1">Approve</ServerActionButton>

        <ServerActionButton action={ async () =>  {
          'use server'
          await rejectDesignerListing(id)
        }}>Reject</ServerActionButton>
      </td>

    </tr>
  );
};
