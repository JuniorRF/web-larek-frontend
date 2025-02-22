import { Component } from "../base/Component";
import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";

export abstract class BaseProduct extends Component<IProductItem> {
    protected cardId: string;
    protected titleElement: HTMLElement;
    protected imageElement: HTMLImageElement;
    protected categoryElement: HTMLElement;
    protected priceElement: HTMLElement;
    protected events: IEvents;
    protected _categoryColor = <Record<string, string>> {
        "софт-скил": "soft",
        "другое": "other",
        "дополнительное": "additional",
        "кнопка": "button",
        "хард-скил": "hard"
      }

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.titleElement = ensureElement<HTMLElement>('.card__title', this.container);
        this.imageElement = ensureElement<HTMLImageElement>('.card__image', this.container);
        this.categoryElement = ensureElement<HTMLElement>('.card__category', this.container);
        this.priceElement = ensureElement<HTMLElement>('.card__price', this.container);
    }

    set id(value: string) {
        this.cardId = value;
    }

    set category(value: string) {
        this.setText(this.categoryElement, value);
        this.toggleClass(this.categoryElement, `card__category_${this._categoryColor[value]}`, true);
    }

    protected set price(value: number){
        if(value) {
            this.setText(this.priceElement, `${value} синапсов`);
        } else {
            this.setText(this.priceElement, 'нет цены =(');
        }
    }

    protected set title(value: string) {
        this.setText(this.titleElement, value);
    }

    protected set image(path: string) {
            this.setImage(this.imageElement, path);
    }
}