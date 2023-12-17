'use server'

import { currentUser } from "@clerk/nextjs";
import prismaClient from "../(network)/prismaClient";
import { redirect } from "next/navigation";
import { getUserFromDb } from "../helpers/server/get-user-from-db";



export const createUserProfile = async (profileData:any) => {
    const user = await currentUser(); // get the current user from Clerk
    if (!user) { throw new Error('Not authenticated')}

    const userData = {
        clerkId: user.id,
        role: profileData.role,
        country: profileData.country,
        postalCode: profileData.postalCode
      }

    
    const userProfile = await prismaClient.user.create({data: userData })
    if(!userProfile) { throw new Error('User not created') }

    if (profileData.role === "CLIENT") {
        await createClientProfile(profileData)
    }   

    if (profileData.role === "DESIGNER") {
        await createDesignerProfile(profileData)
    }

    redirect('/profile' )
}

export const createClientProfile = async (profileData:any) => {
    const user = await getUserFromDb(); // get the user from database
    if(!user) { throw new Error('User not found') }

    await prismaClient.client.create({data:{
        userId: user.id,
        clientInformation: {
          create: {
            companyName: profileData.companyName,
            companyDescription: profileData.companyDescription,
            companyIndustry: profileData.companyIndustry,
            companySize: profileData.companySize,
            companyRegistration: profileData.companyRegistration,
            companyWebsite: profileData.companyWebsite
          }
        }
      }})
}

export const createDesignerProfile = async (profileData:any) => {
    const user = await getUserFromDb(); // get the user from database
    if(!user) { throw new Error('User not found') }

    await prismaClient.designer.create({data:{
        userId: user.id,
        designerInformation: {
          create: {
            university: profileData.university,
            yearsOfExperience: +profileData.yearsOfExperience,
            portfolio: profileData.portfolio
          }
        }
      }})
}