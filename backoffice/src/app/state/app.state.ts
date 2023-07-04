import { ActionReducerMap } from "@ngrx/store";
import { ProductState } from "../models/state/Product.state";
import { productsReducer } from "./reducers/products.reducer";
import { UserState } from "../models/state/User.state";
import { usersReducer } from "./reducers/users.reducer";

export interface AppState {
    products: ProductState;
    users: UserState;
    // user:  
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    products: productsReducer,
    users: usersReducer,
}