# Best Practices 

## Table of Contents

- [Introduction](#introduction)
- [Theories](#theories)
  - [Barrel Files](#barrel-files)
  - [When to Abstract](#when-to-abstract)
  - [Wrapper Components](#wrapper-components)
- [Tools](#tools)
    - [React Query](#react-query)
    - [MUI](#mui)
    - [Axios](#axios)
    - [React Router](#react-router)
    - [React Hook Form](#react-hook-form)
    

## Introduction

This section houses general information on the best practices for developing React web applications. It features a collection of more opinionated guidelines and recommendations for using things like `Barrel Files`, `MUI`, `React Query`, and more. In addition, it also provides guidance on how to use 'Wrapper Components' as well as when to abstract. 


## Theories 

### Barrel Files

In general, we typically want to avoid using barrel files. React Bullet proof has correctly pointed out potential concerns for increased bundle size. However, for internal features that are being treated as a library, they are encouraged. For example, if you need to make a project specific UI component like a modal or a toast, it is recommended to use barrel files. This will keep the codebase from being cluttered with long import statements. 

> In the past, it was recommended to use barrel files to export all the files from a feature. 
> However, it can cause issues for Vite to do tree shaking and can lead to performance issues. 
> Therefore, it is recommended to import the files directly.
> -- <cite>[Bullet Proof React Project Structure](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)</cite>

### When to Abstract

While it is important to abstract, it is also important to know when to abstract. In general, we follow the rule of ***three***. If you are using the same code in three different places, it is time to abstract.

### Wrapper Components

Sometimes it can be tempting to over-prepare for the future. Meaning, developers may feel the need to wrap every MUI component in a custom component in order to prepare for future changes. However, this can lead to unnecessary complexity and can make the codebase harder to maintain. While it does have its place, we recommend only using wrapper components to add things like default props to improve readability. An example of this would be a `Button` component that has a default border radius of `5px` that is used for that specific variant of the button (maybe a close button). Another example would be for accessibility purposes, such as a `Button` component that has a default `aria-label` prop or ensures that the button is focusable.

## Tools 

### React Query

> TanStack Query (FKA React Query) is often described as the missing data-fetching library for web applications, but in more technical terms, it makes fetching, caching, synchronizing and updating server state in your web applications a breeze. -- <cite>[TanStack Query](https://tanstack.com/query/v5/docs/framework/react/overview)</cite>

Overall, it is an incredibly powerful tool that can be used to manage the state of your application. It is recommended to use this tool for all data fetching.

I **_HIGHLY_** recommend checking out [these guides](https://tkdodo.eu/blog/practical-react-query) referenced by the React Query docs themselves if you are new to react query.

[Configuration & Example](./tools/react-query.md)

### MUI 

> MUI offers a comprehensive suite of free UI tools to help you ship new features faster. Start with Material UI, our fully-loaded component library, or bring your own design system to our production-ready components. -- <cite>[Material-UI](https://mui.com/)</cite>

Mui offers developers an easy way to create production ready components. It ties in difficult to manage concepts like theming and styling into a simple API. With this, you don't need to have a great understanding of React Context or CSS to create a beautiful (and consistent) application.

[Configuration & Example](./tools/mui.md)

### Axios

> Axios is a promise-based HTTP Client for node.js and the browser. It is isomorphic (= it can run in the browser and nodejs with the same codebase). On the server-side it uses the native node.js http module, while on the client (browser) it uses XMLHttpRequests. -- <cite>[Axios](https://axios-http.com/docs/intro)</cite>

[Configuration & Example](./tools/axios.md)

### React Router

> A user‑obsessed, standards‑focused, multi‑strategy router you can deploy anywhere. -- <cite>[React Router](https://reactrouter.com/)</cite>

[Configuration & Example](./tools/react-router.md)

### React Hook Form

### Zustand

> A small, fast and scalable bearbones state-management solution using simplified flux principles. Has a comfy API based on hooks, isn't boilerplatey or opinionated. -- <cite>[Zustand](https://github.com/pmndrs/zustand) </cite>

Zustand is an incredible tool that can abstract some of the complexities of state management. It can be used to create simple stores used across multiple components or to save preferences in local storage. (And a lot more!)

[Configuration & Example](./tools/zustand.md)

### Toastify

React-Toastify is a simple library that can be used to create toast notifications. It is highly customizable and can be used to create a variety of different notifications. [React-Toastify](https://fkhadra.github.io/react-toastify/introduction)

[Configuration & Example](./tools/toastify.md)


### Suspense

### Error Boundaries

> Reusable React error boundary component. Supports all React renderers (including React DOM and React Native). -- <cite>[React Error Boundary](https://www.npmjs.com/package/react-error-boundary)

[Configuration & Example](./tools/error-boundaries.md)
