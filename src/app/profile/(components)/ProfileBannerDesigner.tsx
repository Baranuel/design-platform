import { User } from "@clerk/nextjs/server";
import { Button } from "antd";
import Image from "next/image";

export interface BannerProps {
  user: User;
}

interface UserPublicMetadata {
  city: string;
  role: string;
  street: string;
  country: string;
  postalCode: string;
  portfolio: string;
  university: string;
  stateProvince: string;
  currentStatus: string;
  yearsOfExperience: string;
}

export const ProfileBannerDesigner = ({ user }: BannerProps) => {
  const publicMetadata = user.publicMetadata as unknown as UserPublicMetadata;

  return (
    <section className="flex gap-4 border-b border-black mt-[100px] w-full min-h-fit pb-12">
      <div className="w-1/5 justify-center flex">
        <div className="bg-blue-500 relative rounded-full w-36 h-36 overflow-hidden">
          <Image src={user.imageUrl} alt="user picture" fill />
        </div>
      </div>
      <div className="flex flex-col gap-6 w-full items-start mt-4">
        <span className="w-full flex justify-between items-center">
          <h2>
            {user.firstName} {user.lastName}   <span className="text-purple ml-2">{publicMetadata.role}</span>
          </h2>
          <Button >Edit</Button>
        </span>
        {/* Profile Information*/}
        <div className="flex gap-12 justify-between w-full h-38 ">
          <div className="flex flex-col gap-3 w-1/2 bg-white h-full">
            <div className="flex gap-1">
              <span>University:</span>
              <span className="font-semibold">{publicMetadata.university}</span>
            </div>
            <div className="flex gap-1">
              <span>Years of experience:</span>
              <span className="font-semibold">{publicMetadata.yearsOfExperience}</span>
            </div>
            <div className="flex gap-1">
              <span>Current Status:</span>
              <span className="font-semibold">{publicMetadata.currentStatus}</span>
            </div>
          </div>

          <div className="flex flex-col  gap-2 w-fit bg-white h-full">
                <span className="flex gap-2"><span>Country:</span> <span className="font-semibold">{publicMetadata.country}</span></span>
                <span className="flex gap-2"><span>Street:</span> <span className="font-semibold">{publicMetadata.street}</span></span>
                <span className="flex gap-2"><span>State / Province:</span> <span className="font-semibold">{publicMetadata.stateProvince}</span></span>
                </div>
        </div>
      </div>
    </section>
  );
};
