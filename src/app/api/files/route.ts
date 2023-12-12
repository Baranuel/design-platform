
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename') || 'untitled';

  const formData = await request.formData();
  const file = formData.get('file');
  if(!file) return NextResponse.error();


  // const blob = await put(filename, file, {
  //   access: 'public',
  // });


 
  return NextResponse.json("blob");
}