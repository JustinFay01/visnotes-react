import { useCallback, useContext, useMemo } from 'react'
import { AlertDialog } from '../components/alert-dialog'
import { ConfirmDialog } from '../components/confirm-dialog'
import { DialogsContext } from '../dialogs-context'
import { OpenAlertDialog, OpenConfirmDialog } from '../types/concrete'
import { OpenGenericDialog } from '../types/generic'

export interface DialogHook {
  alert: OpenAlertDialog
  confirm: OpenConfirmDialog
  open: OpenGenericDialog
}

export function useDialogs(): DialogHook {
  const context = useContext(DialogsContext)

  if (context === null) {
    throw new Error('useDialogs must be used within a DialogsProvider')
  }

  const { open } = context

  const confirm = useCallback<OpenConfirmDialog>(
    async (msg, { onClose, ...options } = {}) =>
      open(ConfirmDialog, { message: msg, ...options }, { onClose }),
    [open],
  )

  const alert = useCallback<OpenAlertDialog>(
    async (msg, { onClose, ...options } = {}) =>
      open(AlertDialog, { message: msg, ...options }, { onClose }),
    [open],
  )

  return useMemo(
    () => ({
      alert,
      confirm,
      open,
    }),
    [alert, confirm, open],
  )
}
