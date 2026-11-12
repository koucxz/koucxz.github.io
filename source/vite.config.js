import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

function resumeRoutePlugin() {
  return {
    name: "resume-route",
    closeBundle: async () => {
      const dist = path.resolve("dist");
      const resumeDir = path.join(dist, "resume");
      await mkdir(resumeDir, { recursive: true });
      const html = await readFile(path.join(dist, "index.html"), "utf8");
      const resumeHtml = html
        .replace('rel="canonical" href="https://koucxz.github.io/"', 'rel="canonical" href="https://koucxz.github.io/resume/"')
        .replace('property="og:url" content="https://koucxz.github.io/"', 'property="og:url" content="https://koucxz.github.io/resume/"');
      await writeFile(path.join(resumeDir, "index.html"), resumeHtml);
    },
  };
}

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 700,
  },
  plugins: [react(), resumeRoutePlugin()],
});
