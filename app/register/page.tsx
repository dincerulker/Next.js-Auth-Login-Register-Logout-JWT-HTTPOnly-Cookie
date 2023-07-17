"use client"
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterForm() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const { push } = useRouter();

    interface UserResponse {
        user: string | null;
        error: AxiosError | null;
    }

    async function registerUser(
        email: string,
        password: string
    ): Promise<UserResponse> {
        try {
            const  response = await axios.post("https://pushouseinternal.fcanmekikoglu.repl.co/auth/signup", {
                email,
                password,
            });
            const user = await fetchUser(response.data.accessToken)
            console.log(user)

            setAuthCookies(response.data.accessToken, response.data.refreshToken);
            
            return {
                user: response.data,
                error: null,
            };

        } catch (e) {
            const error = e as AxiosError <any> ;
            console.log(error.response?.data.message)
            return {
                user: null,
                error,
            };
        }
    }

    let currentDate = new Date();

    const accessTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 3);
    const refreshTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 7);

    const setAuthCookies = (accessToken: string, refreshToken: string) => {
        // AccessToken cookie'yi yazdırma
        document.cookie = `accessToken=${accessToken}; expires=${new Date(accessTokenExpiresAt).toUTCString()}; path=/;`;
        // RefreshToken cookie'yi yazdırma
        document.cookie = `refreshToken=${refreshToken}; expires=${new Date(refreshTokenExpiresAt).toUTCString()}; path=/;`;
    }


    async function fetchUser(accessToken : string) {
        try {
            const response = await axios.get(
                'https://pushouseinternal.fcanmekikoglu.repl.co/users/me',                
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    }
    

    async function handleRegister() {
        const { user, error } = await registerUser(email, password);

        if (error) {
            push("/register");
            alert("Kullanıcı kayıt olamadı")
            return;
        }
        if(user){
            push('/dashboard');
        }

        // console.log("Kayıt başarılı. Kullanıcı:", user);
    }

    return (
        <form>
            <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setemail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Şifre"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button type="button" onClick={handleRegister}>
                Kaydet
            </button>
        </form>
        
    );
}

export default RegisterForm;
