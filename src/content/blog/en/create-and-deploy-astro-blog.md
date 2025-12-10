---
title: "Astro + GitHub Pages + Git Action = Quickly Set Up and Automate Your Personal Website Deployment"
description: "Build and deploy your own personal website fast using Astro, GitHub Pages, and Git Action."
pubDate: "Oct 4 2023"
tags: ["Astor", "Github Pages", "Git Action"]
---

### What is Astro

Astro is a frontend framework that emphasizes a content-first approach and introduces the concept of Component Islands. It seamlessly integrates with various frameworks like React, Vue, Svelte, and more, allowing developers to choose the framework they are most comfortable with for development.

This is why, as someone who enjoys experimenting with different frameworks and wants to create a blog, I chose Astro to build my personal website.

![](../../../assets/images/astro-cover.png)

### Create Astro Project

<https://docs.astro.build/en/install>

```bash
~$ yarn create astro
```
![](../../../assets/images/create-astro-project.png)

### Push Astro Project to Github

![](../../../assets/images/astro-github-repo.png)

### Configure Github Pages

Access the Repository's Settings, locate GitHub Pages, and configure the Source to be GitHub Action. Click on "Create your own" to set up a new workflow.

![](../../../assets/images/astro-github-pages-workflow-1.png)

### Configure Github Action Workflow

Here, I have already configured the workflow, so you can simply copy and paste it.
[workflows/deploy-astro-gh-pages.yml](https://github.com/genexu/genexu.github.io/blob/main/.github/workflows/deploy-astro-gh-pages.yml)

![](../../../assets/images/astro-github-pages-workflow-2.png)

![](../../../assets/images/astro-github-pages-workflow-3.png)

### Deploy Astro Project to Github Pages

Boom! That's it. From now on, every time you push to the main branch, GitHub Action will automatically build and deploy to GitHub Pages.

Click on "Actions" to see the workflow you just set up. The current configuration is set to trigger deployment whenever there's a new commit pushed to the main branch. You can also manually trigger it by clicking "Run workflow."

![](../../../assets/images/astro-github-pages-workflow-deploy-action.png)

From setup to deployment, it's just that simple. To keep this post from getting too complicated, I'll explain the GitHub workflow configuration in a future article. If you're interested, you can follow up later.