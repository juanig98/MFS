import { IProduct } from "../models/IProduct";
import clientApi from "./clientApi";

export class ProductService {
  async getAll(): Promise<IProduct[]> {
    const res = await clientApi.get('/products');
    return res.data;
  }
}
