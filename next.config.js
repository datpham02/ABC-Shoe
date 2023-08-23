/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack(config, { isServer }) {
        if (isServer) {
            generateRobotsTxt()
        }
        return config
    },
}

module.exports = nextConfig
