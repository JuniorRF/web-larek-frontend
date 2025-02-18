import './scss/styles.scss';

import { ProductApi } from './components/apiProducts';
import { ProductModel } from './components/model';
import { API_URL, CDN_URL } from './utils/constants';
import { Api } from './components/base/api';
import { ProductView } from './components/views/viewProduct';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { PageView } from './components/views/viewPage';
import { ProductPreview } from './components/views/productPreview';


const modalContainer = document.querySelector('#modal-container') as HTMLElement;

const templateOrderSuccess = document.querySelector('#success') as HTMLTemplateElement;
const templateCard = document.querySelector('#card-catalog') as HTMLTemplateElement;
const templateCardPreview = document.querySelector('#card-preview') as HTMLTemplateElement;
const templateCardBasket = document.querySelector('#card-basket') as HTMLTemplateElement;
const templateBasket = document.querySelector('#basket') as HTMLTemplateElement;
const templateOrder = document.querySelector('#order') as HTMLTemplateElement; 
const templateContacts = document.querySelector('#contacts') as HTMLTemplateElement;   



// const btnProfile = document.querySelector('.modal_active');
// btnProfile.classList.remove('modal_active');


const events = new EventEmitter();
const productModel = new ProductModel(events);
const pageView = new PageView(document.querySelector('.page__wrapper') as HTMLElement, events);

const api = new ProductApi(API_URL, CDN_URL)
api.getProducts().then((data)=>{
    productModel.setProducts(data);
})
.catch((err)=>{
    console.error(err);
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

events.on('products:loaded', () => {
    const productsArray = productModel.getProducts()
        .map(item => new ProductView(cloneTemplate(templateCard), events).render(item));
    console.log(productsArray);
    pageView.render({
        productslist: productsArray,
        basketCount: 0
    });
});

events.on('card:select', (data) => {console.log(data)});
events.on('basket:click', () => console.log('basket:click'));
