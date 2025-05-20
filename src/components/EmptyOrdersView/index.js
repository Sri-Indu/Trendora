import {Link} from 'react-router-dom'

import './index.css'

const EmptyOrdersView = () => (
  <div className="orders-page-empty-view-container">
    <img
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
      className="orders-empty-img"
      alt="cart empty"
    />
    <h1 className="orders-empty-heading">No Orders</h1>

    <Link to="/cart">
      <button type="button" className="go-to-cart-btn">
        Go To Cart
      </button>
    </Link>
  </div>
)

export default EmptyOrdersView
