
import prismaClient from "@/app/network/prismaClient";
import { dataWithId } from "@/app/profile/mutations/update-profile-mutation";

import { NextResponse } from "next/server";



export async function POST(request: Request) {
  const payload: dataWithId = await request.json();


  const userData = {
    clerkId: payload.clerkId,
    role: payload.role,
    country: payload.country,
    postalCode: payload.postalCode
  }
  const user = await prismaClient.user.create({data: userData })
  if(!user) return NextResponse.error()

  if (payload.role === "CLIENT") {
    await prismaClient.client.create({data:{
      userId: user.id,
      clientInformation: {
        create: {
          companyName: payload.companyName,
          companyDescription: payload.companyDescription,
          companyIndustry: payload.companyIndustry,
          companySize: payload.companySize,
          companyRegistration: payload.companyRegistration,
          companyWebsite: payload.companyWebsite
        }
      }
    }})
  }
  if (payload.role === "DESIGNER") {
    await prismaClient.designer.create({data:{
      userId: user.id,
      designerInformation: {
        create: {
          university: payload.university,
          yearsOfExperience: +payload.yearsOfExperience,
          portfolio: payload.portfolio
        }
      }
    }})
  }

  const finishedUser = await prismaClient.user.findUnique({where: {id: user.id}, include: {client: {
    include: {clientInformation: true}
  }, designer: {
    include: {designerInformation: true}
  }}})

  return NextResponse.json(finishedUser);
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}