
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/app/helpers/get-user";



export const ClientProfile = async () => {
  const clerkUser = await currentUser();
  const user = await getUser();

  const info = user.client?.clientInformation;

  return (
 
      <div className="flex gap-4 bg-white border-solid border-stone-200 rounded-md   w-full min-h-fit p-6">
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
          <div className="flex gap-10">
          <span className="min-w-[110px]">
            <span className="text-stone-700 text-sm mb-1">Business Owner</span>
            <p className="text-base font-medium">{clerkUser?.firstName} {clerkUser?.lastName}</p>
          </span>
          
          <span className="min-w-[110px]">
            <span className="text-stone-700 text-sm mb-1">Company Size</span>
            <p className="text-base font-medium">{info?.companySize} </p>
          </span>
          </div>
          <span>
            <span className="text-stone-700 text-sm mb-1">Industry Focus</span>
            <span className="flex  gap-2 ">
                  {info?.companyIndustry.map((item:any, index:any) => (
                    <span
                      key={index}
                      className="whitespace-nowrap p-1 rounded-md flex items-center text-[13px] text-purple border-solid border-purple font-medium "
                    >
                      {item}
                    </span>
                  ))}
                </span>
          </span>
          <div className="flex gap-10">
          <span className="min-w-[110px]">
            <span className="text-stone-700 text-sm mb-1">Country</span>
            <p className="text-base font-medium">{user?.country} </p>
          </span>
          <span className="min-w-[100px]">
            <span className="text-stone-700 text-sm mb-1">Zip</span>
            <p className="text-base font-medium">{user?.postalCode} </p>
          </span>
          </div>
         
          {/* Profile Information*/}
            </div>
          </div>
  );
};
