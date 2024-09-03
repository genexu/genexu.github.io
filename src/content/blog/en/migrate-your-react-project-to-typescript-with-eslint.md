---
layout: "../../../layouts/PostLayout.astro"
title: "Migrate React Vite Project to Support TypeScript with ESLint"
description: "Migrate your React Vite project to support TypeScript with ESLint for better code quality and maintainability."
pubDate: "Aug 29 2024"
tags: ["React", "Vite", "TypeScript", "ESLint"]
---

### Install TypeScript

```bash
~$ yarn add -D typescript @types/react @types/react-dom
```
### Move vite.config.js to vite.config.ts

```bash
~$ mv vite.config.js vite.config.ts
```

### Follow Vite TypeScript guide
https://vitejs.dev/guide/features.html#typescript

>Some configuration fields under compilerOptions in tsconfig.json require special attention.
- isolatedModules
- useDefineForClassFields
- target

<h5 a><strong>vite-env.d.ts</strong></h5>

```typescript
/// <reference types="vite/client" />
```

### Setup tsconfig configuration

For more information, visit
https://www.typescriptlang.org/tsconfig

<h5 a><strong>tsconfig.json</strong></h5>

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ]
}
```

<h5 a><strong>tsconfig.app.json</strong></h5>

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "useDefineForClassFields": true,
    "lib": ["DOM", "DOM.Iterable", "ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      ...alias paths
    },

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": false,
    "resolveJsonModule": true
  },
  "include": ["src"],
  "exclude": ["node_modules"]
}
```

<h5 a><strong>tsconfig.node.json</strong></h5>

```json
{
  "compilerOptions": {
    "target": "ESNext",
    "lib": ["ESNext"],
    "module": "ESNext",
    "skipLibCheck": true,

    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,

    "allowJs": true,
    "forceConsistentCasingInFileNames": true,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": false,
    "resolveJsonModule": true,
  },
  "include": ["vite.config.ts"]
}
```

### Install TypeScript ESLint packages
https://typescript-eslint.io/packages/eslint-plugin
https://typescript-eslint.io/packages/parser

```bash
~$ yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Setup ESLint configuration

<h5 a><strong>.eslintrc</strong></h5>

```json
// Setup extends and parser
"extends": ["plugin:react/recommended", "plugin:@typescript-eslint/recommended"],
"parser": "@typescript-eslint/parser",
...
// Update settings extension, take eslint-import-resolver-vite as an example
// https://www.npmjs.com/package/eslint-import-resolver-vite
"settings": {
    "import/resolver": {
      "alias": {

        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
},
// Update rules to support TypeScript file extensions
...
"rules": {
  "import/extensions": [
    "error",
    "ignorePackages",
    {
      "js": "never",
      "jsx": "never",
      "ts": "never",
      "tsx": "never",
    },
  ],
}

```

### Add Type Checking Script to package.json

Follow the Vite official documentation:
https://vitejs.dev/guide/features#typescript

> Vite does not perform transpilation and does <strong>NOT</strong> perform type checking. It assumes type checking is taken care of by your IDE and build process.

So, let's add a type-check script to the package.json file.

```json
"scripts": {
  "type-check": "tsc --noEmit --project tsconfig.app.json"
}
```

Note: Use [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker) if you prefer having type errors directly reported in the browser.

### Summary
It's a good practice to migrate your React Vite project to support TypeScript with ESLint for better code quality and maintainability. By following the steps above, you can ensure your project is well-structured and easy to maintain in the long run.

And finally, enjoy coding with TypeScript and ESLint!

