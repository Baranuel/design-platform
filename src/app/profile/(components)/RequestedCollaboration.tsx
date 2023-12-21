import { getDesignersRequestingCollaboration } from "@/app/(database-queries)/listing-queries";
import { DesignerListItem } from "./DesignerListItem";
import { AliwangwangOutlined } from "@ant-design/icons";
import { Suspense } from "react";

export const RequestedCollaboration = async () => {
  const requestedCollaborations = await getDesignersRequestingCollaboration();

  const renderRequestedCollaborations = () => {
    return requestedCollaborations.map((designer) => {
      return (

        <DesignerListItem
          key={designer.designerId}
          designerId={designer.designerId}
        />
      );
    });
  };

  return (
   <div className="min-h-[200px] h-[200px] w-full">
    {requestedCollaborations.length > 0 ? (
         <table className=" border-separate border-spacing-4  table-auto w-full">
         <thead className="">
           <tr className="text-left">
             <th className="font-semibold">Name</th>
             <th className="font-semibold">Years of experience</th>
             <th className="font-semibold">Contact</th>
             <th className="font-semibold">Portfolio</th>
           </tr>
         </thead>
         <tbody className="">
            <Suspense fallback={<div>Loading...</div>}>
            {renderRequestedCollaborations()}
            </Suspense>
        </tbody>
   </table>
    ) : <div className="w-full h-full flex flex-col gap-1 items-center justify-center bg-stone-100 rounded-md">
        <AliwangwangOutlined className="text-5xl " />
         <span className="text-base">   Once a designer has requested to collaborate with you, you will see them here.</span>
        </div>}
   </div>
  );
};
