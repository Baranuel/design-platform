import { getCollaborationById } from "@/app/(database-queries)/collaboration-queries";
import { AddLinkButton } from "./AddLinkButton";
import Link from "next/link";
import { DeleteLinkButton } from "./DeleteLinkButton";
import { getUser } from "@/app/(database-queries)/user-queries";

export const LinkToDesign = async ({ id }: { id: number }) => {
  const collaborationById = await getCollaborationById(id);
  const user = await getUser();
  
  return (
    <div className=" flex flex-col gap-2 w-full h-full">
      <div className="min-h-[50px]">
        {collaborationById?.linkToDesign && (
          <div className=" flex items-center justify-between gap-1 p-2 px-3  border-dashed border-purple rounded-md  w-[200px] ">
            <Link
              className="text-purple "
              target="blank"
              href={`${collaborationById?.linkToDesign}` ?? ""}
            >
              <span className=" font-medium p-1"> Link To Design</span>
            </Link>
            {user?.role === "DESIGNER" &&  <DeleteLinkButton id={+id} /> }
          </div>
        )}
      </div>
      {user?.role === "DESIGNER" && (
        <AddLinkButton
          collaborationId={+id}
          link={collaborationById?.linkToDesign ?? ""}
        />
      )}
    </div>
  );
};
