
export default function setAuthCookies (accessToken: string, refreshToken: string) {
    let currentDate = new Date();

    const accessTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 3);
    const refreshTokenExpiresAt = currentDate.setDate(currentDate.getDate() + 7);
    // AccessToken cookie'yi yazdırma
    document.cookie = `accessToken=${accessToken}; expires=${new Date(accessTokenExpiresAt).toUTCString()}; path=/;`;
    // RefreshToken cookie'yi yazdırma
    document.cookie = `refreshToken=${refreshToken}; expires=${new Date(refreshTokenExpiresAt).toUTCString()}; path=/;`;
}