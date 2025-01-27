export interface IProductItem {
    "id": string,
    "description": string,
    "image": string,
    "title": string,
    "category": string,
    "price": number
}

export interface IProductList {
    "total": number;
    "items": IProductItem[];
}

export interface IModal {
    "modal": string;
    open(): void;
    close(): void;
}

export interface IOrder {
    products: IProductItem[];
    totalPrice: number;
    addProduct(id: string): void;
    deleteProduct(id: string): void;
}

type paymentMethod = 'onlain'| 'cash'

export interface IUserData {
    payment: paymentMethod;
    address: string;
    email: string;
    telephone: string;
    setPayment(payment: string): void;
    setAddress(address: string): void;
    setEmail(email: string): void;
    setTelephone(telephone: string): void;
}