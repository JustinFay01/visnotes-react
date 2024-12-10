# React Router

## Installation

```bash
pnpm add react-router-dom
```

## Configuration

React Router is a powerful tool that allows you to create a single page application with ease. It is recommended to use this tool for all routing needs. 

For our application, we will create a `router.tsx` file in the `src/app` directory. This file will house all of our routes and will be imported into the `App.tsx` file.

### src/app/router.tsx

```tsx
const createRouter = () =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: async () => {
        const { LandingRoute } = await import("./routes/landing-route");
        return { Component: LandingRoute };
      },
    },
  ]);

export const AppRouter = () => {
  const router = createRouter();

  return <RouterProvider router={router} />;
};
```

Here, we create a router that will house all of our routes. We then import the `LandingRoute` component and return it as the component for the home route.

This is a simple example of how to define a route. However, you can create more complex routes that have children as well. For example, if you wanted a subset of routes to be wrapped by an authentication component, you could do something like this:

```tsx
{
      path: paths.app.root.path,
      element: (
        <Authenticated>
          <AppRoot />
        </Authenticated>
      ),
      children: [...],
},
```

In this example, the `Authenticated` component would be a wrapper that would check if the user is authenticated. If they are, it would render the `AppRoot` component. If not, it would redirect the user to the login page.

If you would like to configure a `404` route, you can do so by adding a route with a `*` path. This will match any route that is not defined in the router.

```tsx
    {
      path: '*',
      lazy: async () => {
        const { NotFoundRoute } = await import('./routes/errors/not-found')
        return { Component: NotFoundRoute }
      },
    },
```

Lastly, if you would like to have parameters in your route, you can do so by adding a `:` before the parameter name. For example, if you wanted to have a route that would take a `:id` parameter. This leads us to our second file, `src/lib/paths.ts`.

### src/lib/paths.ts

This file will act as a source of truth for all of our paths. This will allow us to easily change paths in one place and have them update throughout the application.

```ts
export const home = {
  path: "",
  getHref: () => "/",
};

...

export const paths = {
  home,
  error,
  app,
} as const;
```

Here, we define the `home` path as an empty string. We then define a `getHref` function that will return the path for the home route. Now, the `paths` object will house all of our paths and will be imported into the `router.tsx` file.

Now, lets say our application has unique entities and that these entities have an id. We can create a route that will take an id as a parameter like so:

```tsx
  entity: {
    path: 'entity/:id',
    getHref: (id: string | number) =>
      `entity/${id}`,
  },
```

Lastly, if we want to include optional parameters, we can do so by adding a `?` after the parameter name. For example, if we wanted to have a route that would take an optional `:id` parameter, we could do so like this:

```tsx
  entity: {
    path: 'entity/:id?',
    getHref: (id?: string | number) =>
      id ? `entity/${id}` : 'entity',
    },
```

Of course, remember to export the entity path in the `paths` object.

### src/app.tsx

Now that our router is constructed, we can import it into the `App.tsx` file.

```tsx
export const App = () => {
  return (
    <AppProvider>
        <AppRouter />
    </AppProvider>
  );
};
```

With this, we have successfully created a router that will house all of our routes. We have also created a source of truth for all of our paths. This will allow us to easily change paths in one place and have them update throughout the application.

With a quick update to `main.tsx` the application will now be able to render the router.

### src/main.tsx

```tsx
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

