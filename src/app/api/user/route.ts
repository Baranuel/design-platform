import { NextResponse } from 'next/server';
import { clerkClient } from "@clerk/nextjs";
 
export async function POST(req: Request) {
  const { role, id } =  await req.json();

  await clerkClient.users.updateUserMetadata(id, {
    publicMetadata: {
      role
    }
  }).then((user) => console.log(user))

  return NextResponse.json({ success: true });
}