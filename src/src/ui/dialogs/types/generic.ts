import { DialogProps } from '@mui/material'
import React from 'react'

export type GenericDialogProps<P = undefined, R = void> = {
  payload: P
  onClose: (result?: R) => Promise<void>
} & Omit<DialogProps, 'onClose'>

/**
 * The main dialog component type. This is a React component that takes a payload and returns a result.
 */
export type GenericDialogComponent<P, R> = React.ComponentType<
  GenericDialogProps<P, R>
>

export interface OpenGenericDialogOptions<R> {
  message?: React.ReactNode
  title?: React.ReactNode

  /**
   * Denotes the purpose of the dialog. This will affect the color of the
   * "Ok" button. Defaults to `undefined`.
   */
  icon?: React.ReactNode
  variant?: 'error' | 'info' | 'success' | 'warning'

  /**
   * The function to call when the dialog is closed. This should resolve the promise.
   * This is used to handle any side effects of the dialog closing.
   */
  onClose?: (result: R) => Promise<void>
}

/**
 * This is the interface that defines two open functions.
 * It is used as the type of the `open` prop in the `DialogsContext`.
 */
export interface OpenGenericDialog {
  /**
   * Open a dialog with the given component and optional payload.
   */
  <P extends undefined, R>(
    Component: GenericDialogComponent<P, R>,
    payload?: P,
    options?: OpenGenericDialogOptions<R>,
  ): Promise<R>

  /**
   * Open a dialog with the given component and required payload.
   */
  <P, R>(
    Component: GenericDialogComponent<P, R>,
    payload: P,
    options?: OpenGenericDialogOptions<R>,
  ): Promise<R>
}

export interface CloseGenericDialog {
  <R>(Dialog: Promise<R>, result: R): Promise<R>
}
