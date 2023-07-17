import axios from 'axios'


export default async function fetchUser(accessToken: string) {
    try {
        const response = await axios.get(
            process.env.API_URL_ME as string,
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