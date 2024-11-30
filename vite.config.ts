import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [react(), svgr()],
    css: {
        preprocessorOptions: {
            scss: {
                silenceDeprecations: ["legacy-js-api"],
                additionalData: `
                    @use "./src/styles/_breakpoints.scss" as *;
                    @use "./src/styles/_utilities.scss" as *;
                    @use "./src/styles/_reset.scss" as *;
                    @use "./src/styles/_variables.scss" as *;
                `,
            },
        },
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
