import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

interface IPageView {
    productslist: HTMLElement[];
    basketCount: number;
}


export class PageView extends Component<IPageView> {
    protected productsContainer: HTMLElement;
    protected basketElement: HTMLElement;

    constructor(container: HTMLElement) {
        super(container);
        this.productsContainer = ensureElement('.gallery', this.container);
        this.basketElement = ensureElement('.header__basket', this.container);
    }

    render(data: { productslist: HTMLElement[], basketCount: number }): HTMLElement {
        // Очищаем и добавляем продукты
        this.productsContainer.innerHTML = '';
        this.productsContainer.append(...data.productslist);
        
        // Обновляем счетчик корзины
        this.basketElement.textContent = data.basketCount.toString();
        
        return this.container;
    }
}