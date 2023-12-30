
'use client'

import { axiosInstance } from "@/app/(network)/axios-instance"

export const ClientButton =  () => {
    const handlePuppeteer = async () => {
        const {data} = await axiosInstance.post('/puppeteer')
        console.log(data)
    }
    return (
        <button onClick={handlePuppeteer}>Client Button</button>
    )
}