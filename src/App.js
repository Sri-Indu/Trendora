import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import CheckOutPage from './components/CheckOutPage'
import OrdersPage from './components/OrdersPage'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    ordersList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  incrementCartItemQuantity = id => {
    const {cartList} = this.state

    const newCartList = cartList.map(eachItem => {
      if (id === eachItem.id) {
        return {
          availability: eachItem.availability,
          brand: eachItem.brand,
          description: eachItem.description,
          id: eachItem.id,
          imageUrl: eachItem.imageUrl,
          price: eachItem.price,
          rating: eachItem.rating,
          title: eachItem.title,
          totalReviews: eachItem.totalReviews,
          quantity: eachItem.quantity + 1,
        }
      }
      return eachItem
    })
    this.setState({cartList: newCartList})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state

    const newCartList = cartList.map(eachItem => {
      if (id === eachItem.id) {
        return {
          availability: eachItem.availability,
          brand: eachItem.brand,
          description: eachItem.description,
          id: eachItem.id,
          imageUrl: eachItem.imageUrl,
          price: eachItem.price,
          rating: eachItem.rating,
          title: eachItem.title,
          totalReviews: eachItem.totalReviews,
          quantity: eachItem.quantity - 1,
        }
      }
      return eachItem
    })
    const updatedCartList = newCartList.filter(eachItem => {
      if (eachItem.quantity > 0) {
        return true
      }
      return false
    })
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  addCartItem = product => {
    const {cartList} = this.state

    const isProductIncartList = cartList.filter(eachItem => {
      if (product.id === eachItem.id) {
        return true
      }
      return false
    })

    if (isProductIncartList.length === 0) {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    } else {
      const newCartList = cartList.map(eachItem => {
        if (product.id === eachItem.id) {
          return {
            availability: eachItem.availability,
            brand: eachItem.brand,
            description: eachItem.description,
            id: eachItem.id,
            imageUrl: eachItem.imageUrl,
            price: eachItem.price,
            rating: eachItem.rating,
            title: eachItem.title,
            totalReviews: eachItem.totalReviews,
            quantity: eachItem.quantity + product.quantity,
          }
        }
        return eachItem
      })
      this.setState({cartList: newCartList})
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state

    const newCartList = cartList.filter(eachItem => {
      if (id === eachItem.id) {
        return false
      }
      return true
    })
    this.setState({cartList: newCartList})
  }

  addOrder = () => {
    const {cartList} = this.state
    this.setState(prevState => ({
      ordersList: [...prevState.ordersList, cartList],
    }))
  }

  render() {
    const {cartList, ordersList} = this.state
    console.log(ordersList)
    return (
      <CartContext.Provider
        value={{
          cartList,
          ordersList,
          addOrder: this.addOrder,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/check-out" component={CheckOutPage} />
          <ProtectedRoute exact path="/your-orders" component={OrdersPage} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
