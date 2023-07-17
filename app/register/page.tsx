"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import registerUser from "@/lib/api/registerUser";

function RegisterForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { push } = useRouter();

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
    }

    return (
        <form>
            <input
                type="text"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
