import { getUser, getUserByClientId, getUserByDesignerId } from "@/app/(database-queries)/user-queries";
import dayjs from "@/app/(packages)/extended-dayjs";
import { clerkClient } from "@clerk/nextjs";
import Image from "next/image";

import { CollaborationProgress, CollaborationStatus } from "@prisma/client";
import Link from "next/link";

export const CollaborationTableItem = async ({
  designerId,
  clientId,
  createdAt,
  id,
  status,
  progress
}: {
  designerId: number;
  clientId: number;
  createdAt: Date;
  id: number;
  progress: CollaborationProgress;
status: CollaborationStatus;
}) => {
  const user = await getUser();
  const designer = await getUserByDesignerId(designerId);
  const client = await getUserByClientId(clientId)
  
const clerkUserToFind = user.role === 'CLIENT' ? designer?.clerkId : client?.clerkId
  const clerkUser = await clerkClient.users.getUser(clerkUserToFind ?? "");

  return (
    <tr className=" max-h-[70px]  my-2 rounded-md ">
      <td className="flex gap-2 items-center">
        <Image
          className="bg-stone-300 rounded-full overflow-hidden"
          placeholder={"empty"}
          src={clerkUser?.imageUrl}
          alt="user-image"
          width={50}
          height={50}
        />
        <div className="flex flex-col">
        <span>  {clerkUser.firstName} {clerkUser.lastName}</span>
        <span className="text-xs text-stone-500">{dayjs(createdAt).fromNow()}</span>
        </div>
      </td>
      <td>
        <Link href={`/collaboration/${id}`}>Link to collaboration</Link>
      </td>
      <td>
        {progress}
      </td>
   
    

    </tr>
  );
};
