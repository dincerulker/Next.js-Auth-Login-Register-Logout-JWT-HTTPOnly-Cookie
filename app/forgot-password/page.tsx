"use client";

import axios, { AxiosError } from 'axios';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import React from 'react'

function ForgotPassword() {

    const { push } = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const payload = {
            email: event.currentTarget.email.value,            
        };

        try {
            const { status } = await axios.post(process.env.API_URL_FORGOT_PASSWORD as string, payload);

            if (status === 201) {
                push("/reset-password");
            }

        } catch (e) {
            return null;
        }
    };

  return (
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
          <button
              type="submit"
              className="p-2 bg-orange-600 text-white w-fit rounded"
          >
              Submit
          </button>
          
    </form>
  )
}

export default ForgotPassword