import { ensureAllElements, ensureElement } from "../../utils/utils";
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
        

        this.payment.forEach(button => {
            button.addEventListener('click', () => {
                this.payment.forEach(item => this.toggleClass(item, 'button_alt-active', item === button));
            });
        });

        this.formOrder.addEventListener('input', (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.name === 'address') {
                this.validateAddress(input);
            }
            this.setDisabled(this.buttonSubmit, !this.isFormValid());
        });
      
        this.formOrder.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('order:submit', {
                payment: this.payment.find(item => item.classList.contains('button_alt-active')).name,
                address: this.formOrder.address.value
            });
        });
    }

    protected validateAddress(input: HTMLInputElement): void {
        const isValid = input.value.length > 3;
            this.setText(this.addressError, !input.value ? 'Необходимо указать адрес' : 
                !isValid ? 'Адрес должен быть не менее 3 символов' : '');
    }

    protected setPaymentMethod(method: string): void {
        this.payment.forEach(item => {
            this.toggleClass(item, 'button_alt-active', item.name === method);
        });
    }

    protected isFormValid(): boolean {
        return this.formOrder.address.value.length > 3;
    }
}

