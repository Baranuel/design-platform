import { getDesignersRequestingCollaboration } from "@/app/(database-queries)/listing-queries";
import { DesignerListItem } from "./DesignerListItem";

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
   <div className="min-h-[200px] w-full">
     <table className=" border-separate border-spacing-4  table-auto w-full">
          <thead className="">
            <tr className="text-left">
              <th className="font-semibold">Name</th>
              <th className="font-semibold">Years of experience</th>
              <th className="font-semibold">Contact</th>
              <th className="font-semibold">Portfolio</th>
            </tr>
          </thead>

          <tbody className="">{renderRequestedCollaborations()}</tbody>
    </table>
   </div>
  );
};
