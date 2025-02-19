import { Modal } from "./modal";
import { IProductItem } from "../../types";
import { ensureElement, cloneTemplate } from "../../utils/utils";

interface IProductPreview extends IProductItem {
    button: HTMLButtonElement;
}

export class ProductModal extends Modal {
    private buttonBuy: HTMLButtonElement;
    private title: HTMLElement;
    private image: HTMLImageElement;
    private description: HTMLElement;
    private price: HTMLElement;
    private category: HTMLElement;

    public show(product: IProductItem, template: HTMLTemplateElement): void {
        // Клонируем шаблон и добавляем в модальное окно
        const content = cloneTemplate(template);
        this.setContent(content);

        // Инициализируем элементы
        this.title = ensureElement<HTMLElement>('.card__title', this.content);
        this.image = ensureElement<HTMLImageElement>('.card__image', this.content);
        this.description = ensureElement<HTMLElement>('.card__text', this.content);
        this.price = ensureElement<HTMLElement>('.card__price', this.content);
        this.category = ensureElement<HTMLElement>('.card__category', this.content);
        this.buttonBuy = ensureElement<HTMLButtonElement>('.card__button', this.content);

        // Заполняем данными
        this.title.textContent = product.title;
        this.image.src = product.image;
        this.description.textContent = product.description;
        this.price.textContent = `${product.price} синапсов`;
        this.category.textContent = product.category;
        this.disableButton = product.price;

        // Добавляем обработчик на кнопку покупки
        this.buttonBuy.addEventListener('click', () => {
            this.events.emit('product:add', { id: product.id });
        });

        this.open();
    }

    set disableButton(value: number) {
        if(!value) {
            this.buttonBuy.disabled = true;
        } else {
            this.buttonBuy.disabled = false;
        }
    }
}