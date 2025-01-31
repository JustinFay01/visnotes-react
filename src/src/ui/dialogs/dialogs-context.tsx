import React from 'react'
import { OpenGenericDialog, CloseGenericDialog } from './types/generic'

export const DialogsContext = React.createContext<{
  open: OpenGenericDialog
  close: CloseGenericDialog
} | null>(null)
