import { IProduct } from "../models/IProduct";

export class ProductService{

    async getAll(): Promise<IProduct[]>{
        const res = await fetch('https://fakestoreapi.com/products');
        return res.json();
    }
    
}