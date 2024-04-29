import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HeroBanner from '../components/HeroBanner'
import { Link } from 'react-router-dom'
function CartItem() {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/cart/cart')
        setCartItems(response.data)
        console.log('Cart items:', response.data)
      } catch (error) {
        console.error('Error fetching cart items:', error)
      }
    }

    fetchCartItems()
  }, [])

  return (
    <div className="px-4">
      <HeroBanner title={'Shopping Cart'} subheading={'Home - Shop'} />
      {cartItems.length === 0 ? (
        <div className="text-center mt-4 text-gray-700">Cart is empty</div>
      ) : (
        <div className="mt-8">
          <div className="border-b-2 border-gray-200 pb-2">
            <div className="grid grid-cols-2 gap-4 font-bold">
              <div className="col-span-1">Product</div>
              <div className="col-span-1">Price</div>
            </div>
          </div>
          <hr className="my-4" />
          {/* Display cart items */}
          {cartItems.map((item) => (
            <div
              className="flex justify-between items-center py-2 border-b border-gray-200"
              key={item.id}
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 mr-4 rounded-md object-cover"
                />
                <div>{item.name}</div>
              </div>
              <div className="font-bold">${item.price}</div>
            </div>
          ))}
          <Link to="/shop" className="text-blue-500 mt-4">
            <div className="font-bold text-gray-700 bg-gray-200 w-fit p-2 px-4 mt-4 rounded-none">
              CONTINUE SHOPPING
            </div>
          </Link>
          {/* Cart total */}

          <div className=" my-4 bg-gray-200 w-1/4 p-2 px-4">
            {/* Calculate and display total price */}
            <p className="mt-2 text-xl font-bold text-gray-800">Cart Total</p>
            <div className="flex justify-between mt-4">
              <p className="text-gray-600 text-lg">Total price: </p>
              <p className="text-lg font-bold text-red-500">
                ${cartItems.reduce((acc, item) => acc + item.price * 1, 0)}
              </p>
            </div>
            <Link to="/product/checkout/">
              <button className="bg-blue-500 font-bold text-white my-4 w-full py-2">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem
