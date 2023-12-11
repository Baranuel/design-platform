import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const payload:User = await request.json();

  const user = await prisma.user.create({
      data: {
        clerkId: payload.clerkId,
        role: payload.role
      }
  })

  if(user.role === "CLIENT")  {
     await prisma.client.create({
      data: {
        id: user.id
      }
    })}  else {
      await prisma.designer.create({
      data: {
        id: user.id
      }
    })
  }

  return NextResponse.json({ success: true});
}

export async function GET() {
  return Response.json({ message: "Hello World!" });
}