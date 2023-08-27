"use client";

import { Row, RowSelectionState } from "@tanstack/react-table";

export type ISelectedItemsActionsComponent<T> = (params : {rows:T[]}) => JSX.Element;

export interface GenericTableActions<T> {
  selectedItemsActionsComponent?: ISelectedItemsActionsComponent<Row<T>>;
}
