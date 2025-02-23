import { IProductItem } from "../../types";
import { ensureElement } from "../../utils/utils";
import { BaseProduct } from "./poductBase";
import { IEvents } from "../base/events";


export class ProductForModal extends BaseProduct {
    private buttonBuy: HTMLButtonElement;
    private descriptionElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents, price: number) {
        super(container, events);
        this.buttonBuy = ensureElement<HTMLButtonElement>('.card__button', this.container);
        this.descriptionElement = ensureElement<HTMLElement>('.card__text', this.container);

        this.disableButton = price;

        this.buttonBuy.addEventListener('click', () => {
            this.events.emit('product:add', { id: this.cardId });
        });
    }

    set description(value: string) {
        this.setText(this.descriptionElement, value);
    }

    render(product: IProductItem): HTMLElement {
        super.render(product);
        this.description = product.description;
        return this.container;
    }

    set disableButton(value: number) {
        this.setDisabled(this.buttonBuy, Boolean(!value));
    }
}
