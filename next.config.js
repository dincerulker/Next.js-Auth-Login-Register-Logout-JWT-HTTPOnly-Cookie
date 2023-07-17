require('dotenv').config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_URL_LOGIN: process.env.API_URL_LOGIN,
        API_URL_ME: process.env.API_URL_ME,
        API_URL_REGISTER: process.env.API_URL_REGISTER,
        API_URL_RESET_PASSWORD: process.env.API_URL_RESET_PASSWORD,
        API_URL_FORGOT_PASSWORD: process.env.API_URL_FORGOT_PASSWORD,
        API_URL_REFRESH: process.env.API_URL_REFRESH,
        // ...
    },
};

module.exports = nextConfig;



// require('dotenv').config();

// /** @type {import('next').NextConfig} */
// const nextConfig = {}

// module.exports = nextConfig

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     async redirects() {
//         return [
//             {
//                 source: '/',
//                 destination: '/yeni-acilis-sayfasi', // Yeni açılış sayfasının rotası
//                 permanent: true, // Kalıcı yönlendirme mi, geçici yönlendirme mi olduğunu belirleyin
//             },
//         ];
//     },
// };

// module.exports = nextConfig;
