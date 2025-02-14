import { IProductItem } from "../types";

export class ProductModel {
    protected products:  IProductItem[] = [];

    setProducts(products: IProductItem[]) {
        this.products = products
    }

    getProducts(): IProductItem[] {
        return this.products
    }
    
    getProduct(id:string): IProductItem | undefined {
        return this.products.find(product => product.id === id);
    }
}