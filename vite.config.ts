import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [react(), svgr()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData:`
					@import "./src/styles/_breakpoints.scss"; 
                    @import "./src/styles/_utilities.scss"; 
                    @import "./src/styles/_reset.scss"; 
                    @import "./src/styles/_variables.scss";
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
