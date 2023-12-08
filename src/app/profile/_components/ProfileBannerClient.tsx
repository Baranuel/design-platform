import { User } from "@clerk/nextjs/server";
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
companyName: string;
companySize: string;
stateProvince: string;
companyIndustry: string[]
companyRegistration: string;
}


export const ProfileBannerClient = ({user}:BannerProps) => {
    const publicMetadata = user.publicMetadata as unknown as UserPublicMetadata

    return <section className="flex gap-4 border-b border-black mt-[100px] w-full min-h-fit pb-12">
        <div className="w-1/5 justify-center flex">
            <div className="bg-blue-500 relative rounded-full w-36 h-36 overflow-hidden">
                <Image src={user.imageUrl} alt='user picture' fill />
            </div>
        </div>
        <div className="flex flex-col gap-6 w-full items-start mt-4">
            <span className="w-full flex justify-between items-center">
                <h2>{publicMetadata.companyName}</h2>
                <button>Edit</button>
            </span>
            {/* Profile Information*/}
            <div className="flex gap-12 justify-between w-full h-38 ">
                <div className="flex flex-col gap-3 w-1/2 bg-white h-full">
                    <span className="flex gap-2"><span>Business Owner:</span> <span className="font-semibold">{user.firstName}</span></span>
                    <span className="flex gap-2"><span>Company Size:</span> <span className="font-semibold">{publicMetadata.companySize}</span></span>
                    <span className="flex gap-2">
                        <span>Industry Focus:</span> 
                      <span className="flex  gap-2 ">
                      {publicMetadata.companyIndustry.map((item, index) => <span key={index} className="font-medium border border-solid border-black p-1">{item}</span>)}
                      </span>
                    </span>
                </div>
                <div className="flex flex-col  gap-2 w-fit bg-white h-full">
                <span className="flex gap-2"><span>Country:</span> <span className="font-semibold">{publicMetadata.country}</span></span>
                <span className="flex gap-2"><span>State / Province:</span> <span className="font-semibold">{publicMetadata.stateProvince}</span></span>
                <span className="flex gap-2"><span>Street:</span> <span className="font-semibold">{publicMetadata.street}</span></span>
                </div>
            </div>
        </div>
      
    </section>
}