import { DialogAction } from "../enums/DialogAction.enum";

export interface DialogConfig<T> {
    open: boolean;
    data?: T;
    action?: DialogAction;
}

