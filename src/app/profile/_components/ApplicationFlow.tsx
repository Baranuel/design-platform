"use client";

import { Button, Modal } from "antd";
import { useState } from "react";
import { Form } from "./Form";

export const ApplicationFlow = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <section>
      <div className="flex mt-2 gap-2 items-center">
        <div className="">Apply for website redesign here</div>
        <Button
          onClick={() => setIsModalVisible(!isModalVisible)}
          type="primary"
        >
          Request Redesign
        </Button>
      </div>
      <Form  isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    </section>
  );
};
