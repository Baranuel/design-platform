'use client'

import { deleteDesignLink } from "@/app/(actions)/collaboration-actions";
import { CloseCircleOutlined,  LoadingOutlined } from "@ant-design/icons"
import { useTransition } from "react";

export const DeleteLinkButton = ({id}:{id:number}) => {
    const [isPending, startTransition] = useTransition();

    return   <span>
        {isPending ? <LoadingOutlined /> :
        <CloseCircleOutlined onClick={() => {
        startTransition(async () => await deleteDesignLink(id));
        }}/>}
    </span>

}