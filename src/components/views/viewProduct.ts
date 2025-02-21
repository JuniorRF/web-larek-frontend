import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";

export class ProductView extends Component<IProductItem> {
    protected cardId: string;
    protected events: IEvents;
    protected image: HTMLImageElement;
    protected title: HTMLElement;
    protected price: HTMLElement;
    protected category: HTMLElement;
    

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.category = ensureElement<HTMLElement>('.card__category', this.container);
        this.image = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.title = ensureElement<HTMLElement>('.card__title', this.container);
        this.price = ensureElement<HTMLElement>('.card__price', this.container);

        this.container.addEventListener('click', () => {
            this.events.emit('card:select', {id: this.cardId});
        });
    }

    render(data: IProductItem): HTMLElement {
        this.id = data.id;
        this.cardCategory = data.category;
        this.cardImage = data.image;
        this.cardTitle = data.title;
        this.cardPrice = data.price;
        return this.container;
    }

    set id(value: string) {
        this.cardId = value;
    }

    set cardTitle(value: string) {
        this.setText(this.title, value);
    }

    set cardCategory(value: string) {
        this.setText(this.category, value);
        const className = 'card__category card__category_'
        switch(value) {
            case 'дополнительное':
                this.category.className = className + 'additional';
                break;
            case 'софт-скил':
                this.category.className = className + 'soft';
                break;
            case 'кнопка':
                this.category.className = className + 'button';
                break;
            case 'хард-скил':
                this.category.className = className + 'hard';
                break;
            case 'другое':
                this.category.className = className + 'other';
                break;
        }

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