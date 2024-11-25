# Quick Start

Last updated: 11/2024

## Table of Contents

- [Prerequisites](#prerequisites)
- [Create a new project](#create-a-new-project)
- [Install PNPM](#install-pnpm)
- [VS Code Folder](#vs-code-folder)
- [Absolute Imports](#absolute-imports)
- [ESLint](#eslint)
- [Prettier](#prettier)
- [Husky](#husky)
- [Storybook](#storybook)

## Introduction

This guide will help you set up a new React project using Vite and TypeScript in Visual Studio Code. We will cover the installation process, project creation, and configuration of essential tools such as PNPM, ESLint, Prettier, Husky, and Storybook. By the end of this guide, you will have a fully functional React project with a modern development environment. Feel free to skip any tools that you are already familiar with or prefer not to use. For additional details on each tool, refer to [project-standards.md](./project-standards.md#table-of-contents).

## Prerequisites

Before you begin, make sure you have the following installed: 

- [Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- [Visual Studio Code](https://code.visualstudio.com/download)

## Create a new project

To create a new React project using Vite and TypeScript, run the following command:

```bash
npm create vite@latest your-project-name --template
```

This command will create a new project in the `your-project-name` directory (make sure to accept any requsts to install new packages such as `create-vite@x.y.z`). You can replace `your-project-name` with the desired name for your project. 

Lets go through each option shown in the command:

When you begin, the first prompt will ask you to `Select a framework` with the following options:

```
    Vanilla
    Vue
>   React
    Preact
    Lit
    Svelte
    Solid
    Qwik
    Angular
    Others
```

Select `React` and press `Enter`.


The next, prompt will ask you to `Select a variant` with the following options:

```
    TypeScript
>   TypeScript + SWC
    JavaScript
    JavaScript + SWC
    Remix ↗
```

#### Select `TypeScript + SWC` and press `Enter`.

The [SWC](https://swc.rs/) is a super-fast JavaScript/TypeScript compiler written in Rust. It is used to compile your code faster than the default TypeScript compiler. You may also choose `TypeScript` if you prefer the default TypeScript compiler.

After this, the project will be created and you can navigate to the project directory.


## Install PNPM

*Why [PNPM](https://pnpm.io/)?* PNPM is a package manager that uses a unique symlink structure to save disk space and speed up installations. It is often faster than `npm` and `yarn` due to its optimized package management. Also, see [package-managers.md](./package-managers.md) for more information.

*Already using `npm` or `yarn`?* Follow [How to migrate from yarn / npm to pnpm](https://dev.to/andreychernykh/yarn-npm-to-pnpm-migration-guide-2n04) to migrate your project to PNPM.

To install PNPM, run the following command:

```bash
npm install -g pnpm
```

After installing PNPM, you can use it to install packages in your project. For example, to install a package, run:

```bash
pnpm add <package-name>
```

Make sure to add the following to your `package.json` file to prevent using `npm` or `yarn`:

```json
"scripts": {
  "preinstall": "npx only-allow pnpm", 
  ...
}
```

Finally, run `pnpm install` to install the project dependencies using PNPM. You should see a `pnpm-lock.yaml` file in your project directory.

## VS Code Folder

The `.vscode` folder contains configuration files for Visual Studio Code. You can use the `extensions.json` file to recommend extensions to anyone who opens the workspace. This can be very useful for team environments where you want to ensure that all members have the same set of tools and capabilities by recommending the extensions they should install.

For instance, if you want to recommend the `ESLint` extension, add the following to your `extensions.json` file:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint"
  ]
}
```

Or, if you want to require formatting on save using eslint, add the following to your `settings.json` file:

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
}
```

## Absolute Imports

Absolute imports allow you to import modules using the absolute path from the project root. 
This will prevent messy relative imports like `../../../components/MyComponent`. To enable absolute imports in your project, add the following to your `tsconfig.app.json` file: 

*Check out [Bullet Proof Reacts project standards](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-standards.md) for more information.*

```json
"compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
  }
```

You will also need to add the `viteTsconfigPaths` plugin to your [`vite.config.ts`](https://vitejs.dev/config/) file:

```typescript
export default defineConfig({
  plugins: [react(), viteTsconfigPaths()],
  ...
})
```

Now you can import modules using the absolute path from the project root:

```typescript
import MyComponent from '@/components/MyComponent';
```

## ESLint 

ESLint is a static code analysis tool that helps identify and fix problems in your code. **Eslint has recently updated from v8 to v9.** When using the earlier command to setup `your-project-name`, it should have automatically added ESLint to your project. If not, you can follow the [ESLint setup guide](https://eslint.org/docs/user-guide/getting-started) to add it manually. Make sure that your version is `9.0.0` or higher in order to use the `flat config` feature. [ESLint Project Standards](./project-standards.md#eslint) for more information.

*Need to update ESLint?* [Migrate to v9.x](https://eslint.org/docs/latest/use/migrate-to-9.0.0) to update your project to the latest version.

The base config file using `vite@latest` will produce:

```typescript
export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
)
```

They also include a section in the `README.md` to expand the ESLint configuration for production applications.

However, we recommend updating the configuration to include additional rules such as:

- `eslint:recommended`
- `storybook` related rules
- `prettier` related rules

In addition, using eslint you can enforce rules like `file-naming-convention`. To do so, add the following to your ESLint configuration:

*These settings where taken from React Bullet Proof's [ESLint configuration](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-standards.md). The eslint rules syntax has remained the same from v8 to v9.*

```typescript
rules: {
      'check-file/filename-naming-convention': [
        'error',
        {
          '**/*.{ts,tsx}': 'KEBAB_CASE',
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],
    },
```

## Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter that helps maintain consistent code style across your project. It is often used in conjunction with ESLint to ensure code quality and consistency. Once again, using `vite@latest` should have automatically added Prettier to your project. If not, you can follow the [Prettier setup guide](https://prettier.io/docs/en/install.html) to add it manually.

To configure Prettier, create a `.prettierrc` file in the root of your project with the following settings:

```json
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80
}
```

In addition, you may use a `.prettierignore` file to exclude files or directories from being formatted by Prettier. For example:

```
*.yaml
```

## Husky

[Husky](https://typicode.github.io/husky/) serves as a way to share [git hooks](https://git-scm.com/docs/githooks) between developers.

As a special note, if your `package.json` is not in the root directory, installation will be slightly different. View the `Project Not in Git Root Directory` on the [How To page](https://typicode.github.io/husky/how-to.html) section within the husky documentation.

If that is the case case, the prepare script should look like so:

```
"prepare": "cd ../.. && husky ./src/your-project-name/.husky"
```

**ALSO** Your scripts must then be preceded with the correct directory. Like so:

```
cd ./src/your-project-name

<rest_of_your_script>
```

When first running, the `.husky` folder should appear within the `src/your-project-name` folder structure. **Make sure this is correct or the scripts will not work correctly**. If the scripts are not running check your `.git/config` file (local). It should contain the following setting:

```
hooksPath = ./src/your-project-name/.husky/_
```


## Storybook

[Storybook](https://storybook.js.org/) is a tool for developing UI components in isolation. It allows you to build and test components independently of your application, making it easier to develop and maintain complex UIs. To add Storybook to your project, checkout this guide [Storybook for React & Vite](https://storybook.js.org/docs/get-started/frameworks/react-vite?renderer=react).


### Gotchas with Storybook

Upon first setup of Storybook, you may encounter that it works as expected. However, as your app grows more complex you may find that Storybook does not update as expected. This is *sometimes* due to the providers that are found within your app. Therefore, it is recommended to create a `storybook-provider` file that will wrap your components in a provider that is specific to Storybook. This will allow you to maintain the same functionality as your app while also allowing Storybook to update as expected, hopefully reducing the headache of debugging strange state issues.

***Warning** Static imports may not work in the .storybook folder.*

To do this, make these two changes: 

1. Create a `storybook-provider.tsx` file in your `.storybook` folder.
 ```typescript

 // It could look something like this if you are using Mui Theme Provider 
 // and the CssBaseline component from Mui
    export const StorybookAppProvider = ({ children }: React.PropsWithChildren) => {
        return (
            <ThemeProvider theme={defaultTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        )
    }
```
2. Update your `.storybook/preview.tsx` file to include the provider.

```typescript
export const decorators = [
  (Story) => (
    <StorybookAppProvider>
      <Story />
    </StorybookAppProvider>
  ),
]

const preview: Preview = {
  decorators: decorators,
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
```

#### Storybook References

- [Writing Stories](https://storybook.js.org/docs/writing-stories#default-export)
- [Params](https://storybook.js.org/docs/configure/story-layout)
- [Autodocs](https://storybook.js.org/docs/writing-docs/autodocs)

