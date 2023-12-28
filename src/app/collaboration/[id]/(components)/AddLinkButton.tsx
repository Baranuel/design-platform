'use client'
import { addDesignLink } from "@/app/(actions)/collaboration-actions";
import { PlusOutlined } from "@ant-design/icons"
import { Button, Input, Modal } from "antd"
import { useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form"


export const AddLinkButton = ({link, collaborationId}:{link:string, collaborationId:number}) => {
    const [isPending, startTransition] = useTransition();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {
      handleSubmit,
      formState: { errors },
      control,
    } = useForm({
      defaultValues: {
          linkToDesign:link,
      }
    });


    const handleSubmitForm = async (data:Record<string,string>) => {
        startTransition(async () => { await addDesignLink(collaborationId ,data.linkToDesign) })
    }
    
    return (
        <>
        <Modal
        title={` Add link to design`}
        open={isModalVisible}
        onOk={handleSubmit(handleSubmitForm)}
        onCancel={() => setIsModalVisible(false)}
        centered
        okButtonProps={{ disabled:!!errors.linkToDesign}}
        confirmLoading={isPending}
        destroyOnClose={true}
      >
        <form action="">
        <label htmlFor="linkToDesign">Link to design</label>
          <Controller
            control={control}
            name="linkToDesign"
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
              className="my-2 rounded-md"
                value={value}
                onChange={onChange} // send value to hook form
                onBlur={onBlur} // notify when input is touched/blur
              />
              
            )}
          />

        </form>
      </Modal>
      <Button
        onClick={() => setIsModalVisible(!isModalVisible)}
        type="primary"
        disabled={!!link}
        className="w-fit"
      >
        Add Link
        <PlusOutlined />
      </Button>
        </>
        
    )
}