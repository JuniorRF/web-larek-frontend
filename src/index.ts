import { ProductApi } from './components/apiProducts';
import { ProductModel } from './components/model';
import './scss/styles.scss';
import { Api } from './components/base/api';
import { API_URL } from './utils/constants';

const cardTemplate = document.querySelector('#success');
console.log(cardTemplate)

const btnProfile = document.querySelector('.modal_active');

console.log(btnProfile)
btnProfile.classList.remove('modal_active');

const productModel = new ProductModel();

const api = new ProductApi(API_URL)
api.getProducts().then((data)=>{
    productModel.setProducts(data)
    console.log(productModel);
})
.catch((err)=>{
    console.error(err);
});



