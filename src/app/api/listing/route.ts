import { getUserFromDb } from "@/app/helpers/server/get-user-from-db";
import prismaClient from "@/app/network/prismaClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const prismaUser = await getUserFromDb();
    if (!prismaUser) return NextResponse.json({ status: 404, error: "User not found" });

    const listing =  await prismaClient.proposalListing.findUnique({
        where: {
            clientId: prismaUser.client?.id
        },
        include: {
            proposal: true
        }
    })

    return NextResponse.json(listing);
}