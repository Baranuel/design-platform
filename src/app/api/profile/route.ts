import { NextResponse } from 'next/server';
import { clerkClient, currentUser } from "@clerk/nextjs";


export async function PUT(req: Request) {
    const formData =  await req.json();

    const user = await currentUser();
    if (!user) return NextResponse.error();

    await clerkClient.users.updateUserMetadata(user.id, {
      publicMetadata: formData
    }).then((user) => console.log(user))
  
    return NextResponse.json({ success: true });
  }