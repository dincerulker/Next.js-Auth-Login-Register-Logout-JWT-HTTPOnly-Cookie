import axios from 'axios'
import Cookies from 'js-cookie'

interface UserResponse {
    user: string | null;
    error: any | null;
}

export default async function getUserData(): Promise<UserResponse> {
    try {
        const accessToken = Cookies.get("accessToken");
        const response = await axios.get(
            process.env.API_URL_ME as string,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        return { user: response.data, error: null };
    } catch (error) {
        console.error("Error fetching user:", error);
        return { user: null, error: error };
    }
}