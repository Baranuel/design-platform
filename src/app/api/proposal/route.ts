import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();
 
export async function POST(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ status: 401, error: "Not authenticated" });
    }

    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId,
        },
        include: {
            client: true,
        },
    })

    if(!user || !user.client) return NextResponse.json({ status: 404, error: "User not found" });


    const body = await request.json();
    const proposal = {...body, clientId: user.id};

    const createdProposal = await prisma.proposal.create({
        data: proposal
    })

 
  return NextResponse.json({ status: 201, data: createdProposal } );
}

export async function GET(request: NextRequest) {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json({ status: 401, error: "Not authenticated" });
    }
    const user = await prisma.user.findUnique({
        where: {
            clerkId: userId,
        },
        include: {
            client: true,
        },
    })

    if(!user || !user.client) return NextResponse.json({ status: 404, error: "User not found" });

    const proposal = await prisma.proposal.findFirst({
        where: {
            clientId: user.id,
        },
        include: {
            client: true,
        },
    })
 
  return NextResponse.json({ status: 200, data: proposal } );
}