import { getUserByDesignerId } from "@/app/(database-queries)/user-queries";
import { clerkClient } from "@clerk/nextjs";
import { Button } from "antd";
import Image from "next/image";
import Link from "next/link";

export const DesignerListItem = async ({
  designerId,
}: {
  designerId: number;
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
        <span>
          {clerkUser.firstName} {clerkUser.lastName}
        </span>
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
        <Button className="mx-1">Accept</Button>
        <Button>Decline</Button>
      </td>

    </tr>
  );
};
