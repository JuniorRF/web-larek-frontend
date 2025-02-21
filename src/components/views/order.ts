import { cloneTemplate, ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { IUserData } from "../../types";
import { Modal } from "./modal";

export class OrderModal extends Modal {
    protected buttonSubmit: HTMLButtonElement;
    protected payment: HTMLButtonElement[];
    protected formOrder: HTMLFormElement;

    show(template: HTMLTemplateElement): void {
        this.setContent(template);

        this.buttonSubmit = ensureElement<HTMLButtonElement>('.order__button', this.content);
        this.payment = ensureAllElements<HTMLButtonElement>('.button_alt', this.content);
        this.formOrder = ensureElement<HTMLFormElement>('form[name="order"]', this.content);

        this.setPaymentMethod('card');

        this.payment.forEach((item) => {
            item.addEventListener('click', () => {
                this.setPaymentMethod(item.name);
            });
        });

        this.formOrder.addEventListener('input', (event: Event) => {
            // const target = event.target as HTMLInputElement;
            // const field = target.name;
            // const value = target.value;
            // this.events.emit('order:changeAddress', { field, value });
            this.buttonSubmit.disabled = !this.isFormValid();
        });
      
        this.formOrder.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            const payment = this.payment.find(item => item.classList.contains('button_alt-active')).name;
            const addressInput = this.formOrder.querySelector('input[name="address"]') as HTMLInputElement;
            this.events.emit('order:submit', {
                payment: payment,
                address: addressInput.value
            });
        });

        this.open();
    }

    protected setPaymentMethod(method: string): void {
        this.payment.forEach(item => {
            item.classList.toggle('button_alt-active', item.name === method);
        });
    }

    protected isFormValid(): boolean {
        const addressInput = this.formOrder.querySelector('[name="address"]') as HTMLInputElement;
        return addressInput?.value.length > 0;
    }
}

