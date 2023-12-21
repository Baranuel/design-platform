import { Suspense } from "react"
import { ClientButton } from "./ClientButton"





export const DesignerProfilePage = async () => {

    return (
        <>
          <div className="flex flex-col gap-3 mt-24 h-[320px]">
        <h1 className="text-2xl">Profile Information</h1>

        <ClientButton />
        <Suspense fallback={<div>Loading...</div>}>

        </Suspense>
      </div>
        </>
    )

}