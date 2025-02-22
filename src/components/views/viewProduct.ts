import { IProductItem } from "../../types";
import { IEvents } from "../base/events";
import { BaseProduct } from "./poductBase";

export class ProductView extends BaseProduct {
    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);

        this.container.addEventListener('click', () => {
            this.events.emit('card:select', {id: this.cardId});
        });
    }

    render(data: IProductItem): HTMLElement {
        super.render(data);
        return this.container;
    }
}