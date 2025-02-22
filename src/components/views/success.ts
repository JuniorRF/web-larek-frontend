import {  ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Modal } from "./modal";

export class SuccessModal extends Modal {
    protected buttonSuccess: HTMLButtonElement;
    protected price: HTMLParagraphElement;

    // constructor(container: HTMLElement, events: IEvents ) {
    //     super(container, events);
        // this.setContent(template);

       

        

    show(template: HTMLTemplateElement, price: number): void {

        this.setContent(template);
        this.buttonSuccess = ensureElement<HTMLButtonElement>('.order-success__close', this.content);
        this.price = ensureElement<HTMLParagraphElement>('.order-success__description', this.content);
        

        
        this.price.textContent = `Списано ${price} синапсов`;
        
        this.buttonSuccess.addEventListener('click', () => {
            this.events.emit('success:ok');
        });
        // this.open();
    }
}
