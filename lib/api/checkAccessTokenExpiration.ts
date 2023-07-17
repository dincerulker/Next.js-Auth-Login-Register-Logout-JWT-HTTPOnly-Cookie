
import Cookies from "js-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";

export default function checkAccessTokenExpiration () {
    
    const accessToken:any = Cookies.get("accessToken");

    const decodedToken: any = jwtDecode(accessToken);
    const expiration = decodedToken.exp;

    const currentTime = Math.floor(Date.now() / 1000);

    if (expiration - currentTime < 86400) {
        const refreshToken = Cookies.get("refreshToken");

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    process.env.API_URL_REFRESH as string,
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