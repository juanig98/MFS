import { createReducer, on } from '@ngrx/store';
import { IProduct } from 'src/app/models/interfaces/IProduct';
import { loadProducts, loadedProducts, retrieveProductList } from '../actions/products.actions';
import { ProductState } from 'src/app/models/state/Product.state';


export const initialState: ProductState = { loading: false, items: [] };

export const productsReducer = createReducer(
    initialState,
    on(loadProducts, (state) => {
        return { ...state, loading: true }
    }),
    on(loadedProducts, (state, { items }) => {
        return { ...state, items, loading: false }
    })
    // on(retrieveProductList, (state, { products }) => products)
);