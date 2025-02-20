import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";


interface IPageView {
    productslist: HTMLElement[];
}


export class PageView extends Component<IPageView> {
    protected events: IEvents;
    protected productsContainer: HTMLElement;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        console.log('PageView container:', this.container);
        this.events = events;
        this.productsContainer = ensureElement('.gallery', this.container);
    }

    render(data: { productslist: HTMLElement[] }): HTMLElement {
        this.productsContainer.replaceChildren(...data.productslist);
        return this.container;
    }
}