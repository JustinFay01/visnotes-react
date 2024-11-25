# Project Standards

Last updated: 11/2024

## Table of Contents

- [Introduction](#introduction)
- [ESLint](#eslint)

## Introduction

### Vite + TypeScript + VsCode

## ESLint

ESLint serves as a valuable linting tool for JavaScript, helping developers in maintaining code quality and adhering to coding standards. By configuring rules in the `eslint.config.js` file, ESLint helps identify and prevent common errors, ensuring code correctness and promoting consistency throughout the codebase. This approach not only helps in catching mistakes early but also enforces uniformity in coding practices, thereby enhancing the overall quality and readability of the code.


## Husky

[Husky](https://typicode.github.io/husky/) serves as a way to share [git hooks](https://git-scm.com/docs/githooks) between developers. Git hooks serve as a way to run scripts before major git actions like pushes, commits, etc. However, they are stored in the git folder which is not tracked by version control. Therefore, we use husky to ensure that before each commit, the code maintains formatting style. If you need to bypass husky, you can use the `--no-verify` flag with any git command. Finally, if you need information on how to use husky when the `package.json` file is not in the root directory, see [quick-start.md](quick-start.md).

## Prettier

[Prettier](https://prettier.io/) is an opinionated code formatter that helps maintain consistent code style across your project. It is often used in conjunction with ESLint to ensure code quality and consistency. Once again, using `vite@latest` should have automatically added Prettier to your project. If not, you can follow the [Prettier setup guide](https://prettier.io/docs/en/install.html) to add it manually.

## Storybook