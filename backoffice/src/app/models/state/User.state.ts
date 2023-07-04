import { IUser } from "../interfaces/IUser";

export interface UserState {
    loading: boolean; 
    items: ReadonlyArray<IUser>;
}