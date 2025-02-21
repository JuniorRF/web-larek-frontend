import { IProductItem } from "../../types";
import { IEvents } from "../base/events";


export class ProductModel {
    protected products:  IProductItem[] = [];
    protected buyProducts: IProductItem[] = [];

    constructor(protected events: IEvents) {
        this.events = events;
    }

    setProducts(products: IProductItem[]) {
        this.products = products
        this.events.emit('products:loaded')
    }

    getProducts(): IProductItem[] {
        return this.products
    }
    
    getProduct(id:string): IProductItem {
        return this.products.find(product => product.id === id);
    }

    addToBuyProducts(id: string) {
        const product = this.getProduct(id);
        if (product && !this.buyProducts.find(item => item.id === id)) {
            this.buyProducts.push(product);
        }
    }

    getBuyProducts(): IProductItem[] {
        return this.buyProducts;
    }

    getBuyForApi(): string[] {
        return this.buyProducts.map(item => (item.id));
    }

    getBuyProductsCount(): number {
        return this.buyProducts.length;
    }

    deleteFromBuyProducts(id: string): void {
        const index = this.buyProducts.findIndex(item => item.id === id);
        if (index !== -1) {
            this.buyProducts.splice(index, 1);
            this.events.emit('cart:remove', { id });
        }
    }

    getFullPrice(): number {
        return this.buyProducts.reduce((acc, product) => acc + product.price, 0);
    }

    clearBuyProducts(): void {
        this.buyProducts = [];
    }
}