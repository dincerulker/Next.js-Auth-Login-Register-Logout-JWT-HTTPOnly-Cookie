"use client"

import './globals.css'
import { useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { Inter } from 'next/font/google'
import axios from 'axios'
import Cookies from 'js-cookie'

const inter = Inter({ subsets: ['latin'] })

interface UserResponse {
  user: string | null;
  error: any | null; // Updated type for error
}

async function getUser(): Promise<UserResponse> {
  try {
    const accessToken = Cookies.get("accessToken");
    const response = await axios.get(
      "https://pushouseinternal.fcanmekikoglu.repl.co/users/me",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return { user: response.data, error: null };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { user: null, error: error }; // Removed the type casting
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user } = await getUser();

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