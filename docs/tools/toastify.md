# Toastify 

## Installation

```bash
pnpm add react-toastify
```

## Configuration

React-Toastify is a global toast notification library that can be used to create toast notifications. It is highly customizable and can be used to create a variety of different notifications. It operates by creating a `ToastContainer` that will house all of the notifications. This container should be placed at the root of your application. 


### Basic Usage

```tsx
export const AppProvider = ({ children }: React.PropsWithChildren) => {
    return (
        ...
        <ToastContainer 
          position="bottom-left"
          autoClose={5000}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover={false}
          theme={"dark"}/> 
            {children}
        ...
    )
}
```

This will allow you to use the `toast` function to create notifications. 

```tsx
import { toast } from 'react-toastify';

toast("Hello World!");
```

### Customization

[React-Toastify](https://fkhadra.github.io/react-toastify/introduction/) allows for a high level of customization. You can create custom notifications, change the position of the notifications, and more.  

```tsx
toast('🦄 Wow so easy!', {
position: "top-right",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "light",
transition: Bounce,
});
```

You can also include a type of notification, such as `success`, `error`, `warning`, or `info`. 

```tsx
toast("Hello World!", { type: "success" });
```

This will change the color of the notification based on the type.

### Wrapper

It is likely that your application will want to use many success and error notifications. One recommendation is to create a wrapper function that will handle default settings for each use case. Not only will this reduce the amount of code you need to write, but it will also provides a layer of abstraction that can be used to change the default settings in the future. 

```tsx
import { toast, ToastOptions } from "react-toastify";

export const useToast = () => {
  const success = (
    message: string,
    options?: ToastOptions<unknown> | undefined
  ) =>
    toast(message, {
      type: "success",
      ...options,
    });

  const error = (
    message: string,
    options?: ToastOptions<unknown> | undefined
  ) => {
    toast(message, {
      type: "error",
      ...options,
    });
  };

  const promise = (
    promise: Promise<unknown>,
    pendingMessage: string,
    successMessage: string,
    errorMessage: string,
    options?: ToastOptions<unknown> | undefined
  ) => {
    toast.promise(promise, {
      pending: pendingMessage,
      success: successMessage,
      error: errorMessage,
      ...options,
    });
  };

  return { success, error, promise };
};
```

This will allow you to use the `useToast` hook to create notifications. 

```tsx
const { success, error, promise } = useToast();

success("Hello World!");
error("Hello World!");
promise(
  new Promise((resolve) => setTimeout(resolve, 1000)),
  "Loading...",
  "Success!",
  "Error!"
);
```

### Tie into MUI

With the upgrade to V11 of React Toastify, you can now pass in your own components to the `ToastContainer`. While at this time (January 2025) there is no official documentation, it is referenced in the [V11 Migration Guide](https://fkhadra.github.io/react-toastify/migration-v11). However, we will not provide an example here as it is not yet widely used. In the future, we hope that this change will allow easy integration with MUI.


