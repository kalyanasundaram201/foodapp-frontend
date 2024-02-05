import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

function ShoppingCartIcon(props) {
  return (
    <div className="shopping-cart-icon" data-count={props['data-count']}>
      <FontAwesomeIcon icon={faShoppingCart} size="2x" />
    </div>
  );
}

export default ShoppingCartIcon