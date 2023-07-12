"use client"
import axios, { AxiosError } from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface UserResponse {
  user: string | null;
  error: AxiosError<any> | null; // Updated type for error
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUser();

      if (error) {
        push("/");
        return;
      }

      setIsSuccess(true);
    })();
  }, [push]);

  if (!isSuccess) {
    return ;
  }

  return <main>{children}</main>;
}

async function getUser(): Promise<UserResponse> {
  try {
    const accessToken = Cookies.get("accessToken");
    // if (!accessToken) {
    //   throw new Error("There is no accessToken");
    // }

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
    return { user: null, error: error as AxiosError<any> }; // Cast error to AxiosError<any>
  }
}
