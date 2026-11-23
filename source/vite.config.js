import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));

/**
 * 站点路由（静态托管，靠目录 index.html + 客户端路径判断）：
 *   /            中文作品集
 *   /en          英文作品集
 *   /resume      英文在线简历（对外分享的固定地址）
 *   /en/resume   英文在线简历（从英文站进入）
 *   /zh/resume   中文在线简历（从中文站进入）
 */
const ROUTES = [
  {
    dir: "en",
    template: "en.html",
    canonical: "https://koucxz.github.io/en/",
    title: "Chendi Kou · Frontend Engineer / AI Application Engineer Resume",
  },
  {
    dir: "resume",
    template: "en.html",
    canonical: "https://koucxz.github.io/resume/",
    title: "Chendi Kou · Frontend Engineer Resume",
  },
  {
    dir: "en/resume",
    template: "en.html",
    canonical: "https://koucxz.github.io/en/resume/",
    title: "Chendi Kou · Frontend Engineer Resume",
  },
  {
    dir: "zh/resume",
    template: "index.html",
    canonical: "https://koucxz.github.io/zh/resume/",
    title: "寇晨迪 · 全栈开发工程师简历",
  },
];

function routePagesPlugin() {
  return {
    name: "resume-routes",
    closeBundle: async () => {
      const dist = path.join(root, "dist");
      for (const route of ROUTES) {
        const html = await readFile(path.join(dist, route.template), "utf8");
        const page = html
          .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${route.canonical}" />`)
          .replace(/"og:url" content="[^"]*"/, `"og:url" content="${route.canonical}"`)
          .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`);
        const target = path.join(dist, route.dir);
        await mkdir(target, { recursive: true });
        await writeFile(path.join(target, "index.html"), page);
      }
      // 只保留目录路由，避免 /en.html 与 /en/ 同时存在
      await rm(path.join(dist, "en.html"), { force: true });
    },
  };
}

export default defineConfig({
  build: {
    chunkSizeWarningLimit: 700,
    rollupOptions: {
      input: {
        main: path.join(root, "index.html"),
        en: path.join(root, "en.html"),
      },
    },
  },
  plugins: [react(), routePagesPlugin()],
});
