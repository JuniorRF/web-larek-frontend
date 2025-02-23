import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../base/events";


interface ISuccessModal {
    price: number;
}

export class SuccessModalNew extends Component<ISuccessModal> {
    protected priceContent: HTMLParagraphElement;
    protected buttonSuccess: HTMLButtonElement;
    protected events: IEvents;

    constructor(container: HTMLElement, events: IEvents) {
        super(container);
        this.events = events;
        this.priceContent = ensureElement<HTMLParagraphElement>('.order-success__description', this.container);
        this.buttonSuccess = ensureElement<HTMLButtonElement>('.order-success__close', this.container);

        this.buttonSuccess.addEventListener('click', () => {
            this.events.emit('success:ok');
        });
    }

    render(data: ISuccessModal): HTMLElement {
        this.setText(this.priceContent, `Списано ${data.price} синапсов`);
        return this.container;  
    }
}
