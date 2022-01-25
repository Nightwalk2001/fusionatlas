const path = require("path")

const resolvePath = url => path.join(__dirname, url)

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
        disableStaticImages: true,
    },
    webpack: (config, options) => {
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
                {loader: "@svgr/webpack", options: {svgoConfig: {plugins: {removeViewBox: false}}}},
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

module.exports = nextConfig
