import { ProductState } from 'src/app/models/state/Product.state';
import { AppState } from './../app.state';
import { createSelector } from "@ngrx/store";

export const selectProduct = (state: AppState) => state.products;

export const selectProducts = createSelector(
    selectProduct,
    (state: ProductState) => state.items
);
export const selectLoading = createSelector(
    selectProduct,
    (state: ProductState) => state.loading
);
