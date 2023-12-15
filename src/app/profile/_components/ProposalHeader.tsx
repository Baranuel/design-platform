'use client'

import { Select } from "antd"

export const ProposalHeader = async () => {
    return (
        <div className="w-full flex items-center justify-end p-2  ">
            <Select placeholder="Status" className="w-fit  h-10 bg-white rounded-md border-none" />
        </div>
    )
}