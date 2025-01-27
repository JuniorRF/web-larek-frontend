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
    addProduct(): void;
    deleteProduct(): void;
}

type paymentMethod = 'onlain'| 'cash'

export interface IUserData {
    payment: paymentMethod;
    address: string;
    email: string;
    telephone: string;
    setPayment(): void;
    setAddress(): void;
    setEmail(): void;
    setTelephone(): void;
}