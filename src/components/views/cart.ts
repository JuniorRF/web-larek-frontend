import { ensureElement, cloneTemplate } from "../../utils/utils";
import { IProductToCart } from "../../types";
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
    protected listItems: HTMLElement;
    protected buttonOrder: HTMLButtonElement;
    protected price: HTMLElement;

    show(products: HTMLElement[], template: HTMLTemplateElement, fullPrice: number): void {
        this.setContent(template);

        this.listItems = ensureElement<HTMLElement>('.basket__list', this.content);
        this.buttonOrder = ensureElement<HTMLButtonElement>('.basket__button', this.content);
        this.price = ensureElement<HTMLElement>('.basket__price', this.content);

        this.items = products;
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
    protected cardId: string;
    protected index: HTMLElement;
    protected title: HTMLElement;
    protected price: HTMLElement;
    protected buttonDelete: HTMLElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
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
        // super.render(data)  // вот так все сеттеры можно установить, если они совпадают с полями объекта
        return this.container;
    }
}