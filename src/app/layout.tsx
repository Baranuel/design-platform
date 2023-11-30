import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from '../antd/Registry'
import { ClerkProvider } from '@clerk/nextjs'
import { Blur } from './components/Blur'

const inter = Inter({
   subsets: ['latin'],
   variable: '--font-inter',
   })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
       <body className={inter.className}>
       <nav className="flex fixed top-0 w-full z-40 items-center justify-between flex-wrap bg-white shadow-sm h-16  p-2">hello</nav>
       <Blur/>
        <main className='py-10 pt-[4rem]'>          
          {children}
          </main>
        </body>
      </StyledComponentsRegistry>
    </html>
    </ClerkProvider>
  )
}