"use client"

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";



export default function DashboardPage() {
    const router = useRouter();
    const accessToken = Cookies.get("accessToken");

    useEffect(() => {
        if (!accessToken) {
            router.push("/");
        }
    }, [accessToken, router]);

    const handleLogout = async () => {
        const refreshToken = Cookies.get("refreshToken");
        //db ye refresh token ile istek atıp hash sildirme
        try {
            await axios.get("https://pushouseinternal.fcanmekikoglu.repl.co/auth/logout", {
                headers: {
                    Authorization: `Bearer ${refreshToken}`
                }
            });
            // AccessToken ve RefreshToken çerezlerini silme
            document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    };

    if (accessToken) {
        return (
            <div>
                <header>
                    <Link style={{ color: "yellow", backgroundColor: "black" }} className="bg-yellow" href='/dashboard/settings'>
                        Settings
                    </Link>
                </header>
                <h1>Super Secret Dashboard</h1>
                <button onClick={handleLogout}>Logout</button>
            </div>
        );
    }

    return null;
}

