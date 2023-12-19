import { Suspense } from "react"





export const DesignerProfilePage = async () => {

    return (
        <>
          <div className="flex flex-col gap-3 mt-24 h-[320px]">
        <h1 className="text-2xl">Profile Information</h1>
        <Suspense fallback={<div>Loading...</div>}>

        </Suspense>
      </div>
        </>
    )

}