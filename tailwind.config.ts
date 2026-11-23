import type { Config } from "tailwindcss";
export default { content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"], theme: { extend: { colors: { forest: "#1A4A2E", deep: "#0F2E1C", cream: "#F7F3EA", gold: "#C9A85C" }, fontFamily: { serif: ["var(--font-serif)"], sans: ["var(--font-sans)"] } } }, plugins: [] } satisfies Config;
