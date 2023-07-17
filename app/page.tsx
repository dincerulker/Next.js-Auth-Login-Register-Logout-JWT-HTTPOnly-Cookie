"use client"

import axios, { AxiosError } from "axios";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import setAuthCookies from "@/lib/api/setAuthCookies";

export default function Home() {
  const { push } = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      setIsLoggedIn(true);
      push("/dashboard");
    }
  }, [push]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      email: event.currentTarget.email.value,
      password: event.currentTarget.password.value,
    };

    try {
      const { data, status } = await axios.post("https://pushouseinternal.fcanmekikoglu.repl.co/auth/login", payload);

      if (status === 201) {
        setAuthCookies(data.accessToken, data.refreshToken);
        push("/dashboard");
      }

      alert('Logged In!');
    } catch (e) {
      const error = e as AxiosError;
      alert(error.message);
    }
  };


  if (isLoggedIn) {
    return null; // Eğer kullanıcı giriş yapmışsa, formu gösterme
  }

  return (
    <main>
      <h1>Nextjs authentication JWT verify http cookie only</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            required
            className="border rounded border-black"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="border rounded border-black"
          />
        </div>

        <button
          type="submit"
          className="p-2 bg-orange-600 text-white w-fit rounded"
        >
          Submit
        </button>
      </form>
      <div>
        <Link style={{ color: "yellow", backgroundColor: "black" }} className="bg-yellow" href='/forgot-password'>
          Forgot Password
        </Link>
      </div>
      <div>
        <Link style={{ color: "yellow", backgroundColor: "black" }} className="bg-yellow" href='/register'>
          Register
        </Link>
      </div>
    </main>
  );
}
