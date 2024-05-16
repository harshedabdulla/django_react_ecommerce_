import React, { useState, useEffect } from 'react'
import axios from 'axios'
import HeroBanner from '../components/HeroBanner'
import { Link } from 'react-router-dom'
import useRazorpay from 'react-razorpay'

function CartItem() {
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [Razorpay] = useRazorpay()

  const paynow = () => {
    const response = axios.post('/orders/order-create/') //ith fix cheyynm
    const data = response.data
    console.log(response.data)
    var options = {
      key: data.razorpay_merchant_key,

      amount: data.cost,
      currency: 'INR',

      name: 'Dj Razorpay',

      order_id: data.razorpay_order_id,
      callback_url: 'http://localhost:3000/',
    }

    var rzp1 = new Razorpay(options)

    rzp1.open()
  }

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true)
      try {
        const response = await axios.get('/cart/cart')
        setCartItems(response.data)
        setLoading(false)
      } catch (error) {
        setError('Error fetching cart items')
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [])

  return (
    <div className="px-4">
      <HeroBanner title={'Shopping Cart'} subheading={'Home - Shop'} />
      {loading ? (
        <div className="text-center mt-4 text-gray-700">Loading...</div>
      ) : error ? (
        <div className="text-center mt-4 text-red-700">{error}</div>
      ) : cartItems.length === 0 ? (
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
            <button onClick={paynow}>Order</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem
