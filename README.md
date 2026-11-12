# 寇晨迪 · AI 应用工程师线上简历

这个仓库同时保存线上简历源码和 GitHub Pages 发布产物，线上地址为 https://koucxz.github.io/。

- `source/`：Vite、React 和简历内容源码
- 根目录：GitHub Pages 发布目录

## 本地开发

```bash
cd source
npm install
npm run dev
```

## 更新 Pages 发布目录

```bash
cd source
npm run build
cp -R dist/. ..
```

构建会自动生成 `/resume/` 两页简历入口。
