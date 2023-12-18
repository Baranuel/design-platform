
import { put } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
 
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get('file') as File;
  
  if(!file) return NextResponse.error();

  const filename = file?.name;

  const blob = await put(filename, file, {
    access: 'public',
  });


 
  return NextResponse.json(blob);
}