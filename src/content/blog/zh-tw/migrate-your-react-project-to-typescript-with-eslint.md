---
title: "將 React Vite 專案遷移以支援 TypeScript 與 ESLint"
description: "將您的 React Vite 專案遷移至支援 TypeScript 與 ESLint，以提升程式碼品質和可維護性。"
pubDate: "Aug 29 2024"
tags: ["React", "Vite", "TypeScript", "ESLint"]
---

### 安裝 TypeScript

```bash
~$ yarn add -D typescript @types/react @types/react-dom
```
### 將 vite.config.js 修改為 vite.config.ts

```bash
~$ mv vite.config.js vite.config.ts
```

### 遵循 Vite TypeScript 指南進行設定
https://vitejs.dev/guide/features.html#typescript

>Some configuration fields under compilerOptions in tsconfig.json require special attention.
- isolatedModules
- useDefineForClassFields
- target

<h5 a><strong>vite-env.d.ts</strong></h5>

```typescript
/// <reference types="vite/client" />
```

### 設定 tsconfig 配置

如果需要進一步資訊，請參閱
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

### 安裝 TypeScript ESLint 套件
https://typescript-eslint.io/packages/eslint-plugin
https://typescript-eslint.io/packages/parser

```bash
~$ yarn add -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### 設定 ESLint 配置

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

### 將型別檢查腳本新增至 package.json

Follow the Vite official documentation:
https://vitejs.dev/guide/features#typescript

> Vite does not perform transpilation and does <strong>NOT</strong> perform type checking. It assumes type checking is taken care of by your IDE and build process.

所以，讓我們在 package.json 檔案中新增一個 type-check 腳本。

```json
"scripts": {
  "type-check": "tsc --noEmit --project tsconfig.app.json"
}
```

Note: Use [vite-plugin-checker](https://github.com/fi3ework/vite-plugin-checker) if you prefer having type errors directly reported in the browser.

### Summary
這是一個很好的實踐，將您的 React Vite 專案遷移以支援 TypeScript 與 ESLint，以提升程式碼品質和可維護性。通過上述步驟，您可以確保您的專案結構良好且易於長期維護。

最後，享受使用 TypeScript 和 ESLint 進行編碼！

