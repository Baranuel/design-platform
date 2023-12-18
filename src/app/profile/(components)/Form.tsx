"use client";

import { Button, Modal } from "antd";
import { FormProvider, set, useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { Question } from "@prisma/client";
import { RenderQuestion } from "./RenderQuestion";
import { createProposal } from "@/app/(actions)/proposal-actions";


interface Props {
  questions: Question[];
}

export const Form = ({ questions }: Props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [isPending, startTransition] = useTransition()
  const methods = useForm({
    mode: "onChange",
  });

  const currentFieldValue = methods.watch(currentQuestion.title);
  const currentFieldHasError =  currentFieldValue === undefined || !!methods.formState.errors[currentQuestion.title]
  const isLastQuestion = currentQuestion.id === questions.length;


  function handleNextQuestion() {
    setCurrentQuestion((prevQuestion) => {
      const nextQuestion = questions.find(
        (question) => question.id === prevQuestion.id + 1
      );
      return nextQuestion || prevQuestion;
    });
  }

  function handlePreviousQuestion() {
    setCurrentQuestion((prevQuestion) => {
      const previousQuestion = questions.find(
        (question) => question.id === prevQuestion.id - 1
      );
      return previousQuestion || prevQuestion;
    });
  }

   function submit(data: any) {
    startTransition( async () => await createProposal(data))
  }

  function onClose() {
    setIsModalVisible(false);
    setCurrentQuestion(questions[0]);
    methods.reset();
  }

  return (
    <>
      <Button onClick={() => setIsModalVisible(!isModalVisible)} type="primary">
        Request Redesign
      </Button>
      <Modal
        maskClosable={false}
        className="w-1/2 xl:w-2/3 sm:w-full"
        footer={[
          <Button key="back" onClick={handlePreviousQuestion}>
            Back
          </Button>,
          <Button
            key="submit"
            type="primary"
            disabled={currentFieldHasError}
            loading={isPending}
            onClick={
              isLastQuestion ? methods.handleSubmit(submit) : handleNextQuestion
            }
          >
            {isLastQuestion ? "Submit" : "Next"}
          </Button>,
        ]}
        title={`${currentQuestion.id} / ${questions.length} Request Redesign`}
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => onClose()}
        destroyOnClose={true}
      >
        <form action="">
          <span className="text-base font-bold my-2"> </span>
          {currentQuestion.id === 1 && (
            <p className="text-base my-6">
              This is a series of questions regarding your business and
              motivation for wanting a re-design. This information will help the
              designers to narrow down the research and give them direction in
              which to go so please take your time to answer them in detail.
            </p>
          )}
          <FormProvider {...methods}>
            <RenderQuestion  question={currentQuestion} />
          </FormProvider>
          {currentQuestion.id !== 8 && (
            <span className={`pt-2 ${currentFieldHasError ? "text-red-500" : "text-green-500"}`}>{`Your answer needs to contain at least 50 characters | ${currentFieldValue ? currentFieldValue.length : 0}`}</span>

          )}
        </form>
      </Modal>
    </>
  );
};
