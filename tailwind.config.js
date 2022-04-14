const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
const svgToDataUri = require("mini-svg-data-uri")
const {default: flattenColorPalette} = require("tailwindcss/lib/util/flattenColorPalette")

module.exports = {
    experimental: {
        optimizeUniversalDefaults: true,
    },
    content: [
        "./src/**/*.tsx",
    ],
    darkMode: "class",
    theme: {
        screens: {
            sm: "640px",
            "demo-sm": "720px",
            md: "768px",
            lg: "1024px",
            xl: "1280px",
            "2xl": "1536px",
        },
        colors: {
            transparent: "transparent",
            current: "currentColor",

            black: "#000",
            white: "#fff",

            amber: colors.amber,
            blue: colors.blue,
            cyan: colors.cyan,
            emerald: colors.emerald,
            fuchsia: colors.fuchsia,
            gray: colors.slate,
            green: colors.green,
            indigo: colors.indigo,
            "light-blue": colors.sky,
            sky: colors.sky,
            lime: colors.lime,
            orange: {
                ...colors.orange,
                1000: "#4a2008",
            },
            pink: {
                ...colors.pink,
                1000: "#460d25",
            },
            purple: colors.purple,
            red: colors.red,
            rose: colors.rose,
            teal: colors.teal,
            violet: colors.violet,
            yellow: colors.yellow,

            code: {
                punctuation: "#A1E8FF",
                tag: "#D58FFF",
                "attr-name": "#4BD0FB",
                "attr-value": "#A2F679",
                string: "#A2F679",
                highlight: "rgb(125 211 252 / 0.1)",
            },
        },
        aspectRatio: {
            auto: "auto",
            square: "1 / 1",
            video: "16 / 9",
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
            6: "6",
            7: "7",
            8: "8",
            9: "9",
            10: "10",
            11: "11",
            12: "12",
            13: "13",
            14: "14",
            15: "15",
            16: "16",
        },
        extend: {
            spacing: {
                "1/10": "10%",
                "9/10": "90%",
                "1/12": "8.3%",
                "11/12": "91.7%",
                "1/20": "5%",
                "1.25": "0.3125rem",
                18: "4.5rem",
                88: "22rem",
                full: "100%",
            },
            animation: {
                "spin-slow": "spin 5s linear infinite",
            },
            fontFamily: {
                sans: ["Inter var", ...defaultTheme.fontFamily.sans],
                mono: ["Fira Code VF", ...defaultTheme.fontFamily.mono],
                source: ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
                "ubuntu-mono": ["Ubuntu Mono", ...defaultTheme.fontFamily.mono],
                system: defaultTheme.fontFamily.sans,
                flow: "Flow",
                roma: "Times New Roman"
            },
            width: {
                xl: "36rem",
            },
            maxWidth: {
                "4.5xl": "60rem",
                "8xl": "90rem",
            },
            maxHeight: (theme) => ({
                sm: "30rem",
                "(screen-18)": `calc(100vh - ${theme("spacing.18")})`,
            }),
            boxShadow: {
                px: "0 0 0 1px rgba(0, 0, 0, 0.5)",
                link: "inset 0 -0.125em 0 0 #fff, inset 0 -0.375em 0 0 rgba(165, 243, 252, 0.4)",
            },
            keyframes: {
                "flash-code": {
                    "0%": {backgroundColor: "rgb(125 211 252 / 0.1)"},
                    "100%": {backgroundColor: "transparent"},
                },
            },
            cursor: {
                grab: "grab",
                grabbing: "grabbing",
            },
            transitionDuration: {
                1500: "1.5s",
            },
            backgroundImage: (theme) => ({
                squiggle: `url("${svgToDataUri(
                    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 3" width="6" height="3" fill="${theme(
                        "colors.yellow.400"
                    )}"><polygon points="5.5,0 2.5,3 1.1,3 4.1,0"/><polygon points="4,0 6,2 6,0.6 5.4,0"/><polygon points="0,2 1,3 2.4,3 0,0.6"/></svg>`
                )}")`,
            }),
            scale: {
                80: "0.8",
            },
            skew: {
                "-20": "-20deg",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
        function ({addVariant}) {
            addVariant(
                "supports-backdrop-blur",
                "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
            )
            addVariant("supports-scrollbars", "@supports selector(::-webkit-scrollbar)")
            addVariant("children", "& > *")
            addVariant("scrollbar", "&::-webkit-scrollbar")
            addVariant("scrollbar-track", "&::-webkit-scrollbar-track")
            addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb")
            addVariant("demo-dark", ".demo-dark &")
        },
        function ({addUtilities, theme}) {
            const shadows = theme("boxShadow")
            addUtilities(
                Object.keys(shadows).reduce(
                    (utils, key) => ({
                        ...utils,
                        [`.text-shadow${key === "DEFAULT" ? "" : `-${key}`}`]: {
                            textShadow: shadows[key].replace(
                                /([0-9]+(px)? [0-9]+(px)? [0-9]+(px)?) [0-9]+(px)?/g,
                                "$1"
                            ),
                        },
                    }),
                    {}
                )
            )
        },
        function ({matchUtilities, theme}) {
            matchUtilities(
                {
                    "bg-grid": (value) => ({
                        backgroundImage: `url("${svgToDataUri(
                            `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="${value}"><path d="M0 .5H31.5V32"/></svg>`
                        )}")`,
                    }),
                },
                {values: flattenColorPalette(theme("backgroundColor")), type: "color"}
            )

            matchUtilities(
                {
                    highlight: (value) => ({boxShadow: `inset 0 1px 0 0 ${value}`}),
                },
                {values: flattenColorPalette(theme("backgroundColor")), type: "color"}
            )
        },
        function ({addUtilities, theme}) {
            let backgroundSize = "7.07px 7.07px"
            let backgroundImage = (color) =>
                `linear-gradient(135deg, ${color} 10%, transparent 10%, transparent 50%, ${color} 50%, ${color} 60%, transparent 60%, transparent 100%)`
            let colors = Object.entries(theme("backgroundColor")).filter(
                ([, value]) => typeof value === "object" && value[400] && value[500]
            )

            addUtilities(
                Object.fromEntries(
                    colors.map(([name, colors]) => {
                        let backgroundColor = colors[400] + "1a" // 10% opacity
                        let stripeColor = colors[500] + "80" // 50% opacity

                        return [
                            `.bg-stripes-${name}`,
                            {
                                backgroundColor,
                                backgroundImage: backgroundImage(stripeColor),
                                backgroundSize,
                            },
                        ]
                    })
                )
            )

            addUtilities({
                ".bg-stripes-white": {
                    backgroundImage: backgroundImage("rgba(255 255 255 / 0.75)"),
                    backgroundSize,
                },
            })

            addUtilities({
                ".ligatures-none": {
                    fontVariantLigatures: "none",
                },
            })
        },
    ],
}
