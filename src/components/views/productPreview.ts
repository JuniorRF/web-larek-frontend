import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";
import { ProductView } from "./viewProduct";
import { IProductItem } from "../../types";

interface IProductPreview {
    text: HTMLElement;
    button: HTMLButtonElement;
}

export class ProductPreview extends ProductView implements IProductPreview {
    public text: HTMLElement;
    public button: HTMLButtonElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container, events);
        this.text = ensureElement<HTMLElement>('.card__text', this.container);
        this.button = ensureElement<HTMLButtonElement>('.button', this.container);
    }

    

    render(data: IProductItem): HTMLElement {
        super.render(data);
        this.setText(this.text, data.description)
        return this.container;
    }
}
