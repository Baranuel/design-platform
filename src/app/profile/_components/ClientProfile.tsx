import { currentUser } from "@clerk/nextjs";

import Image from "next/image";
import { getUser } from "@/app/helpers/get-user";


export const ClientProfile = async () => {
  const user = await getUser();
  const clerkUser = await currentUser();
  const info = user.client?.clientInformation;

  return (
    <div>
      <div className="flex gap-4 bg-white border-solid border-stone-200 rounded-md mt-32 h-[320px] w-full min-h-fit p-6">
        <div className="w-1/5 justify-center items-start flex">
          <div className="bg-blue-500 relative rounded-full w-32 h-32 overflow-hidden">
            <Image src={clerkUser?.imageUrl ?? ""} alt="user picture" fill />
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full items-start mt-4">
          <div className="w-full flex justify-between items-center">
          <span>
            <span className="text-stone-700 text-sm mb-1">Company</span>
            <h1 className="text-xl">{info?.companyName}</h1>
          </span>
          <p className="text-purple">{user.role}</p>
          </div>
          <div className="flex gap-6">
          <span>
            <span className="text-stone-700 text-sm mb-1">Business Owner</span>
            <p className="text-base font-medium">{clerkUser?.firstName} {clerkUser?.lastName}</p>
          </span>
          <span>
            <span className="text-stone-700 text-sm mb-1">Company Size</span>
            <p className="text-base font-medium">{info?.companySize} </p>
          </span>
          </div>
          <span>
            <span className="text-stone-700 text-sm mb-1">Industry Focus</span>
            <span className="flex  gap-2 ">
                  {info?.companyIndustry.map((item, index) => (
                    <span
                      key={index}
                      className="whitespace-nowrap rounded-md flex items-center text-base font-medium "
                    >
                      {item}
                    </span>
                  ))}
                </span>
          </span>
          <div className="flex gap-6">
          <span>
            <span className="text-stone-700 text-sm mb-1">Country</span>
            <p className="text-base font-medium">{user?.country} </p>
          </span>
          <span>
            <span className="text-stone-700 text-sm mb-1">Zip</span>
            <p className="text-base font-medium">{user?.postalCode} </p>
          </span>
          </div>
         
          {/* Profile Information*/}
            </div>
          </div>


      <div className="min-h-[400px] flex flex-col p-12  gap-4 items-start">
        <div className="w-full bg-purple h-10"></div>
        <div className="w-full bg-purple h-10"></div>
        <div className="w-full bg-purple h-10"></div>
      </div>
    </div>
  );
};
