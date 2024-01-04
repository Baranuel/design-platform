import { setCollaborationProgress } from "@/app/(actions)/collaboration-actions";
import { getCollaborationById } from "@/app/(database-queries)/collaboration-queries";
import { getUser } from "@/app/(database-queries)/user-queries";
import { ServerActionButton } from "@/app/profile/(components)/ServerActionButton";
import { CollaborationProgress } from "@prisma/client";

const progressButtons: CollaborationProgress[] = [
  "Research",
  "Analysis",
  "Ideation",
  "Prototype",
  "Testing",
];

export const ProgressButtons = async ({id}:{id:string}) => {
    const collaborationById = await getCollaborationById(id)
    const user = await getUser();

  const renderProgressButtons = () => {
    return progressButtons.map((progress, index) => {
      return (
        <ServerActionButton
          action={async () => {
            "use server";
            if(collaborationById?.progress === progress) return 
            await setCollaborationProgress(id, progress);
          }}
          disabled={user?.role !== "DESIGNER" && collaborationById?.progress !== progress}
          key={index}
          className={`min-w-[175px] rounded-md ${collaborationById?.progress === progress && "border-solid border-purple text-purple"} ${user?.role !== "DESIGNER" && "pointer-events-none"}}`}
        >
          {progress}
        </ServerActionButton>
      );
    });
  };
  return <div className="w-full h-full flex gap-3 items-center">
    { renderProgressButtons()}
  </div>
};
