import { WebhookEvent } from "@clerk/nextjs/server";
import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
    const payload: WebhookEvent = await request.json();

    switch (payload.type) {
        case "user.deleted":

            const user = await prisma.user.findFirst({
                where: {
                    clerkId: payload.data.id
                }
            })

            await prisma.user.delete({
                where: {
                    id: user?.id
                }
            })
            break;
        default:
            break;
    }
    return NextResponse.json({ success: true });
}

export async function GET() {
    return Response.json({ message: "Hello World!" });
}