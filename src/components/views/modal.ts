import { cloneTemplate } from "../../utils/utils";
import { IEvents } from "../base/events";
import { Component } from "../base/Component";
import { IModal } from "../../types";

export class Modal extends Component<IModal> {
    protected closeButton: HTMLButtonElement;
    protected content: HTMLElement;

    constructor(protected container: HTMLElement, protected events: IEvents) {
        super(container);
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

    _toggleModal(state: boolean = true) {
        this.toggleClass(this.container, 'modal_active', state);
    }
    // Обработчик в виде стрелочного метода, чтобы не терять контекст `this`
    _handleEscape = (evt: KeyboardEvent) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    };

    open() {
        this._toggleModal(); // открываем
        // навешиваем обработчик при открытии
        document.addEventListener('keydown', this._handleEscape);
        this.events.emit('modal:open');
    }

    close() {
        this._toggleModal(false); // закрываем
   // правильно удаляем обработчик при закрытии
        document.removeEventListener('keydown', this._handleEscape);
        // this.content = null;
        this.events.emit('modal:close');
    }
    // open(): void {
    //     this.container.classList.add('modal_active');
    // }

    // close(): void {
    //     this.container.classList.remove('modal_active');
    //     this.content.replaceChildren();
    // }
}