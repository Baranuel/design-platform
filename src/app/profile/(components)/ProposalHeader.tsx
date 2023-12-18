'use client'


import { Button } from "antd"
import { useTransition } from "react"

export const ProposalHeader =  ({status, id}:{status:string, id:number | undefined}) => {
    const [isPending, startTransition] = useTransition()


   
    return (
        <div className="w-full flex items-center justify-end p-2  ">
            <span>status: {status}</span>
        </div>
    )
}