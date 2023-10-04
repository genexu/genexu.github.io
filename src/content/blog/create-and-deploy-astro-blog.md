---
title: "Astro + Github Pages + Git Action = 快速自動部署個人網站"
description: "使用 Astro、Github Pages 以及 Git Action 快速建立並自動部署你的個人網站"
publicationDate: "Oct 4 2023"
tags: ["Astor", "Github Pages", "Git Action"]
---

### What is Astro

Astro 是一個前端框架，它的特色是使用 Astro Markdown 來撰寫 HTML，並且支援 React、Vue、Svelte 等前端框架，並且支援 SSR、SSG 等功能。

![](../../assets/images/astro-cover.png)

### 建立 Astro 專案

<https://docs.astro.build/en/install>

```bash
~$ yarn create astro
```
![](../../assets/images/create-astro-project.png)

### Push Astro 專案到 Github

![](../../assets/images/astro-github-repo.png)

### 設定 Github Pages

進入 Repository 的 Settings，找到 GitHub Pages，並設定 Source 為 GitHub Action，點選 Create your own 來建立一個新的 workflow。

![](../../assets/images/astro-github-pages-workflow-1.png)

### 設定 Github Action

此處有我已經設定好的 workflow，直接複製貼上即可。
[workflows/deploy-astro-gh-pages.yml](https://github.com/genexu/genexu.github.io/blob/main/.github/workflows/deploy-astro-gh-pages.yml)

![](../../assets/images/astro-github-pages-workflow-2.png)

![](../../assets/images/astro-github-pages-workflow-3.png)

### Github Action 部署

Boom! That's it. 之後每次 Git push 到 main branch 時，Github Action 就會自動 build & deploy 到 Github Pages。

點選 Actions，可以看到剛剛設定的 workflow，目前的設定是當有新的 commit push 到 main branch 時，就會觸發部署，點選 Run workflow 即可手動觸發。

![](../../assets/images/astro-github-pages-workflow-deploy-action.png)

從建立到部署就是如此簡單，為了不讓文章顯得複雜，會在之後的文章中說明此篇中 Github workflow 的設定，有興趣的朋友可以再 follow up。