import puppeteer from 'puppeteer';

import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getUserFromDb } from '@/app/(helpers)/server/get-user-from-db';


const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const maxDuration = 60;

export async function POST(request: NextRequest) {

    const user = await getUserFromDb()
    if (!user) return NextResponse.error();

    const { companyWebsite } = await request.json();

    const urlValidator = (url: string) => {
        const regex = new RegExp(/^https:\/\/www\.\w+\.\w+$/);
        return regex.test(url)  || !url ? true : false;
      };

      if(!urlValidator(companyWebsite)) return  NextResponse.json({ status: 201, data: {url:'incorrect url'} })

    const browser = IS_DEVELOPMENT ?
        await puppeteer.launch({ headless: 'new' }) :
        await puppeteer.connect({
            browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.CHROMIUM_HEADLESS}`
        });;

    // Create a new page in the browser
    const page = await browser.newPage();
    console.log('goin to page')

    await page.setViewport({
        width: 1240,
        height: 720,
        deviceScaleFactor: 1,
      });

    // Navigate to the url
    await page.goto(companyWebsite);

    // Take a screenshot of the page
    const screenshot = await page.screenshot({
        fullPage: false,
    });

    // Close the browser once done
    await browser.close();
    console.log('closing the browser')
    const blob = await put('test', screenshot, {
        access: 'public',
    });


    return NextResponse.json({ status: 201, data: blob });
}

export async function GET(request: NextRequest) {
    console.log('test')
    return NextResponse.json({ status: 201, data: 'test' });
}
