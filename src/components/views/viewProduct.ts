import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";

export class ProductView extends Component<IProductItem> {
    private category: HTMLElement;
    private image: HTMLImageElement;
    private title: HTMLElement;
    private price: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.category = ensureElement<HTMLElement>('.card__category', this.container);
        this.image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.title = ensureElement<HTMLElement>('.card__title', this.container);
        this.price = ensureElement<HTMLElement>('.card__price', this.container);
    }

    render(data: IProductItem): HTMLElement {
        this.cardCategory = data.category;
        this.cardImage = data.image;
        this.cardTitle = data.title;
        this.cardPrice = data.price;
        return this.container;
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