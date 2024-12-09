# React Query

## Installation

To install [React Query](https://tanstack.com/query/latest/docs/framework/react/installation), run the following command:

```bash
pnpm add @tanstack/react-query
```

## Configuration

Conforming to our project structure, we have a folder called lib. This folder is used to configure any third party libraries that we wish to use throughout the application. In this case, we have a file called `react-query.ts`. This file is used to configure the react query client. 

```tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultOptions, UseMutationOptions } from '@tanstack/react-query'

// https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/lib/react-query.ts

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions

/**
 * A utility type that extracts the resolved return type of a function that returns a Promise.
 *
 * @template FnType - A function type that takes any arguments and returns a Promise.
 * @typeParam FnType - The function type whose return type is to be extracted.
 * @returns The resolved type of the Promise returned by the function.
 *
 * @link https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/lib/react-query.ts
 */
export type ApiFnReturnType<FnType extends (...args: any) => Promise<any>> =
  Awaited<ReturnType<FnType>>

/**
 * Type definition for the configuration of a query.
 *
 * This type takes a generic function type `T` and omits the properties
 * 'queryKey' and 'queryFn' from the return type of `T`.
 *
 * @template T - A function type whose return type will be used to derive the query configuration type.
 *
 * @link https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/lib/react-query.ts
 */
export type QueryConfig<T extends (...args: any[]) => any> = Omit<
  ReturnType<T>,
  'queryKey' | 'queryFn'
>

/**
 * Type definition for the configuration options of a mutation.
 *
 * @template MutationFnType - The type of the mutation function, which is expected to be a function that returns a Promise.
 *
 * @typedef {UseMutationOptions<ApiFnReturnType<MutationFnType>, Error, Parameters<MutationFnType>[0]>} MutationConfig
 * Represents the configuration options for a mutation, including the return type of the mutation function, the error type, and the parameters of the mutation function.
 *
 * @link https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/lib/react-query.ts
 */
export type MutationConfig<
  MutationFnType extends (...args: any) => Promise<any>,
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>
```

Now, there is a lot going on in this file and it can be a bit overwhelming at first. However, the key takeaway is that this file is used to configure the react query client. It is also used to define types that are used throughout the application. The most important part of this file is the `queryConfig` object. This object is used to define the default options for the react query client. 

You may not feel the need for the extra types defined in this file and that is okay. However, it is recommended to use the `queryConfig` object to define the default strategy.

You can apply the `queryConfig` object to the `QueryClientProvider` in the `AppProvider.tsx` file (or wherever you are defining the `QueryClientProvider`).

```ts
const appQueryClient = new QueryClient({
  defaultOptions: queryConfig,
})

export const AppProvider = ({ children }: WithChildren) => {
  return (
    ...
    <QueryClientProvider client={appQueryClient}>
          {children}
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  ...
  )
}
```

## Api Layer

As we add react query to the app we will have the API call and query/mutation hook in the same file. With this pattern we'll want to have each API call in a separate file the following convention `{verb}-{resource}` (i.e. `get-subject` or `update-subject`).

For this example, we will cover both the `get-subject` and `update-subject` API calls to give a brief overview of mutations and queries.

### Get Subject

#### Query Key

Starting with the `get-subject` API call, we will first define the query [key](https://tanstack.com/query/latest/docs/framework/react/guides/query-keys). This key is used to identify the query in the cache. It is important to note that the query key should be unique to the query. 

In our query key factory file, we will define the query key for the `subject` resource. 

```tsx
export const subjectKeys = {
  /**
   * @description {["subjects"]}
   */
  all: ['subjects'] as const,

  /**
   * @param id
   * @description {["subjects", id]}
   */
  detail: (id: string) => ['subjects', id] as const,
```

 You will see shortly how this key is used in the `get-subject` query.

#### API Call

For your project, you may choose to use axios, fetch, or any other library to make the API call. In this example, we will use axios. 

```tsx
export const getSubject = async (id: string): Promise<Subject> => {
  return (await api.get(`/subject/${id}`)).data as Subject
}
```

As you can see, this function is a simple axios call that fetches a subject by its id and casts the response to a `Subject` type. This not always recommended as you can see it limits access to the error handling and other features of axios. However, in our application, things like [axios interceptors](https://axios-http.com/docs/interceptors) are used to manage errors. In addition, we rely solely on the react query client for the majority of our data manipulation, therefore in order to avoid unnecessary chaining (like `subjectQuery.data?.data`), we cast the response to the `Subject` type and access the data directly.

#### Query

Now that we have defined the query key and the API call, we can define the query options and the query itself. 

```tsx
type UseGetSubjectOptions = {
  id: string
}

export const getSubjectQueryOptions = ({ id }: UseGetSubjectOptions) => {
  return queryOptions({
    queryKey: subjectKeys.detail(id),
    queryFn: () => getSubject(id),
  })
}

export const useGetSubject = ({ id }: UseGetSubjectOptions) => {
  return useQuery({
    ...getSubjectQueryOptions({ id }),
  })
}
```

In this file, we define the `UseGetSubjectOptions` type which is used to define the options for the `useGetSubject` hook. We then define the `getSubjectQueryOptions` function which is used to define the query options for the `useQuery` hook. Finally, we define the `useGetSubject` hook which is used to fetch the subject by its id.

You may be wondering why we define the `getSubjectQueryOptions`. This is done to allow for the query options to be used in a more flexible manner with React Query. For example, if you need to call multiple queries you may want to use `useQueries` instead of `useQuery`. In this case, you can define the query options separately and pass them to the `useQueries` hook. 

```tsx

// 🚨 Throws compiler error
// Type 'UseQueryResult<Subject, Error>' is not assignable to type ...
const results = useQueries({
  queries: [
    useGetSubjects({ id: '1' }),
    useGetSubjectsQuery(),
  ]
})

// ✅ No compiler error
const results = useQueries({
  queries: [
    useGetSubjectsQueryOptions({ id: '1' }),
    useGetSubjectsQueryOptions(),
  ]
})
```

### Update Subject

Now that we have covered the `get-subject` query, we can move on to the `update-subject` [mutation](https://tanstack.com/query/latest/docs/framework/react/guides/mutations). This guide won't dive into the details of mutations, but it is important to note that mutations are used to update data on the server.

In this example, we are going to cover an optimistic update. This means that we will update the cache before the server responds. This is done to improve the user experience.

**_When optimal_**, make sure to implement optimistic mutations. See what this means [here](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates?from=reactQueryV3).

Here is an example that follows the [TanStack Query](https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates?from=reactQueryV3) example with slight modifications for a JsonPatch method rather than a put.

**Assume a similar setup as the `get-subject` query.**

```tsx
export interface UpdateSubjectQueryOptions {
  id: string
  config?: Omit<MutationConfig<typeof updateSubject>, 'onMutate'>
}

export const useUpdateSubject = ({ id, config }: UpdateSubjectQueryOptions) => {
  const queryClient = useQueryClient()

  const { onError, onSettled, ...restConfig } = config || {}

  return useMutation({
    mutationFn: (options: UpdateSubjectOptions) => updateSubject(options),
    onMutate: async ({ id, patch }: UpdateSubjectOptions) => {
       // This will update the subject in the cache before the server responds
      // Start by canceling any outgoing fetches
      await queryClient.cancelQueries({ queryKey: subjectKeys.detail(id) });

      // Snapshot the previous value and copy it to a new object
      const previousSubject = queryClient.getQueryData<Subject>(
        subjectKeys.detail(id)
      );
      const newSubject = { ...previousSubject };

      // (Different from TanStack example)
      // Apply the patch to the previous value
      applyPatch(newSubject, patch);

      // Optimistically update the cache with the new value
      queryClient.setQueryData(subjectKeys.detail(id), newSubject);

      // Return a context object with the snapshot value
      return { previousSubject };
    },
    onError: (_error, _variables, context) => {
      // If the mutation fails, roll back to the previous subject
      queryClient.setQueryData(
        subjectKeys.detail(id),
        context?.previousSubject
      );

      onError?.(_error, _variables, context)
    },
    onSettled: (...args) => {
      // Always Refresh after error or success
      queryClient.invalidateQueries({ queryKey: subjectKeys.detail(id) });
      onSettled?.(...args)
    },
    ...restConfig,
  })
}
```

The `useUpdateSubject` hook is a custom React hook that leverages the `useMutation` hook from the TanStack Query library to handle updating a subject. It accepts an `id` and an optional `config` object as parameters. The hook performs the following actions:

1. **Mutation Function**: Defines the mutation function `updateSubject` that will be called with the provided options.
2. **Optimistic Update**: In the `onMutate` callback, it cancels any outgoing fetches for the subject, snapshots the current subject data, applies a patch to create a new subject object, and updates the cache optimistically with this new value.
3. **Error Handling**: In the `onError` callback, if the mutation fails, it rolls back the cache to the previous subject data.
4. **Settling**: In the `onSettled` callback, it invalidates the queries to ensure the cache is refreshed after the mutation, regardless of success or failure.
5. **Configuration**: Merges any additional configuration options provided in the `config` object.

This hook ensures that the subject data in the cache is updated optimistically and rolled back if the mutation fails, providing a responsive user experience.

Here we see the use of the `MutationConfig` type that was defined in the `react-query.ts` file. This type is used to define the configuration options for the mutation. It allows us to use the hook within a component and pass in any configuration options that we need. 

This can be critical because if we want to use the hook **optimistically** in multiple places with different error handling, we can pass in the error handling as a configuration option. 


## References 

- [TanStack Query](https://tanstack.com/query/v5/docs/framework/react/overview)
- [TanStack Query Keys](https://tanstack.com/query/v5/docs/guides/query-keys)
- [React Query Guides](https://tkdodo.eu/blog/practical-react-query)
- [Axios Interceptors](https://axios-http.com/docs/interceptors)
- [React Query Mutations](https://tanstack.com/query/latest/docs/framework/react/guides/mutations)