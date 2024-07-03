/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'http',
              hostname: 'res.cloudinary.com',
              pathname: '**',
            },
        ]
    }
};

export default nextConfig;
