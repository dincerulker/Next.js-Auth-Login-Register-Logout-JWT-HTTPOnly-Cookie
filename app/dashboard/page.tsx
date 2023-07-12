"use client"

import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode";


export default function DashboardPage() {

    
    useEffect(() => {
        const checkAccessTokenExpiration = () => {
            const accessToken = Cookies.get("accessToken");
            
            if (!accessToken) {
                router.push("/");
                return;
            }

            const decodedToken: any = jwtDecode(accessToken);
            const expiration = decodedToken.exp;

            const currentTime = Math.floor(Date.now() / 1000);

            if (expiration - currentTime < 86400) {
                const refreshToken = Cookies.get("refreshToken");

                const fetchData = async () => {
                    try {
                        const response = await axios.get(
                            "https://pushouseinternal.fcanmekikoglu.repl.co/auth/refresh",
                            {
                                headers: {
                                    Authorization: `Bearer ${refreshToken}`,
                                },
                            }
                        );

                        const newAccessToken = response.data.accessToken;
                        const newRefreshToken = response.data.refreshToken;

                        let currentDate = new Date();

                        const accessTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 3);
                        const refreshTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 7);

                        document.cookie = `accessToken=${newAccessToken}; expires=${new Date(accessTokenExpiresAt).toUTCString()}; path=/;`;
                        document.cookie = `refreshToken=${newRefreshToken}; expires=${new Date(refreshTokenExpiresAt).toUTCString()}; path=/;`;

                    } catch (error) {
                        console.log("Hata oluştu:", error);
                    }
                };
                fetchData();
            }
        };

        checkAccessTokenExpiration();
    }, []);


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

