/** @type {import("next").NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            {
                source: "/search",
                destination: "/handla",
            },
            {
                source: "/kategori/:category",
                destination: "/handla",
            },
            {
                source: "/produkt/:product",
                destination: "/handla",
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
