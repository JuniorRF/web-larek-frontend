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
