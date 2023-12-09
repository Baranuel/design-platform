'use client';
import { Button, Modal } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { Question } from "@prisma/client";

interface Props {
    questions: Question[];
}

export const Form =  ({questions}:Props) => {
    console.log(questions)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const methods = useForm();
    return (
        <>
        <Button
          onClick={() => setIsModalVisible(!isModalVisible)}
          type="primary"
        >
          Request Redesign
        </Button>
        <Modal
        className="w-1/2"
        footer={[]}
        title="Basic Modal"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
        >
      <FormProvider {...methods}>
            <div>hello</div>
    </FormProvider>
        </Modal>
        </>
    );
}