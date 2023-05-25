import {CategoryItem} from "../categories/categories.types";

export enum CART_ACTION_TYPES {
    SET_CART_ITEMS = 'CART/SET_CART_ITEMS',
    SET_IS_CART_OPEN = 'CART/SET_IS_CART_OPEN',
    SET_CART_COUNT = 'CART/SET_CART_COUNT',
    SET_CART_TOTAL = 'CART/SET_CART_TOTAL'
}


export type CartItem = CategoryItem & {
    quantity: number;
}
