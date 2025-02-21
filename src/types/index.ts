export interface IProductItem {
    "id": string,
    "description": string,
    "image": string,
    "title": string,
    "category": string,
    "price": number
}

export interface IProductToCart {
    "index": number,
    "title": string,
    "price": number,
    "id": string
}

export interface IProductsGetApi {
    "total": number;
    "items": IProductItem[];
}

export interface IModal {
    open(): void;
    close(): void;
}

export type paymentMethod = 'card'| 'cash'

export interface IUserData{
    payment: paymentMethod;
    address: string;
    email: string;
    phone: string;
}

export interface IUserDataClass extends IUserData {
    setPayment(payment: string): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setTelephone(telephone: string): void;
}

export interface IApi<T> {
    get(endpoint: string): Promise<T>;
    post(endpoint: string, data: T): Promise<T>;
}


export interface IView<T> {
    render(): void;
    update(): void;
    clear(): void;
}

export interface IProductView extends IView<IProductItem> {
    displayProduct(product: IProductItem): void;
    displayProductList(products: IProductItem[]): void;
}

export interface IOrderView extends IView<IOrder> {
    displayOrder(order: IOrder): void;
    displayOrderList(orders: IOrder[]): void;
}

export interface IUserView extends IView<IUserData> {
    displayUserData(userData: IUserData): void;
    displayEditForm(): void;
}

export interface IOrder extends IUserData {
    products: IProductItem[];
    totalPrice: number;
    addProduct(id: string): void;
    deleteProduct(id: string): void;
}


export interface IApiOrder extends IUserData {
    "items": string[],
    "total": number,
}

export interface IApiOrderResponse {
    id: string;
    total: number;
  }