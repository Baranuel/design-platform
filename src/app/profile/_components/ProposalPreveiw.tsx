import { Proposal, Question } from "@prisma/client";
import prismaClient from "@/app/network/prismaClient";
import Image from "next/image";

const getQuestions = async () => {
  return await prismaClient.question.findMany();
};

interface Props {
  proposal: Proposal;
  questions: Question[];
}

export const ProposalPreview = async ({ proposal, questions }: Props) => {
  const proposalQuestions = questions.map((question) => {
    const proposalKey = proposal[question.title as keyof Proposal];

    return {
      question: [question.question],
      title: question.title,
      answer: proposalKey,
    };
  });

  const primaryColumn = proposalQuestions.filter(q => q.title !== 'files')
  const secondaryColumn = proposalQuestions.filter(q => q.title === 'files')


  return <div className=" min-h-[800px] w-full  p-8 flex gap-8">
    <div className="w-3/5 h-full flex flex-col gap-8">
        {primaryColumn.map((question, index) => {
            return (
                <div key={index} className="flex flex-col gap-4 p-6 bg-white rounded-xl shadow-md border border-solid border-stone-200">
                    <span className="text-base font-bold">{question.question}</span>
                    <span>{question.answer}</span>
                </div>
            )
        })}
    </div>
    <div className="w-2/5 h-full">
        {secondaryColumn.map((question, index) => {
            const files = question.answer as string[]
            return (
                <div key={index} className="flex flex-col gap-4 p-6">
                    <span className="text-base">{question.question}</span>
                    <hr className="border-none bg-stone-300 h-[1px]" />
                    <div className="flex gap-2">
                    {files.map((file, index) => {
                        return (
                            <div key={index} className=" w-24 h-24 overflow-hidden relative items-center border border-solid border-stone-200 rounded-md shadow-md">
                                <Image unoptimized src={file} alt="file" fill/>
                            </div>
                        )
                    })}
                    </div>
                </div>
            )
        })}
    </div>
     
  </div>;
};
