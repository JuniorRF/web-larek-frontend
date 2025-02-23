import { ensureElement } from "../../utils/utils";
import { Modal } from "./modal";

export class ContactsModal extends Modal {
    protected buttonSubmit: HTMLButtonElement;
    protected formContacts: HTMLFormElement;
    protected emailError: HTMLElement;
    protected phoneError: HTMLElement;

    show(template: HTMLTemplateElement): void {
        this.setContent(template);
        
        this.buttonSubmit = ensureElement<HTMLButtonElement>('.button', this.content);
        this.formContacts = ensureElement<HTMLFormElement>('form[name="contacts"]', this.content);
        this.emailError = ensureElement<HTMLElement>('.form__errors_email', this.content);
        this.phoneError = ensureElement<HTMLElement>('.form__errors_phone', this.content);

        this.formContacts.addEventListener('input', (event: Event) => {
            const input = event.target as HTMLInputElement;
            if (input.name === 'email') {
                this.validateEmail(input);
            }
            if (input.name === 'phone') {
                this.validatePhone(input);
            }
            this.setDisabled(this.buttonSubmit, !this.isFormValid());
        });

        this.formContacts.addEventListener('submit', (event: Event) => {
            event.preventDefault();
            this.events.emit('contacts:submit', {
                email: this.formContacts.email.value,
                phone: this.formContacts.phone.value
            });

        });

        // this.open();
    }

    protected validateEmail(input: HTMLInputElement): void {
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value);
        this.setText(this.emailError, !input.value ? 'Необходимо указать email' : 
            !isValid ? 'Неверный формат email' : '');
    }

    protected validatePhone(input: HTMLInputElement): void {
        const phoneDigits = input.value.replace(/\D/g, '');
        this.setText(this.phoneError, !input.value ? 'Необходимо указать телефон' : 
            phoneDigits.length !== 11 ? 'Неверный формат телефона' : '');
    }

    protected isFormValid(): boolean {
        const emailInput = this.formContacts.querySelector('input[name="email"]') as HTMLInputElement;
        const phoneInput = this.formContacts.querySelector('input[name="phone"]') as HTMLInputElement;
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput.value);
        const phoneDigits = phoneInput.value.replace(/\D/g, '');
        const phoneValid = phoneDigits.length === 11;
        return emailValid && phoneValid;
    }
}


