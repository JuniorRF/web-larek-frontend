import { Modal } from "./modal";
import { IProductItem } from "../../types";
import { ensureElement, cloneTemplate } from "../../utils/utils";


export class ProductModal extends Modal {
    private buttonBuy: HTMLButtonElement;
    private title: HTMLElement;
    private image: HTMLImageElement;
    private description: HTMLElement;
    private price: HTMLElement;
    private category: HTMLElement;

    public show(product: IProductItem, template: HTMLTemplateElement): void {
        this.setContent(template);

        this.title = ensureElement<HTMLElement>('.card__title', this.content);
        this.image = ensureElement<HTMLImageElement>('.card__image', this.content);
        this.description = ensureElement<HTMLElement>('.card__text', this.content);
        this.price = ensureElement<HTMLElement>('.card__price', this.content);
        this.category = ensureElement<HTMLElement>('.card__category', this.content);
        this.buttonBuy = ensureElement<HTMLButtonElement>('.card__button', this.content);

        this.title.textContent = product.title;
        this.image.src = product.image;
        this.description.textContent = product.description;
        this.price.textContent = `${product.price} синапсов`;
        this.cardCategory = product.category;
        this.disableButton = product.price;

        this.buttonBuy.addEventListener('click', () => {
            this.events.emit('product:add', { id: product.id });
            this.close();
        });

        this.open();
    }

    set cardCategory(value: string) {
        this.category.textContent = value;
        const className = 'card__category card__category_'
        switch(value) {
            case 'дополнительное':
                this.category.className = className + 'additional';
                break;
            case 'софт-скил':
                this.category.className = className + 'soft';
                break;
            case 'кнопка':
                this.category.className = className + 'button';
                break;
            case 'хард-скил':
                this.category.className = className + 'hard';
                break;
            case 'другое':
                this.category.className = className + 'other';
                break;
        }

    }


    set disableButton(value: number) {
        if(!value) {
            this.buttonBuy.disabled = true;
        } else {
            this.buttonBuy.disabled = false;
        }
    }

    
}