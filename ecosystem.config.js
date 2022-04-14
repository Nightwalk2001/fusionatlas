module.exports = {
    apps: [
        {
            name: "fusionatlas",
            script: "yarn",
            args: "next start",
            instances: 4,
            autorestart: true,
            watch: false,
            max_memory_restart: "128M",
            env: {
                NODE_ENV: "production",
            },
        },
    ],
}