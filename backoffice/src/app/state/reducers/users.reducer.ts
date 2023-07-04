import { createReducer, on } from '@ngrx/store';
import { IUser } from 'src/app/models/interfaces/IUser';
import { loadUsers, retrieveUserList } from '../actions/users.actions';
import { UserState } from 'src/app/models/state/User.state';


export const initialState: UserState = { loading: false, items: [] };

export const usersReducer = createReducer(
    initialState,
    on(loadUsers, (state) => { return { ...state, loading: true } })

);