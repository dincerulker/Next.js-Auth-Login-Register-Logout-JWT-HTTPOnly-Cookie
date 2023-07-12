"use client";

import axios, { AxiosError } from 'axios';
import { useRouter } from "next/navigation";
import React from 'react'

function ResetPassword() {
    const { push } = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            email: event.currentTarget.email.value,
            passwordResetToken: Number(event.currentTarget.otp.value),
            password: event.currentTarget.password.value,
        };

        try {
            const { data, status } = await axios.post("https://pushouseinternal.fcanmekikoglu.repl.co/auth/reset-password", payload);

            if (status === 201) {
                setAuthCookies(data.accessToken, data.refreshToken);
                push("/dashboard");
            }
            

            alert('Şifreniz sıfırlandı.');

        } catch (e) {
            const error = e as AxiosError;
            alert(error.message);
        }

        console.log(payload)

    };


    let currentDate = new Date();

    const accessTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 3);
    const refreshTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 7);

    const setAuthCookies = (accessToken: string, refreshToken: string) => {
        // AccessToken cookie'yi yazdırma
        document.cookie = `accessToken=${accessToken}; expires=${new Date(accessTokenExpiresAt).toUTCString()}; path=/;`;
        // RefreshToken cookie'yi yazdırma
        document.cookie = `refreshToken=${refreshToken}; expires=${new Date(refreshTokenExpiresAt).toUTCString()}; path=/;`;
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
                    <label htmlFor="passwordResetToken">Otp:</label>
                    <input
                        type="number"
                        id="passwordResetToken"
                        name="passwordResetToken"
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
        </main>
    );
}

export default ResetPassword