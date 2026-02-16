import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

const opts: Parameters<typeof defineConfig>[0] = {
	plugins: [preact()],
	css: {
		transformer: "lightningcss",
		lightningcss: {
			cssModules: true,
		},
	},
	base: "/webruler",
};

// https://vite.dev/config/
export default defineConfig(opts);
