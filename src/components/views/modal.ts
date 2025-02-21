import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Modal {
    protected closeButton: HTMLButtonElement;
    protected content: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        this.closeButton = container.querySelector('.modal__close') as HTMLButtonElement;
        this.content = container.querySelector('.modal__content') as HTMLElement;

        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this.container.querySelector('.modal__container').addEventListener('click', 
            (event) => event.stopPropagation()
        );
    }

    protected setContent(content: HTMLTemplateElement): void {
        this.content.replaceChildren(cloneTemplate(content));
    }

    open(): void {
        this.container.classList.add('modal_active');
    }

    close(): void {
        this.container.classList.remove('modal_active');
        this.content.replaceChildren();
    }
}