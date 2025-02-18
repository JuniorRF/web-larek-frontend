import { IProductItem, IProductsGetApi } from "../types";
import { Api, ApiListResponse } from "./base/api";

export class ProductApi extends Api {

    cdn: string;
    items: IProductItem[];

    constructor( baseUrl: string, cdn: string, options?: RequestInit) {
        super(baseUrl, options);
        this.cdn = cdn;
    }

    getProducts(): Promise<IProductItem[]> {
    return this.get('/product').then((data: ApiListResponse<IProductItem>) =>
        data.items.map((item) => ({...item, image: this.cdn + item.image})));
}

//   postOrderLot(order: IOrderLot): Promise<IProductsGetApi> {
//     return this.post(`/order`, order).then((data: IOrderResult) => data);
//   }
}