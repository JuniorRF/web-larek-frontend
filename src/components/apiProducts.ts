import { IApiOrder, IApiOrderResponse, IProductItem, IProductsGetApi } from "../types";
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

  postOrder(order: IApiOrder): Promise<IApiOrderResponse> {
    return this.post(`/order`, order).then((data: IApiOrderResponse) => data);
  }
}