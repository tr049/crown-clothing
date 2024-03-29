import './checkout-item.styles.scss';
import {useDispatch, useSelector} from "react-redux";
import {selectCartItems} from "../../store/cart/cart.selector";
import {addItemToCart, clearItemFromCart, removeItemFromCart} from "../../store/cart/cart.action";
import {CartItemModel} from "../../store/cart/cart.types";
import {FC} from "react";

export type CheckoutItemProps = {
    cartItem: CartItemModel;
}

const CheckoutItem: FC<CheckoutItemProps> = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;

    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearCartItemHandler = () => {
        dispatch(clearItemFromCart(cartItems, cartItem));
    }

    const addItemHandler = () => {
        dispatch(addItemToCart(cartItems, cartItem));
    }

    const removeItemHandler = () => {
        dispatch(removeItemFromCart(cartItems, cartItem));
    }

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`} />
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeItemHandler}>
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addItemHandler}>
                    &#10095;
                </div>
            </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={clearCartItemHandler}>&#10005;</span>
        </div>
    );
}

export default CheckoutItem;
