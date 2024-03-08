import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import UserProgresscontext from '../store/UserProgressContext';
import useHttp from '../hooks/useHttp';
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import Error from './Error';

const requestConfig = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
}

export default function Checkout() {

    const CartCtx = useContext(CartContext);
    const cartTotal = CartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price,
        0
    )

    const userProgressCtx = useContext(UserProgresscontext);

    function handleModalHide() {
        userProgressCtx.hideCheckout();
    }

    function handleFinish(){
        userProgressCtx.hideCheckout();
        CartCtx.clearCart();
        clearData();
    }

    const { data, isLoading: isSending, error, sendRequest, clearData } = useHttp('http://localhost:3000/orders', requestConfig);

    function handleSubmit(e) {
        e.preventDefault();
        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        // fetch("http://localhost:3000/orders",{
        //     method:'POST',
        //     headers:{'Content-Type':'application/json'},
        //     body:JSON.stringify({
        //        order:{
        //             items:CartCtx.items,
        //             customer:customerData
        //         } 
        //     })
        // })

        sendRequest(JSON.stringify({
            order: {
                items: CartCtx.items,
                customer: customerData
            },
        }));

    }

    let actions = (
    <>
        <Button type='button' onClick={handleModalHide}>Close</Button>
        <Button>Submit Order</Button>
    </>
    )

    if(isSending){
         actions = (<span>Sending Oreder...</span>)
    }

    if(data){
    return  <Modal className='checkout' open={userProgressCtx.progress === 'checkout'} onClose={handleModalHide}>
          <h2>Success!</h2>
          <p>Your oredr was submitted successfully</p>
          <p>we will get back to you with more details via email</p>
          <Button type='button' onClick={handleFinish}>Okay</Button>
    </Modal>    
    }

    return (
        <Modal className='checkout' open={userProgressCtx.progress === 'checkout'} onClose={handleModalHide}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label="Full Name" type="text" id='name' />
                <Input label="E-mail Address" type="email" id='email' />
                <Input label="Street" type="text" id='street' />
                <div className='control-row'>
                    <Input label="Postal Code" type="text" id='postal-code' />
                    <Input label="city" type="text" id='city' />
                </div>
{/*                 {error && <Error title='Failed to submit order' message={error}/>} */}
                <p className='modal-actions'> {actions}</p>
            </form>
        </Modal>
    )
}
