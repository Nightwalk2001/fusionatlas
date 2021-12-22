const path = require("path")

const resolvePath = url => path.join(__dirname, url)

// @ts-check

/**
 * @type {import("next").NextConfig}
 **/
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    webpack5: true,
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
                        name: "static/media/[name].[hash].[ext]",
                    },
                },
            ],
        })

        return config
    }
}

module.exports = nextConfig
