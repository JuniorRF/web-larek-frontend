import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { EventEmitter, IEvents } from "../base/events";


interface IPageView {
    productslist: HTMLElement[];
    basketCount: number;
}


export class PageView extends Component<IPageView> {
    protected events: IEvents;
    protected productsContainer: HTMLElement;
    // protected basketCounterElement: HTMLElement;
    // protected basketElement: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        console.log('PageView container:', this.container);
        this.events = events;
        this.productsContainer = ensureElement('.gallery', this.container);
        // this.basketCounterElement = ensureElement('.header__basket-counter', this.container);
        // this.basketElement = ensureElement('.header__basket', this.container);

    }

    // set productsList(value: HTMLElement[]) {
    //     this.productsContainer.append(...value);
    // }

    // set basketCount(value: number) {
    //     this.basketElement.textContent = value.toString();
    // }

    render(data: { productslist: HTMLElement[] }): HTMLElement {
        this.productsContainer.replaceChildren(...data.productslist);
        
        
        
        return this.container;
    }
}