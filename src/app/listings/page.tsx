import { Suspense, cache } from "react"
import { ProposalsList } from "./(components)/ProposalsList"
import { axiosInstance } from "../network/axios-instance";



export default async function Listings () { 



    return (
        <section className=" min-h-[calc(100vh-120px)] px-80 2xl:px-48 xl:px-32 lg:px-24 md:px-12 sm:px-4 ">
            <div className="min-h-[300px]"></div>
            <hr />
        <Suspense fallback={<div>Loading...</div>}>
            <ProposalsList />
        </Suspense>
        </section>
    )
}