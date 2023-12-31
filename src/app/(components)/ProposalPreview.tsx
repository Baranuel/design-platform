import { Proposal } from "@prisma/client";
import {
  getProposalById,
  getQuestions,
} from "../(database-queries)/proposal-queries";
import Link from "next/link";
import Image from "next/image";

type ProposalKey = keyof Omit<Proposal, "createdAt" | "id" | "clientId">;

export const ProposalPreview = async ({ id }: { id: number }) => {
  const proposal = await getProposalById(id);
  const questions = await getQuestions();

  const proposalQuestions = questions.map((question) => {
    const proposalKey = proposal?.[question.title as ProposalKey];

    return {
      question: [question.question],
      title: question.title,
      answer: proposalKey,
    };
  });

  const primaryColumn = proposalQuestions.filter((q) => q.title !== "files");
  const files = proposalQuestions.filter((q) => q.title === "files");

  return (
    <div className="flex flex-col gap-2  my-4 ">
      {/** Files */}
      <div className="w-full flex flex-col gap-2 min-h-[200px] ">
        <span>
          <h3>Files</h3>
          <p className="text-sm text-gray-500">
            Click on a file to download it
          </p>
        </span>
        <div>
          {files.map((file, index) => {
            const images = file.answer as string[];
            return (
              <div key={index} className=" flex flex-wrap gap-2 ">
                {images.map((image, index) => {
                  return (
                    <Link
                      href={image}
                      key={index}
                      className="relative w-20 h-20 shadow-md rounded-md border border-solid border-stone-300 overflow-hidden"
                    >
                      <Image src={image} alt="image" fill />
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className=" w-full flex  gap-4">
        {/** Company */}
        <div className="w-1/3 min-w-[400px] min-h-[300px]  flex flex-col gap-1">
        <span className="my-2">
            <h3>Company Info</h3>
       
          </span>
          <div className="bg-white p-6 rounded-lg border-solid border-gray-200 flex flex-col gap-3">
            <span className="min-w-[100px]">
              <h3 className="text-sm">Company Registration</h3>
              <p className="text-base font-medium">
                {proposal?.client?.clientInformation?.companyRegistration}
              </p>
            </span>
            <span className="min-w-[100px]">
              <h3 className="text-sm ">Company Size</h3>
              <p className="text-base font-medium">
                {proposal?.client?.clientInformation?.companySize}
              </p>
            </span>
            <span className="min-w-[100px]">
              <h3 className="text-sm ">Company Location</h3>
              <p className="text-base font-medium">
                {proposal?.client.user.country}, {proposal?.client.user.postalCode}
              </p>
            </span>
          </div>
        </div>
        {/** Questions */}
        <div className="w-full flex flex-col gap-1">
          <span className="my-2">
            <h3>Questions</h3>

          </span>
          <div className="flex flex-col gap-4">
            {primaryColumn.map((question, index) => {
              return (
                <div
                  key={index}
                  className="  w-full min-h-[100px] flex flex-col gap-2 p-6 bg-white rounded-md border border-solid border-stone-300"
                >
                  <span className="text-base font-semibold">
                    {question.question}
                  </span>
                  <p className=" text-base text-stone-600">{question.answer}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
