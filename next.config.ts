/** @type {import("next").NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/",
                destination: "/tracks",
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
            {
                protocol: "http",
                hostname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
