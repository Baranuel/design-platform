import { Proposal, Question } from "@prisma/client";
import prismaClient from "@/app/network/prismaClient";
import Image from "next/image";

const getQuestions = async () => {
  return await prismaClient.question.findMany();
};

const getProposal = async (id: number) => {
  return await prismaClient.proposal.findUnique({
    where: {
      id: id,
    },
    include: {
      client: {
        include: {
          user: true,
          clientInformation: true,
        },
      },
    },
  });
}

export const ProposalPreview = async ({id}: {id:number | undefined}) => {
  if(!id) return null 
  const questions = await getQuestions();
  const proposal = await getProposal(id)
  const proposalQuestions = questions.map((question) => {
    const proposalKey = proposal?.[question.title as keyof Proposal];

    return {
      question: [question.question],
      title: question.title,
      answer: proposalKey,
    };
  });

  const primaryColumn = proposalQuestions.filter(q => q.title !== 'files')
  const secondaryColumn = proposalQuestions.filter(q => q.title === 'files')


  return <div className=" min-h-[800px] my-24   flex items-center justify-center gap-2">
    
    <div className="max-w-[804px] h-full flex items-center justify-center flex-wrap gap-4">
        {primaryColumn.map((question, index) => {
            return (
                <div key={index} className="w-full min-h-[150px] flex flex-col gap-2 p-10 bg-white rounded-md border border-solid border-stone-300">
                    <span className="text-base font-semibold">{question.question}</span>
                    <p className="text-stone-600">{question.answer}</p>
                </div>
            )
        })}
    </div>
     
  </div>;
};
