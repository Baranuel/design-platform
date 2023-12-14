import { Form } from "./Form";
import prismaClient from "@/app/network/prismaClient";

const getQuestions = async () => {
    return await prismaClient.question.findMany();
}



export const ApplicationFlow = async () => {

  return (
    <section>
      <div className="flex mt-2 gap-2 items-center">
        <div className="">Apply for website redesign here</div>
      </div>

    </section>
  );
};
