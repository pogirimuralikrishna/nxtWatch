import {useState} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [selectedPayment, setSelectedPayment] = useState('')
  const [orderPlaced, setOrderPlaced] = useState(false)

  const handleCheckoutClick = () => {
    setShowPopup(true)
  }

  const handlePaymentChange = event => {
    setSelectedPayment(event.target.value)
  }

  const handleConfirmOrder = () => {
    if (selectedPayment === 'cod') {
      setOrderPlaced(true)
      setShowPopup(false)
    }
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <button
                type="button"
                className="checkout-button d-sm-none"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
            <button
              type="button"
              className="checkout-button d-lg-none"
              onClick={handleCheckoutClick}
            >
              Checkout
            </button>

            {showPopup && (
              <div className="payment-popup">
                <div className="popup-content">
                  <h2>Select Payment Method</h2>
                  <p>Items: {cartList.length}</p>
                  <p>Total Price: Rs {total}/-</p>
                  <div className="payment-options">
                    <label>
                      <input type="radio" value="card" disabled /> Card
                    </label>
                    <label>
                      <input type="radio" value="netbanking" disabled /> Net
                      Banking
                    </label>
                    <label>
                      <input type="radio" value="upi" disabled /> UPI
                    </label>
                    <label>
                      <input type="radio" value="wallet" disabled /> Wallet
                    </label>
                    <label>
                      <input
                        type="radio"
                        value="cod"
                        onChange={handlePaymentChange}
                      />{' '}
                      Cash on Delivery
                    </label>
                  </div>
                  <button
                    type="button"
                    className="confirm-button"
                    onClick={handleConfirmOrder}
                    disabled={selectedPayment !== 'cod'}
                  >
                    Confirm Order
                  </button>
                  <button
                    type="button"
                    className="close-button"
                    onClick={() => setShowPopup(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {orderPlaced && (
              <p className="success-message">
                Your order has been placed successfully
              </p>
            )}
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
