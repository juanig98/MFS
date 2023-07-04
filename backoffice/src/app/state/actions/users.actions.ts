
import { createAction, props } from "@ngrx/store";

export const addUser = createAction(
    '[User List] Add User',
    props<{ id: number }>()
);
export const removeUser = createAction(
    '[User List] Remove User',
    props<{ id: number }>()
);
export const loadUsers = createAction(
    '[User List] Load Users',
);
export const retrieveUserList = createAction(
    '[User List] Retrieve User List',
);