import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  ordersList: [],
  addOrder: () => {},
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
})

export default CartContext
