import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/Navbar';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';
import SessionProvider from '@/components/SessionProvider';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Typography from '@mui/material/Typography';

// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const session = await getServerSession(authOptions);
  // console.log('session', session);
  return (
    <SessionProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Navbar />
          {/* {session ? <Typography sx={{ color: 'red', textAlign: 'center' }}>Hello</Typography> : null} */}
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
