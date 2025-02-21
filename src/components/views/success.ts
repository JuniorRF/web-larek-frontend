import { cloneTemplate, ensureElement } from "../../utils/utils";
import { Modal } from "./modal";

export class SuccessModal extends Modal {
    protected buttonClose: HTMLButtonElement;
    protected price: HTMLParagraphElement;

    show(template: HTMLTemplateElement, price: number): void {
        this.setContent(template);

        this.buttonClose = ensureElement<HTMLButtonElement>('.order-success__close', this.content);
        this.price = ensureElement<HTMLParagraphElement>('.order-success__description', this.content);

        
        this.price.textContent = `Списано ${price} синапсов`;

        this.buttonClose.addEventListener('click', () => {
            this.events.emit('succes:ok');
        });
    }
}
