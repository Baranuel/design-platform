import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from '../antd/Registry'
import { ClerkProvider } from '@clerk/nextjs'
import { UserButton } from "@clerk/nextjs";
import { currentUser } from '@clerk/nextjs'
import { Blur } from './components/Blur'
import { Navigation } from './components/Navigation/Navigation'
import { ConfigProvider } from 'antd'


const inter = Inter({
   subsets: ['latin'],
   variable: '--font-inter',
   })

export const metadata: Metadata = {
  title: 'Design Platform',
  description: 'Place where your business meets design',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en">
      <StyledComponentsRegistry>
      <ConfigProvider theme={{
          token: {
            // Seed Token
            colorPrimary: '#7359E3',
            borderRadius: 2,
          },
      }}>

       <body className={inter.className}>
        <Navigation/>
       <Blur/>

        <main className='py-10 z-30 pt-[4rem] w-full overflow-hidden'>          
          {children}
          </main>
        </body>
      </ConfigProvider>
      </StyledComponentsRegistry>
    </html>
    </ClerkProvider>
  )
}
