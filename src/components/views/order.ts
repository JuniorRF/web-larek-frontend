import { cloneTemplate, ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../base/events";
import { IUserData } from "../../types";
import { Modal } from "./modal";

export class OrderModal extends Modal {
    protected buttonSubmit: HTMLButtonElement;
    protected payment: HTMLButtonElement[];
    protected formOrder: HTMLFormElement;
    protected addressError: HTMLElement;

    show(template: HTMLTemplateElement): void {
        this.setContent(template);

        this.buttonSubmit = ensureElement<HTMLButtonElement>('.order__button', this.content);
        this.payment = ensureAllElements<HTMLButtonElement>('.button_alt', this.content);
        this.formOrder = ensureElement<HTMLFormElement>('form[name="order"]', this.content);
        this.addressError = ensureElement<HTMLElement>('.form__errors_address', this.content);

        this.setPaymentMethod('card');
        

        this.payment.forEach((item) => {
            item.addEventListener('click', () => {
                this.setPaymentMethod(item.name);
            });
        });

        this.formOrder.addEventListener('input', (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.name === 'address') {
                this.validateAddress(input);
            }
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

    protected validateAddress(input: HTMLInputElement): void {
        const isValid = input.value.length > 3;
        this.addressError.textContent = !input.value ? 'Необходимо указать адрес' : 
                                    !isValid ? 'Адрес должен быть не менее 3 символов' : '';
    }

    protected setPaymentMethod(method: string): void {
        this.payment.forEach(item => {
            item.classList.toggle('button_alt-active', item.name === method);
        });
    }

    protected isFormValid(): boolean {
        const addressInput = this.formOrder.querySelector('[name="address"]') as HTMLInputElement;
        return addressInput?.value.length > 3;
    }
}

