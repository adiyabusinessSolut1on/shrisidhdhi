import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      gridTemplateColumns: {
        customeCategory: "40px  2fr 1fr 0.6fr",
        customeReview: "40px  1fr 2.4fr 1fr 1.4fr 1.4fr 1.2fr 0.8fr",
        customeBanner: "40px  1fr 1fr 0.6fr 1fr 0.8fr",
        customeProduct: "40px  1fr 1fr 1fr 1.8fr 1.4fr  0.8fr",
      },
    },
  },
  plugins: [],
};
export default config;
