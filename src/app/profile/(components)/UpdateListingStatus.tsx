
'use client'

import { Button } from "antd"
import { useTransition } from "react"
import { UserListing } from "../../../../global"
import { setListingStatusActive, setListingStatusInactive } from "@/app/(actions)/listing-actions"

export const UpdateListingStatus = ({status, id}: UserListing) => {
    const [isPending, startTransaction] = useTransition()

    return (
        <Button 
        onClick={() => startTransaction(async () => {
            if(status === 'ACTIVE'){
                 await setListingStatusInactive(id)
            }
            if(status === 'INACTIVE') {
              await setListingStatusActive(id)
            }
        })
}       className="absolute top-0 right-0"
        loading={isPending}
        type="primary">{status === 'ACTIVE' ? "Set Inactive" : "Set Active"}</Button>

    )
}

