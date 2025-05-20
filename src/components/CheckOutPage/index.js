import './index.css'
import Header from '../Header'

const CheckOutPage = () => (
  <>
    <Header />
    <div className="checkout-container">
      <img
        src="https://static.vecteezy.com/system/resources/thumbnails/025/210/773/small_2x/check-mark-icon-transparent-background-checkmark-icon-approved-symbol-confirmation-sign-design-elements-checklist-positive-thinking-sign-correct-answer-verified-badge-flat-icon-png.png"
        alt="confirmed"
        className="checkout-confirmed-img"
      />
      <h1 className="checkout-heading">Order Confirmed</h1>
    </div>
  </>
)

export default CheckOutPage
