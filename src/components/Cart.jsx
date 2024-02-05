import React, { useContext } from 'react'
import CartContext from '../store/CartContext';
import UserProgresscontext from '../store/UserProgressContext';
import CartItem from './UI/CartItem';
import Modal from './UI/Modal';
import Button from './UI/Button';
import { currencyFormatter } from '../util/formatting';

export default function Cart() {
    const CartCtx = useContext(CartContext);
    const cartTotal = CartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    )
    const userProgressCtx = useContext(UserProgresscontext);
    
    function handleModalHide(){
        userProgressCtx.hideCart();
    }

    function GoToCheckout(){
        userProgressCtx.showCheckout();
    }
    
    return (
        <Modal className='cart' open={userProgressCtx.progress === 'cart'} 
        onClose={userProgressCtx.progress === 'cart'? handleModalHide : null}>
            <h2>Your Cart</h2>
            <ul>
                {CartCtx.items.map(item =>
                   <CartItem 
                   key={item.id} 
                   name={item.name} 
                   quantity={item.quantity} 
                   price={item.price} 
                   onIncreaseItem={()=>{CartCtx.addItem(item)}} 
                   onDecreaseItem={()=>{CartCtx.removeItem(item.id)}}/>)}
            </ul>
            <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
            <p className='modal-actions'>
                <Button textOnly onClick={handleModalHide}>Close</Button>
                {CartCtx.items.length > 0 && (<Button onClick={GoToCheckout}>Go To Checkout</Button>)}
            </p>
        </Modal>
    )
}
