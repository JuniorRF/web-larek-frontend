import { IProductItem, IProductsGetApi } from "../types";
import { Api } from "./base/api";

export class ProductApi extends Api {

    getProduct(id: string): Promise<IProductItem> {
        return this.get(`/product/${id}`).then((data: IProductItem) => data) 
    }

    getProducts(): Promise<IProductItem[]> {
        return this.get('/product/').then((data: IProductsGetApi) => data.items) 
    }
}