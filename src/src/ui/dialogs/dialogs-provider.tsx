/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useId, useMemo, useRef, useState } from "react";
import { DialogsContext } from "./dialogs-context";
import {
  GenericDialogComponent,
  OpenGenericDialog,
  OpenGenericDialogOptions,
} from "./types/generic";
import { WithChildren } from "../props";

interface DialogStackEntry<P, R> {
  /**
   * Unique key for the dialog
   */
  key: string;
  /**
   * Is the dialog open. Used for the MUI Dialog open prop
   */
  open: boolean;

  /**
   * The promise that resolves when the dialog is closed.
   * The result of the dialog is the resolved value of the promise
   */
  promise: Promise<R>;

  /**
   * The Component to render for the dialog, this is passed in as a Type
   */
  Component: GenericDialogComponent<P, R>;

  /**
   * The payload to pass to the dialog. This is the data that the dialog needs to render.
   * Example values within the payload could be the title, message, or any other data the dialog needs to render.
   */
  Payload: P;

  /**
   * The function to call when the dialog is closed. This is used to handle any side effects of the dialog closing.
   * In addition, this is the method passed to custom dialogs to close the dialog. See examples in the docs/guides/dialogs.md
   */
  onClose: (result: R) => Promise<void>;

  /**
   * The resolve function for the promise. This is stored in a closure and called when the dialog is closed.
   */
  resolve: (result: R) => void;
}

export type DialogProviderProps = WithChildren & {
  /**
   * The time in milliseconds to wait before unmounting the dialog after it is closed.
   * This is used to allow the dialog to animate out before unmounting.
   * Defaults to 500ms
   */
  unmountAfter?: number;
};

export const DialogsProvider = ({
  unmountAfter = 500,
  children,
}: DialogProviderProps) => {
  const [stack, setStack] = useState<DialogStackEntry<any, any>[]>([]);
  const keyPrefix = useId();
  const nextId = useRef(0);

  const requestDialog = useCallback<OpenGenericDialog>(
    function open<P, R>(
      Component: GenericDialogComponent<P, R>,
      payload: P,
      options: OpenGenericDialogOptions<R> = {}
    ) {
      const { onClose = async () => {} } = options;

      // This section is a bit tricky. We need to create a promise that resolves when the dialog is closed.
      // The solution is to create a new promise each time a dialog is opened and store the resolve function in a closure.
      let resolve: ((result: R) => void) | undefined;
      const promise = new Promise<R>((r) => {
        resolve = r;
      });

      if (!resolve) {
        throw new Error("resolve is undefined");
      }

      const key = `${keyPrefix}-${nextId.current++}`;

      const newEntry: DialogStackEntry<P, R> = {
        key,
        open: true,
        promise,
        Component,
        Payload: payload,
        onClose,
        resolve,
      };

      setStack((prevStack) => [...prevStack, newEntry]);
      return promise;
    },
    [keyPrefix]
  );

  const closeDialogUi = useCallback(
    function closeDialogUi<R>(dialog: Promise<R>) {
      setStack((prevStack) =>
        prevStack.map((entry) =>
          entry.promise === dialog ? { ...entry, open: false } : entry
        )
      );
      setTimeout(() => {
        // wait for closing animation
        setStack((prevStack) =>
          prevStack.filter((entry) => entry.promise !== dialog)
        );
      }, unmountAfter);
    },
    [unmountAfter]
  );

  const closeDialog = useCallback(
    async function closeDialog<R>(dialog: Promise<R>, result: R) {
      const entryToClose = stack.find((entry) => entry.promise === dialog);

      if (!entryToClose) {
        throw new Error("Dialog not found");
      }

      await entryToClose.onClose(result);
      entryToClose.resolve(result);
      closeDialogUi(dialog);
      return dialog;
    },
    [stack, closeDialogUi]
  );

  const contextValue = useMemo(
    () => ({ open: requestDialog, close: closeDialog }),
    [requestDialog, closeDialog]
  );

  return (
    <DialogsContext.Provider value={contextValue}>
      {children}
      {stack.map((entry) => {
        const { key, open, Component, Payload, ...other } = entry;
        return (
          <Component
            key={key}
            payload={Payload}
            open={open}
            {...other}
            onClose={async (result) => await closeDialog(entry.promise, result)}
          />
        );
      })}
    </DialogsContext.Provider>
  );
};
