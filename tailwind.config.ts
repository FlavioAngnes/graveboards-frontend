import type {Config} from "tailwindcss";

export default {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            keyframes: {
                wiggle: {
                    '0%, 50%': {transform: 'rotate(0deg)'},
                    '10%': {transform: 'rotate(3deg)'},
                    '20%': {transform: 'rotate(-3deg)'},
                    '30%': {transform: 'rotate(3deg)'},
                    '40%': {transform: 'rotate(-3deg)'},
                }
            },
            animation: {
                wiggle: 'wiggle 1s ease-in-out infinite',
            },
            colors: {
                request: {
                    "accepted": "#A347EB",
                    "rejected": "#E82025",
                    "pending": "#777777",
                },
                beatmapset: {
                    "verified": "#E82025",
                    "unverified": "#FFDAD6",
                },
                primary: {
                    10: "#FFFBFF",
                    20: "#FFF8F7",
                    50: "#FFEDEA",
                    100: "#FFDAD6",
                    200: "#FFB4AB",
                    300: "#FF897E",
                    400: "#FF544B",
                    500: "#E82025",
                    600: "#C00013",
                    650: "#A90010",
                    700: "#93000C",
                    750: "#7D0009",
                    800: "#690006",
                    850: "#540004",
                    900: "#410002",
                    950: "#2D0001",
                },
                tertiary: {
                    10: "#FCFCFC",
                    20: "#F9F9F9",
                    50: "#F1F1F1",
                    100: "#E2E2E2",
                    200: "#C6C6C6",
                    300: "#ABABAB",
                    400: "#919191",
                    500: "#777777",
                    600: "#5E5E5E",
                    650: "#525252",
                    700: "#474747",
                    750: "#3B3B3B",
                    800: "#303030",
                    850: "#262626",
                    900: "#1B1B1B",
                    950: "#111111",
                },
                stars: {
                    0: "#AAAAAA",
                    1: "#4290FB",
                    1.25: "#4FC0FF",
                    2: "#4FFFD5",
                    2.5: "#7CFF4F",
                    3.3: "#F6F05C",
                    4.2: "#FF8068",
                    4.9: "#FF4E6F",
                    5.8: "#C645B8",
                    6.7: "#6563DE",
                    7.7: "#18158E",
                    9.0: "#000000",
                }
            },
        },
    },
    plugins: [],
} satisfies Config;
