import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";

export class Modal {
    protected closeButton: HTMLButtonElement;
    protected content: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        // Находим элементы внутри контейнера
        this.closeButton = container.querySelector('.modal__close') as HTMLButtonElement;
        this.content = container.querySelector('.modal__content') as HTMLElement;

        // Обработчики событий
        this.closeButton.addEventListener('click', this.close.bind(this));
        this.container.addEventListener('click', this.close.bind(this));
        this.container.querySelector('.modal__container').addEventListener('click', 
            (event) => event.stopPropagation()
        );
    }

    // Установка контента
    protected setContent(content: HTMLElement): void {
        this.content.replaceChildren(content);
    }

    // Открытие модального окна
    open(): void {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
    }

    // Закрытие модального окна
    close(): void {
        this.container.classList.remove('modal_active');
        this.content.replaceChildren();
        this.events.emit('modal:close');
    }
    // show(data: unknown, template: HTMLTemplateElement): void {
    //     const content = cloneTemplate(template);
        // this.setContent(content);
        // this.open();
    // }
}