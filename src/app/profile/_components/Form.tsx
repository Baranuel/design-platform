import { Modal } from "antd";
import { FormProvider, useForm } from "react-hook-form";

interface Props {
    isModalVisible: boolean;
    setIsModalVisible: (value: boolean) => void;
}

const getQuestions = () => {

}

export const Form = ({isModalVisible, setIsModalVisible}:Props) => {
    const methods = useForm();
    return (
        <Modal
        className="w-1/2"
        footer={[]}
        title="Basic Modal"
        open={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={() => setIsModalVisible(false)}
    >
      <FormProvider {...methods}>
            
    </FormProvider>
        </Modal>
    );
}