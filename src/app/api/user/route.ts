import { getUserFromDb } from "@/app/helpers/server/get-user-from-db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    const prismaUser = await getUserFromDb();
    if (!prismaUser) return NextResponse.json({ status: 404, error: "User not found" });
    
    return NextResponse.json(prismaUser);
}