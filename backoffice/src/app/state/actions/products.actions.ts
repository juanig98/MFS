import { IProduct } from 'src/app/models/interfaces/IProduct';
import { createAction, props } from "@ngrx/store";

export const addProduct = createAction(
    '[Product List] Add Product',
    props<{ id: number }>()
);
export const removeProduct = createAction(
    '[Product List] Remove Product',
    props<{ id: number }>()
);
export const loadProducts = createAction(
    '[Product List] Load Products',
);
export const loadedProducts = createAction(
    '[Product List] Loaded Products',
    props<{ items: IProduct[] }>()
);
export const retrieveProductList = createAction(
    '[Product List] Retrieve Product List',
);