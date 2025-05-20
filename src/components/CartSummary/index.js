import {withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList, removeAllCartItems, addOrder} = value
      let totalAmount = 0
      cartList.map(eachItem => {
        totalAmount += eachItem.price * eachItem.quantity
        return true
      })
      const onClickCheckout = () => {
        const {history} = props
        history.push('/check-out')
        addOrder()
        removeAllCartItems()
      }
      return (
        <div className="cart-summary-container">
          <div>
            <h1 className="cart-summary-heading">
              Order Total: <span className="cart-amount">{totalAmount}/-</span>
            </h1>
            <p className="cart-summary-paragraph">
              {cartList.length} items in cart
            </p>
            <button
              type="button"
              className="cart-summary-checkout-button"
              onClick={onClickCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(CartSummary)
