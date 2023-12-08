import { NextResponse } from 'next/server';
import { clerkClient, currentUser } from "@clerk/nextjs";
import type { WebhookEvent } from "@clerk/clerk-sdk-node"


export async function PUT(req: Request) {
    const formData =  await req.json();

    const user = await currentUser();
    if (!user) return NextResponse.error();

    const clerkProfile = await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: formData
    }).then((user) => user)
  
    return NextResponse.json(clerkProfile);
  }