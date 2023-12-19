import { getAllActiveListings } from "@/app/(database-queries)/listing-queries";
import Link from "next/link";



export const ActiveListings = async () => {
    const activeListings = await getAllActiveListings()
    
    return (
        <section>
         <div className="my-4 flex flex-col gap-3">
        {activeListings.map((listings) => {
                return (
                    <Link href={`/listing/${listings.id}`} className="flex flex-col gap-1 no-underline text-black bg-white shadow-sm min-h-[140px] border-solid border-stone-200 rounded-md p-6" key={listings.id}>
                        <div className=" flex items-center gap-2">
                        <span className="text-lg font-semibold">{listings.client?.clientInformation?.companyName}</span>
                        <div className="mb-1 flex gap-2">{listings.client?.clientInformation?.companyIndustry.map((category,index) => (
                            <span className="p-1  bg-orange/5 border border-solid border-orange/50 font-semibold rounded-md text-xs text-orange" key={index}>{category}</span>
                        ))}</div>
                        </div>
                        <p className="text-base">{listings.client?.clientInformation?.companyDescription}</p>
                    </Link>
                )
            })}
        </div>
        </section>
    );
}