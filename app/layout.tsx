import './globals.css';
//import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import Navbar2 from '@/components/nav2';
import {ClerkProvider} from '@clerk/nextjs'
import Footer from '@/components/footer';

export const metadata = {
  title: 'zainiee online store',
  description:
    'A simple Next.js app with Vercel Postgres as the database and Drizzle as the ORM',
};

// const inter = Inter({
//   variable: '--font-inter',
//   subsets: ['latin'],
//   display: 'swap',
// });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
     <ClerkProvider>
    <html lang="en">
      
      <body >
        <Navbar/>
      
        {children}
        <Footer/>
        </body>
    </html>
   </ClerkProvider>
  );
}
