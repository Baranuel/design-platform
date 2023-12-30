import puppeteer from 'puppeteer';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getUserFromDb } from '@/app/(helpers)/server/get-user-from-db';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {

    const user = await getUserFromDb()
    if(!user) return NextResponse.error();
   
    const {companyWebsite} = await request.json();
   // Launch a new browser using puppeteer
   const browser = await puppeteer.launch();

   // Create a new page in the browser
   const page = await browser.newPage();

  // Navigate to the url
  await page.goto(companyWebsite);

  // Take a screenshot of the page
  const screenshot = await page.screenshot({
    fullPage: true,
  });

  // Close the browser once done
  await browser.close();

  const blob = await put('test', screenshot, {
    access: 'public',
  });


return NextResponse.json({ status: 201, data: blob });
}

export async function GET(request: NextRequest) {
    console.log('test')
    return NextResponse.json({ status: 201, data: 'test' });
}
