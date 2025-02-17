import { IProductItem } from "../types";
import { ensureElement } from "../utils/utils";
import { Component } from "./base/Component";

export class ProductView extends Component <IProductItem> {

    protected title: HTMLHeadingElement;
    protected category: HTMLSpanElement;
    protected image: HTMLImageElement;
    protected price: HTMLSpanElement;


    constructor(container: HTMLElement) {
        super(container);
        this.title = ensureElement('.card__title', this.container) as HTMLHeadingElement;
        this.category = ensureElement('.card__category', this.container) as HTMLSpanElement;
        this.image = ensureElement('.card__image', this.container) as HTMLImageElement;
        this.price = ensureElement('.card__price', this.container) as HTMLSpanElement;
    }

    set cardTitle(value: string) {
        this.setText(this.title, value);
    }

    set cardCategory(value: string) {
        this.setText(this.category, value)
    }

    set cardImage(path: string) {
        this.setImage(this.image, path)
    }

    set cardPrice(value: number) {
        if(value) {
            this.setText(this.price, `${value} синапсов`)
        } else {
            this.setText(this.price, 'нет цены =(')
        }
    }
}