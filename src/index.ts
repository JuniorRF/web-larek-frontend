import './scss/styles.scss';

import { ProductApi } from './components/apiProducts';
import { ProductModel } from './components/models/product';
import { API_URL, CDN_URL, EVENTS_ENUM } from './utils/constants';
import { ProductView } from './components/views/viewProduct';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { PageView } from './components/views/viewPage';
import { IApiOrder, paymentMethod } from './types';
import { Modal } from './components/views/modal';
import { Cart, CartModal, ProductsToCart } from './components/views/cart';
import { OrderModal } from './components/views/order';
import { UserModel } from './components/models/user';
import { ContactsModal } from './components/views/contacts';
import { SuccessModal } from './components/views/success';
import { ProsuctForModal } from './components/views/productModal';


const templateCard = document.querySelector('#card-catalog') as HTMLTemplateElement;

const modalContainer = document.querySelector('#modal-container') as HTMLElement;

const templateOrderSuccess = document.querySelector('#success') as HTMLTemplateElement;
const templateCardPreview = document.querySelector('#card-preview') as HTMLTemplateElement;
const templateCardBasket = document.querySelector('#card-basket') as HTMLTemplateElement;
const templateBasket = document.querySelector('#basket') as HTMLTemplateElement;
const templateOrder = document.querySelector('#order') as HTMLTemplateElement; 
const templateContacts = document.querySelector('#contacts') as HTMLTemplateElement;


const events = new EventEmitter();
const productModel = new ProductModel(events);
const pageView = new PageView(document.querySelector('.page__wrapper') as HTMLElement, events);
const modal = new Modal(modalContainer, events);
const cart = new Cart(document.querySelector('.header__container') as HTMLElement, events);
const cartModal = new CartModal(modalContainer, events);
const orderModal = new OrderModal(modalContainer, events);
const userData = new UserModel();
const contactsModal = new ContactsModal(modalContainer, events);
const successModal = new SuccessModal(modalContainer, events);

const api = new ProductApi(API_URL, CDN_URL)
api.getProducts().then((data)=>{
    productModel.setProducts(data);
})
.catch((err)=>{
    console.error(err);
});


events.on(EVENTS_ENUM.PRODUCTS_LOADED, () => {
    const productsArray = productModel.getProducts()
        .map(item => new ProductView(cloneTemplate(templateCard), events).render(item));
    
    pageView.render({
        productslist: productsArray,
    });
});


events.on(EVENTS_ENUM.CARD_SELECT, (data: {id: string}) => {
    const item = productModel.getProduct(data.id);
    const product = new ProsuctForModal(cloneTemplate(templateCardPreview), events, item.price).render(item);
    modal.setContentHTML(product);
    console.log(product);;
    modal.open();
});


events.on(EVENTS_ENUM.PRODUCT_ADD, (item: { id: string }) => {
    productModel.addToBuyProducts(item.id);
    console.log('product:add', item);
    cart.basketCount = productModel.getBuyProductsCount();
    modal.close();
});


events.on(EVENTS_ENUM.CART_OPEN, () => {
    const products = productModel.getBuyProducts().map((item, idx) => ({...item, index: idx + 1}));
    const productsToCart = products.map((item, idx) => 
        new ProductsToCart(cloneTemplate(templateCardBasket), events).render(item)
    );
    const fullPrice = productModel.getFullPrice();
    cartModal.show(productsToCart, templateBasket, fullPrice);
});


events.on(EVENTS_ENUM.CART_DELETE_ITEM, (data: {id: string}) => {
    productModel.deleteFromBuyProducts(data.id);
    cart.basketCount = productModel.getBuyProductsCount();
});


events.on(EVENTS_ENUM.CART_BUY, () => {
    orderModal.show(templateOrder);
});


events.on('order:submit', (data: {payment: paymentMethod, address: string}) => {
    userData.setPayment(data.payment);
    userData.setAddress(data.address);
    contactsModal.show(templateContacts);
});


events.on(EVENTS_ENUM.CONTACTS_SUBMIT, (data: {email: string, phone: string}) => {
    userData.setEmail(data.email);
    userData.setTelephone(data.phone);
    const order: IApiOrder = {
        ...userData,
        items: productModel.getBuyForApi(),
        total: productModel.getFullPrice(),
    };
    api.postOrder(order).then(()=>{
        successModal.show(templateOrderSuccess, productModel.getFullPrice());
    })
    .catch((err)=>{
        console.error(err);
    });
});


events.on(EVENTS_ENUM.SUCCESS_OK, () => {
    productModel.clearBuyProducts();
    cart.basketCount = productModel.getBuyProductsCount();
    modal.close();
});


































// const gallery = document.querySelector('.gallery') as HTMLElement;
// const card = new ProductView(cloneTemplate(templateCard));
// const obj = {
//     "id": '1',
//     "description": 'test',
//     "image": './images/Subtract.svg',
//     "title": 'test',
//     "category": 'test',
//     "price": 100,
//     // добавленые поля
//     "text": 'text',
//     "button": 'buy',
// }
// gallery.append(card.render(obj));

// const productPreview = new ProductPreview(cloneTemplate(templateCardPreview));
// modalContainer.append(productPreview.render(obj));
// modalContainer.classList.add('modal_active');

// new Product(cloneTemplate(templateCard)).render()