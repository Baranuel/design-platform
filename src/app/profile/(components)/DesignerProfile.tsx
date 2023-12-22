
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { getUser } from "@/app/helpers/get-user";
import Link from "next/link";



export const DesignerProfile = async () => {
  const clerkUser = await currentUser();
  const user = await getUser();

  const info = user.designer?.designerInformation;

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
            <span className="text-stone-700 text-sm mb-1">University</span>
            <h1 className="text-xl">{info?.university}</h1>
          </span>
          <p className="text-purple">{user.role}</p>
          </div>
          <div className="flex gap-10">
          <span className="min-w-[110px]">
            <span className="text-stone-700 text-sm mb-1">Designer</span>
            <p className="text-base font-medium">{clerkUser?.firstName} {clerkUser?.lastName}</p>
          </span>
          
          <span className="min-w-[110px]">
            <span className="text-stone-700 text-sm mb-1">Years of Experience</span>
            <p className="text-base font-medium">{info?.yearsOfExperience} </p>
          </span>
          </div>
          <span className="min-w-[110px]">
            <span className="text-stone-700 text-sm mb-1">Portfolio</span>
            <p>
            <Link href={`https://${info?.portfolio}`} target={'blank'} className="no-underline text-purple text-base font-medium">{info?.portfolio} </Link>

            </p>
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
