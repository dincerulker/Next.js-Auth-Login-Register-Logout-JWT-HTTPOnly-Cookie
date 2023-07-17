"use client"

import './globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Inter } from 'next/font/google'
import getUserData from '../lib/api/getUser'

const inter = Inter({ subsets: ['latin'] })


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user } = await getUserData();

      if (user) {
        push('/dashboard');
      }
      setIsLoading(false);
    })();
  }, [push]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
            }}
          >
            <div
              style={{
                display: 'inline-block',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                border: '3px solid #ccc',
                borderTopColor: '#333',
                animation: 'spin 1s infinite linear',
              }}
            ></div>
          </div>
        ) : (
          children 
        )}
        <style>
          {`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          `}
        </style>
      </body>
    </html>
  );
}