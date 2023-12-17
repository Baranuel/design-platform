'use client'

import { publishProposal } from "@/app/(actions)/proposal-actions"
import { Button } from "antd"
import { useTransition } from "react"

export const ProposalHeader =  ({status, id}:{status:string, id:number | undefined}) => {
    const [isPending, startTransition] = useTransition()

    const handlePublish = () => {
        if(!id ) return
        startTransition(async () => {
            await publishProposal(id)
        })
    }
    return (
        <div className="w-full flex items-center justify-end p-2  ">
            <span>status: {status}</span>
            {status === 'PUBLISHED' ? null : <Button loading={isPending} onClick={handlePublish} type="primary" placeholder="Status" className="min-w-[100px]  h-10  rounded-md border-none" >PUBLISH</Button>}
        </div>
    )
}