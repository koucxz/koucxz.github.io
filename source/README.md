# 寇晨迪 · 前端 / AI 应用工程师线上简历

中英双语的线上简历与项目作品集，采用专业的中浅蓝视觉。首页包含个人技术栈、个人项目、技术能力和工作经历；个人项目均配置真实演示动图。

## 本地运行

```bash
npm install
npm run dev
```

## 页面与语言

| 地址 | 内容 | 语言 |
| --- | --- | --- |
| `/` | 作品集主页 | 中文 |
| `/en` | Portfolio（同一套版式） | 英文 |
| `/resume` | 两页在线简历，可下载矢量 PDF 与 DOCX | 英文 |
| `/en/resume` | 同上，从英文站进入 | 英文 |
| `/zh/resume` | 两页在线简历，可下载矢量 PDF 与 DOCX | 中文 |

语言在 `src/locale.js` 里按路径统一判定：`/en` 前缀为英文，其余为中文；`/resume` 固定英文，中文简历走 `/zh/resume`。文案分两层：

- `src/data.js` / `src/data-en.js`：作品集与项目内容，`src/content.js` 按语言导出
- `src/resume-data.json` / `src/resume-data-en.json`：两页简历内容
- `src/locale.js` 的 `copy`：界面文案（导航、按钮、分区标题、PDF 元信息等）

英文内容以 `outputs/Chendi_Kou_Frontend_Engineer_Resume.docx` 为准，附件放在 `public/resume-en.docx`（前端方向）与 `public/resume-en-fullstack.docx`（全栈方向），中文附件为 `public/resume.docx`。

## 部署

项目为 Vite 静态站点，部署在 GitHub Pages 用户站点（`koucxz/koucxz.github.io` 的 `main` 分支根目录即构建产物）：

```bash
npm run build
```

`vite.config.js` 会自动生成目录路由 `dist/en/`、`dist/resume/`、`dist/en/resume/`、`dist/zh/resume/`，并把各自的 canonical、`og:url`、`title` 改成对应地址，无需手工复制路由入口。发布时把 `dist/` 内容同步到仓库根目录即可。
