import { getUserFromDb } from '@/app/(helpers)/server/get-user-from-db';
import { getAuth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';


const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    const user = await getUserFromDb();


    const body = await request.json();
    const proposal = { ...body, clientId: user?.id };

    const createdProposal = await prisma.proposal.create({
        data: proposal
    })


    return NextResponse.json({ status: 201, data: createdProposal });
}

export async function GET(request: NextRequest) {
    const user = await getUserFromDb();
    const proposal = await prisma.proposal.findFirst({
        where: {
            clientId: user?.id,
        },
        include: {
            client: true,
        },
    })

    return NextResponse.json(proposal);
}