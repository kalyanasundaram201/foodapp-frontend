import React, { useContext } from 'react'
import logo from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext';
import UserProgresscontext from '../store/UserProgressContext';
import ShoppingCartIcon from './UI/ShoppingCartIcon';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const cartItemTotal = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0)

    const userProgressCtx = useContext(UserProgresscontext);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        <header id='main-header'>
            <div id='title'>
                <img src={logo} alt="logo" />
                <h1>TasteTrove Restaurent</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    <ShoppingCartIcon data-count={cartItemTotal} />
                </Button>
            </nav>
        </header>

    )
}
