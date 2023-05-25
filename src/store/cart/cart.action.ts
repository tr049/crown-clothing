import {ActionWithPayLoad, createAction, withMatcher} from "../../utils/reducer/reducer.utils";
import {CART_ACTION_TYPES, CartItem} from "./cart.types";
import {CategoryItem} from "../categories/categories.types";

const addCartItem = (cartItems: CartItem[], productToAdd: CategoryItem): CartItem[] => {

    if (!cartItems) {
        return cartItems;
    }

    const existingCartItem = cartItems.find(cartItem =>  cartItem.id === productToAdd.id);

    if (existingCartItem) {
        return cartItems.map(cartItem => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1 }: cartItem );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems: CartItem[], productToRemove: CategoryItem): CartItem[] => {

    if (!cartItems) {
        return cartItems;
    }

    const existingCartItem = cartItems.find(cartItem =>  cartItem.id === productToRemove.id);

    if (existingCartItem && existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToRemove.id);
    }

    return cartItems.map(cartItem => cartItem.id === productToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1 }: cartItem );
};

const clearCartItem = (cartItems: CartItem[], productToClear: CartItem): CartItem[] => {
    if (!cartItems) {
        return cartItems;
    }
    return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
};

export type SetIsCartOpen = ActionWithPayLoad<CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean>;
export type SetCartItems = ActionWithPayLoad<CART_ACTION_TYPES.SET_CART_ITEMS, CartItem[]>;

export const setIsCartOpen = withMatcher((boolean: boolean): SetIsCartOpen => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean));

export const setCartItems = withMatcher((cartItems: CartItem[]) =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);
export const addItemToCart = withMatcher((cartItems: CartItem[], productToAdd: CategoryItem): SetCartItems => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
})

export const removeItemFromCart = withMatcher((cartItems: CartItem[], productToRemove: CartItem): SetCartItems => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
})

export const clearItemFromCart = withMatcher((cartItems: CartItem[], productToClear: CartItem): SetCartItems => {
    const newCartItems = clearCartItem(cartItems, productToClear);
    return setCartItems(newCartItems);
})

