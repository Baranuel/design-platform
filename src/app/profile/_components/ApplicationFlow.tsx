
import { useState } from "react";
import { Form } from "./Form";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const getQuestions = async () => {
    return await prisma.question.findMany();
}

export const ApplicationFlow = async () => {
   const questions =  await getQuestions();

  return (
    <section>
      <div className="flex mt-2 gap-2 items-center">
        <div className="">Apply for website redesign here</div>
      </div>
      <Form questions={questions} />
    </section>
  );
};
