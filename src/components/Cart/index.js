import React from 'react';
import { CartWrapper } from './styles';
import { FaShoppingCart } from 'react-icons/fa';

export const Cart = () => {
  return (
    <CartWrapper>
      <FaShoppingCart size="1.5em" />
    </CartWrapper>
  );
};
