import './index.css'
import Header from '../Header'
import EmptyOrdersView from '../EmptyOrdersView'
import CartContext from '../../context/CartContext'

const OrdersPage = () => (
  <CartContext.Consumer>
    {value => {
      const {ordersList} = value
      const showEmptyView = ordersList.length === 0

      return (
        <>
          <Header />
          <div className="orders-container">
            {showEmptyView ? (
              <EmptyOrdersView />
            ) : (
              <div className="orders-content-container">
                <h1 className="orders-heading">My Orders</h1>
                <p>No of Orders : {ordersList.length}</p>
                {/* Implement the Component to render orders with options like change address, cancel, etc... */}
              </div>
            )}
          </div>
        </>
      )
    }}
  </CartContext.Consumer>
)

export default OrdersPage
