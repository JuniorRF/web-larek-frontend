import './scss/styles.scss';

import { ProductApi } from './components/apiProducts';
import { ProductModel } from './components/model';
import { API_URL, CDN_URL } from './utils/constants';
import { Api } from './components/base/api';
import { ProductView } from './components/views/viewProduct';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from './components/base/events';
import { PageView } from './components/views/viewPage';


const templateOrderSuccess = document.querySelector('#success') as HTMLTemplateElement;
const templateCard = document.querySelector('#card-catalog') as HTMLTemplateElement;
const templateCardPreview = document.querySelector('#card-preview') as HTMLTemplateElement;
const templateCardBasket = document.querySelector('#card-basket') as HTMLTemplateElement;
const templateBasket = document.querySelector('#basket') as HTMLTemplateElement;
const templateOrder = document.querySelector('#order') as HTMLTemplateElement; 
const templateContacts = document.querySelector('#contacts') as HTMLTemplateElement;   



const btnProfile = document.querySelector('.modal_active');
btnProfile.classList.remove('modal_active');

// const products = new ProductView(cloneTemplate(templateCard))

const events = new EventEmitter();
const productModel = new ProductModel(events);
const pageView = new PageView(document.querySelector('.page__wrapper') as HTMLElement);

const api = new ProductApi(API_URL, CDN_URL)
api.getProducts().then((data)=>{
    productModel.setProducts(data);
    
    console.log(productModel);
})
.catch((err)=>{
    console.error(err);
});

const apiImage = new Api(CDN_URL);
apiImage.get('/images').then((data)=>{
    console.log(data);
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
//     "price": 100
// }
// gallery.append(card.render(obj));


// new Product(cloneTemplate(templateCard)).render()

events.on('products:loaded', () => {
    const productsArray = productModel.getProducts()
        .map(item => new ProductView(cloneTemplate(templateCard)).render(item));
    console.log(productsArray);
    pageView.render({
        productslist: productsArray,
        basketCount: 0
    });
});


