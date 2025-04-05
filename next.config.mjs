/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                port: '',
                pathname: '/photos/**',
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'static.wixstatic.com',
            },
            {
                protocol: 'https',
                hostname: 'www.pexels.com',
                port: '',
                pathname: '/photo/**',
            }
        ],
    }
};

export default nextConfig;