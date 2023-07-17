"use client"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import getUserData from "@/lib/api/getUser";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { push } = useRouter();

  useEffect(() => {
    (async () => {
      const { user, error } = await getUserData();

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


