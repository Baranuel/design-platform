import { getCollaborations } from "@/app/(database-queries)/collaboration-queries";
import { CollaborationTableItem } from "./CollaborationTableItem";
import { Suspense } from "react";
import { getUser } from "@/app/(database-queries)/user-queries";

export const Collaborations = async () => {
  const collaborations = await getCollaborations();
  const user = await getUser();

  const renderCollaborations = () => {
    return collaborations.map((collaboration) => {
      return (
        <CollaborationTableItem
          key={collaboration.designerId}
          designerId={collaboration.designerId}
          clientId={collaboration.clientId}
          createdAt={collaboration.createdAt}
          id={collaboration.id}
          status={collaboration.status}
          progress={collaboration.progress}
        />
      );
    });
  };
  return (
    <>
      {collaborations.length > 0 ? (
        <table className=" border-separate border-spacing-x-2 border-spacing-y-3  table-auto w-full">
          <thead className="">
            <tr className="text-left">
              <th className="font-semibold">{user.role === 'CLIENT' ? "Designer" : "Client"}</th>
              <th className="font-semibold">Link to collaboration page</th>
              <th className="font-semibold">Design Phase</th>
            </tr>
          </thead>
          <tbody className="">
            <Suspense fallback={<tr>
                <td>Loading...</td>
            </tr>}>
              {renderCollaborations()}
            </Suspense>
          </tbody>
        </table>
      ) : (
        <div className="flex items-start justify-center h-full p-6 rounded-md bg-stone-100  flex-col gap-3">
          <span className="text-base">
            No Ongoing Collaborations, if you approve designers to work on your
            website you will abe able to see their work here.
          </span>
        </div>
      )}
    </>
  );
};
