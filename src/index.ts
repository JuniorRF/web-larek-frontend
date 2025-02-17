import { ProductApi } from './components/apiProducts';
import { ProductModel } from './components/model';
import './scss/styles.scss';
// import { Api } from './components/base/api';
import { API_URL } from './utils/constants';
import { ProductView } from './components/view';
import { cloneTemplate } from './utils/utils';
import { EventEmitter } from 'events';


const templateOrderSuccess = document.querySelector('#success') as HTMLTemplateElement;
const templateCard = document.querySelector('#card-catalog') as HTMLTemplateElement;
const templateCardPreview = document.querySelector('#card-preview') as HTMLTemplateElement;
const templateCardBasket = document.querySelector('#card-basket') as HTMLTemplateElement;
const templateBasket = document.querySelector('#basket') as HTMLTemplateElement;
const templateOrder = document.querySelector('#order') as HTMLTemplateElement; 
const templateContacts = document.querySelector('#contacts') as HTMLTemplateElement;   


// const cardTemplate = document.querySelector('#success');
// console.log(cardTemplate)
console.log(templateCard)

const btnProfile = document.querySelector('.modal_active');
btnProfile.classList.remove('modal_active');

// console.log(btnProfile)
const gallery = document.querySelector('.gallery')
const events = new EventEmitter();
const productModel = new ProductModel(events);
const products = new ProductView(cloneTemplate(templateCard))


const api = new ProductApi(API_URL)
api.getProducts().then((data)=>{
    productModel.setProducts(data);
    
    console.log(productModel);
})
.catch((err)=>{
    console.error(err);
});




