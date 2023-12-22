import { Proposal } from "@prisma/client";
import prismaClient from "@/app/(network)/prismaClient";
import Image from "next/image";
import { getProposal } from "@/app/(database-queries)/proposal-queries";
import Link from "next/link";

const getQuestions = async () => {
  return await prismaClient.question.findMany();
};

type ProposalKey = keyof Omit<Proposal, "createdAt" | "id" | "clientId" >;

export const ProposalPreview = async ({id}: {id:number | undefined}) => {
  if(!id) return null 
  const questions = await getQuestions();
  const proposal = await getProposal()
  const proposalQuestions = questions.map((question) => {
    const proposalKey = proposal?.[question.title as ProposalKey];

    return {
      question: [question.question],
      title: question.title,
      answer: proposalKey,
    };
  });

  const primaryColumn = proposalQuestions.filter(q => q.title !== 'files')
  const files = proposalQuestions.filter(q => q.title === 'files')



  return <div className=" min-h-[800px] rounded-md border-solid border-[1px] border-gray-300  p-6 flex flex-col items-center justify-center gap-3">

<div className="w-full flex flex-col gap-3">
  <h3>Files</h3>
 <div className="w-full min-h-[200px]  p-6">
 {files.map((file, index) => {
          const images = file.answer as string[]
            return (
                <div key={index} className=" flex flex-wrap gap-2 ">
                    {images.map((image,index) => {
                      return  <Link href={image} key={index} className="relative w-24 h-24 shadow-md rounded-md border border-solid border-stone-300 overflow-hidden">
                        <Image unoptimized  src={image} alt="image" fill />
                      </Link>
                    })}
                </div>
            )
        })}
 </div>
</div>

    <div className="w-full h-full flex flex-wrap items-start justify-start gap-3">
    <h3>Questions</h3>
    <div className="w-full flex flex-wrap justify-evenly gap-4 min-h-[300px] p-6">
        {primaryColumn.map((question, index) => {
            return (
                <div key={index} className="  w-[calc(50%-1rem)] min-h-[200px] flex flex-col gap-2 p-10 bg-white rounded-md border border-solid border-stone-300">
                    <span className="text-base font-semibold">{question.question}</span>
                    <p className="text-stone-600">{question.answer}</p>
                </div>
            )
        })}
        </div>
    </div>
     
  </div>;
};
