export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {

};

export enum EVENTS_ENUM {
    PRODUCTS_LOADED = 'products:loaded',
    CARD_SELECT = 'card:select',
    PRODUCT_ADD = 'product:add',
    CART_OPEN = 'cart:open',
    ORDER_SUBMIT = 'order:submit',
    CART_DELETE_ITEM = 'cart:deleteItem',
    CART_BUY = 'cart:buy',
    CONTACTS_SUBMIT = 'contacts:submit',
    SUCCESS_OK = 'success:ok',
}