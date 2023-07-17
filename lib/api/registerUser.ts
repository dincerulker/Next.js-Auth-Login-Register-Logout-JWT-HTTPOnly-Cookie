import axios, { AxiosError } from "axios";
import fetchUser from "./fetchUser";
import setAuthCookies from "./setAuthCookies";

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
}

const API_URL_REGISTER = process.env.API_URL_REGISTER

export default async function registerUser(email: string, password: string): Promise<UserResponse> {
    try {
        const response = await axios.post(API_URL_REGISTER as string, {
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
        const error = e as AxiosError<any>;
        console.log(error.response?.data.message)
        return {
            user: null,
            error,
        };
    }
}