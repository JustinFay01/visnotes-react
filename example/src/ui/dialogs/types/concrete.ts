import React from 'react'
import { OpenGenericDialogOptions } from './generic'

/**
 * This will be used as the base type for all concrete dialog functions.
 * 
 * @example
 * OpenAlertDialog = OpenConcreteDialog<AlertDialogOptions, void>
 * ...
 * const alert = useCallback<OpenAlertDialog>(
    async (msg, { onClose, ...options } = {}) =>
      open(AlertDialog, { msg, ...options }, { onClose }),
    [open],
  )
 */
export interface OpenConcreteDialog<TOptions, R> {
  /**
   * Open a dialog with the given TOptions.
   */
  (msg: React.ReactNode, options?: TOptions): Promise<R>
}

export interface ConfirmDialogOptions
  extends OpenGenericDialogOptions<boolean> {
  confirmLabel?: React.ReactNode
  cancelLabel?: React.ReactNode
}

export type OpenConfirmDialog = OpenConcreteDialog<
  ConfirmDialogOptions,
  boolean
>

export interface AlertDialogOptions extends OpenGenericDialogOptions<void> {
  okLabel?: React.ReactNode
}

export type OpenAlertDialog = OpenConcreteDialog<AlertDialogOptions, void>
