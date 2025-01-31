/* eslint-disable @typescript-eslint/no-explicit-any */
import { DefaultOptions, UseMutationOptions } from "@tanstack/react-query";

// https://github.com/alan2207/bulletproof-react/blob/master/apps/react-vite/src/lib/react-query.ts

export const queryConfig = {
  queries: {
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: 1000 * 60,
  },
} satisfies DefaultOptions;

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
  Awaited<ReturnType<FnType>>;

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
  "queryKey" | "queryFn"
>;

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
  MutationFnType extends (...args: any) => Promise<any>
> = UseMutationOptions<
  ApiFnReturnType<MutationFnType>,
  Error,
  Parameters<MutationFnType>[0]
>;
