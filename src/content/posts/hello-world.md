---
title: 你好，世界
date: 2026-09-30
summary: 这是本站的第一篇文章，同时演示了 Markdown 文章的写法和 frontmatter 格式。
category: 随笔
tags: [开始]
---

欢迎来到我的小站。

## 怎么写文章

在 `src/content/posts/` 目录下新建一个 `.md` 文件，开头写好 frontmatter（两行 `---` 之间的部分）：

```markdown
---
title: 文章标题（必填）
date: 2026-09-30 # 发布日期（必填）
summary: 一句话摘要 # 可选，显示在文章列表
category: 随笔 # 可选，分类，会出现在侧边栏
tags: [标签1, 标签2] # 可选，标签
cover: /images/cover.webp # 可选，封面图（图片放 public/images/ 下）
draft: false # true 时文章不会发布
---

正文用 Markdown 书写，支持代码高亮、公式、表格。
```

## 怎么发布

```bash
git add .
git commit -m "post: 新文章"
git push
```

推送后 GitHub Actions 会自动构建并部署，大约 1~2 分钟后文章就会出现在线上。
