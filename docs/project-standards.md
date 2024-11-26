# Project Standards

Last updated: 11/2024

## Table of Contents

- [Introduction](#introduction)
    - [React + Vite + TypeScript](#react--vite--typescript)
- [ESLint](#eslint)
- [Husky](#husky)
- [Prettier](#prettier)
- [File Naming Conventions](#file-naming-conventions)
- [Absolute Imports](#absolute-imports)

## Introduction

This document outlines the project standards for tools used within a modern React project. As a note, many of these ideas and examples are taken from [Bullet Proof React](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-standards.md). Thus, if you are looking for more information, or this guide has gone out of date, please refer to the original source. However, this document does contain small modifications to create a slightly more flexible setup that fits Vervint's needs. 

### React + Vite + TypeScript

We chose React, Vite, and TypeScript for this guide because they are a powerful combination that offers a modern development experience. React is a popular library for building user interfaces, Vite is a fast build tool that leverages modern browser features, and TypeScript is a statically typed superset of JavaScript that helps catch errors early in the development process. For now, we have found that it is one of the best combinations for building Single Page Applications. However, if you need things like server-side rendering, you may want to consider Next.js.

If you aren't familiar with Vite check out the [Vite documentation](https://vitejs.dev/) as well as [Vite in 100 Seconds](https://www.youtube.com/watch?v=KCrXgy8qtjM).


## ESLint

ESLint serves as a valuable linting tool for JavaScript, helping developers in maintaining code quality and adhering to coding standards. By configuring rules in the `eslint.config.js` file, ESLint helps identify and prevent common errors, ensuring code correctness and promoting consistency throughout the codebase. This approach not only helps in catching mistakes early but also enforces uniformity in coding practices, thereby enhancing the overall quality and readability of the code.

## Husky

[Husky](https://typicode.github.io/husky/) serves as a way to share [git hooks](https://git-scm.com/docs/githooks) between developers. Git hooks serve as a way to run scripts before major git actions 
like pushes, commits, etc. However, they are stored in the git folder which is not tracked by version control. Therefore, we use husky to ensure that before each commit, the code maintains formatting style. If you need to bypass husky, you can use the `--no-verify` flag with any git command. Finally, if you need information on how to use husky when the `package.json` file is not in the root directory, see [quick-start.md](quick-start.md#husky).

## Prettier

[Prettier](https://prettier.io/) is a useful tool for maintaining consistent code formatting in your project. By enabling the "format on save" feature in your IDE, code is automatically formatted according to the rules set in the `.prettierrc` configuration file. This practice ensures a uniform code style across your codebase and provides helpful feedback on code issues. If the auto-formatting fails, it signals potential syntax error. Furthermore, Prettier can be integrated with ESLint to handle code formatting tasks alongside enforcing coding standards effectively throughout the development process. [quick-start.md](quick-start.md#prettier) provides more information on how to use Prettier.


## File Naming Conventions

- **Components**: PascalCase
- **Hooks**: useCamelCase
- **Files**: kebab-case
- **Folders**: kebab-case
- **Tests**: kebab-case.test.tsx
- **Storybook**: kebab-case.stories.tsx

We can enforce the file naming conventions using ESLint and Prettier. For more information, see [quick-start.md](quick-start.md#eslint).


## Absolute Imports

Absolute imports are a way to import modules using the absolute path from the project's root directory. This practice helps in avoiding lengthy relative paths and simplifies the import statements. By configuring the `tsconfig.app.json` file, you can set up absolute imports in your project. This approach not only enhances the readability of the code but also makes it easier to move files around without breaking the import paths. For more information, see [quick-start.md](quick-start.md#absolute-imports).