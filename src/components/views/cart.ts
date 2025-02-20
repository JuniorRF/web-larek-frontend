import { ensureElement } from "../../utils/utils";

import { IProductItem, IProductToCart } from "../../types";
import { cloneTemplate } from "../../utils/utils";
import { Modal } from "./modal";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


export class Cart extends Component<IProductToCart> {
    protected events: IEvents;
    protected basketCounterElement: HTMLElement;
    protected basketElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.basketCounterElement = ensureElement<HTMLElement>('.header__basket-counter', this.container);
        this.basketElement = ensureElement<HTMLElement>('.header__basket', this.container);

        this.basketElement.addEventListener('click', () => {
            this.events.emit('cart:open');
        });
    }
    
    public set basketCount(value: number) {
        this.setText(this.basketCounterElement, value);
    }
}

export class CartModal extends Modal {
    private title: HTMLElement;
    private listItems: HTMLElement;
    private buttonOrder: HTMLButtonElement;
    private price: HTMLElement;

    public show(products: HTMLElement[], template: HTMLTemplateElement, fullPrice: number): void {
        const content = cloneTemplate(template);
        this.setContent(content);
        console.log(products);

        this.title = ensureElement<HTMLElement>('.modal__title', this.content);
        this.listItems = ensureElement<HTMLElement>('.basket__list', this.content);
        this.buttonOrder = ensureElement<HTMLButtonElement>('.basket__button', this.content);
        this.price = ensureElement<HTMLElement>('.basket__price', this.content);

        this.items = products;  // используем сеттер
        this.price.textContent = `${fullPrice} синапсов`;
        this.disableButton = fullPrice;

        this.buttonOrder.addEventListener('click', () => {
            this.events.emit('cart:buy', { products: this.listItems });
        });

        this.open();
    }

    set items(value: HTMLElement[]) {
        this.listItems.replaceChildren(...value);
    }

    set disableButton(fullPrice: number) {
        if(fullPrice === 0) {
            this.buttonOrder.disabled = true;
        } else {
            this.buttonOrder.disabled = false;
        }
    }
}


export class ProductsToCart extends Component<IProductToCart> {
    private cardId: string;
    private index: HTMLElement;
    private title: HTMLElement;
    private price: HTMLElement;
    private buttonDelete: HTMLElement;
    private events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(  container);
        this.events = events;
        this.index = ensureElement<HTMLElement>('.basket__item-index', this.container);
        this.title = ensureElement<HTMLElement>('.card__title', this.container);
        this.price = ensureElement<HTMLElement>('.card__price', this.container);
        this.buttonDelete = ensureElement<HTMLElement>('.basket__item-delete', this.container);

        this.buttonDelete.addEventListener('click', () => {
            this.events.emit('cart:deleteItem', {id: this.cardId});
            this.events.emit('cart:open');
        });
    }

    set id(value: string) {
        this.cardId = value;
    }

    set indexElement(value: number) {
        this.setText(this.index, value);
    }

    set titleElement(value: string) {
        this.setText(this.title, value);
    }

    set priceElement(value: number) {
        if (value) {    
            this.setText(this.price, value);
        } else {
            this.setText(this.price, '0');
        }
    }

    render(data: IProductToCart): HTMLElement {
        this.indexElement = data.index;
        this.titleElement = data.title;
        this.priceElement = data.price;
        this.id = data.id;
        return this.container;
    }
}