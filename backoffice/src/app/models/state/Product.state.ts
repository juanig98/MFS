import { IProduct } from "../interfaces/IProduct";

export interface ProductState {
    loading: boolean; 
    items: ReadonlyArray<IProduct>;
}