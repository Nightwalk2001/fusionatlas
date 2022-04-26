/**
 * @type {import("next").NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ["en-US", "zh-CN"],
        defaultLocale: "en-US",
        localeDetection: false
    },
    images: {
        disableStaticImages: true
    },
    experimental: {
        optimizeCss: true,
        workerThreads: true
    },
    webpack: (config) => {
        config.module.rules.push({
            test: /\.(png|jpe?g|gif|webp|avif|mp4)$/i,
            issuer: /\.(jsx?|tsx?|mdx)$/,
            use: [
                {
                    loader: "file-loader",
                    options: {
                        publicPath: "/_next",
                        name: "static/media/[name].[hash].[ext]",
                    },
                },
            ],
        })

        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {loader: "@svgr/webpack"},
                {
                    loader: "file-loader",
                    options: {
                        publicPath: "/_next",
                        name: "static/media/[name].[hash].[ext]"
                    },
                },
            ],
        })

        return config
    }
}

export default nextConfig
