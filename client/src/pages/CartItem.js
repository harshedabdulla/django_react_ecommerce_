import React, { useState, useEffect } from 'react'
import axios from 'axios'

function CartItem() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart') // Replace '/api/cart' with your actual API endpoint
        setCartItems(response.data.cartItems) // Assuming the response contains cart items
      } catch (error) {
        console.error('Error fetching cart items:', error)
        // Handle error
      }
    }

    fetchCartItems() // Fetch cart items when component mounts
  }, [])

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div>Cart is empty</div>
      ) : (
        <div>
          {/* Display cart items */}
          {cartItems.map((item) => (
            <div key={item.id}>
              <p>
                {item.name} - Quantity: {item.quantity}
              </p>
              {/* Other product details like price, image, etc. */}
            </div>
          ))}
          {/* Calculate and display total price */}
          <p>
            Total Price:{' '}
            {cartItems.reduce(
              (acc, item) => acc + item.price * item.quantity,
              0
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default CartItem
