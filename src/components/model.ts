import { IProductItem } from "../types";
import { IEvents } from "./base/events";

export class ProductModel {
    protected products:  IProductItem[] = [];
    private events: IEvents;

    constructor(events: IEvents) {
        this.events = events;
    }

    setProducts(products: IProductItem[]) {
        this.products = products
        this.events.emit('products-loaded', this.products)
    }

    getProducts(): IProductItem[] {
        return this.products
    }
    
    getProduct(id:string): IProductItem | undefined {
        return this.products.find(product => product.id === id);
    }
}