import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import useRazorpay from 'react-razorpay'
import { Link } from 'react-router-dom'
import HeroBanner from '../components/HeroBanner'
import {
  CREATE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
  CARD_CREATE_RESET,
} from '../constants'

function CartItem({ history, match }) {
  const dispatch = useDispatch()
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [Razorpay] = useRazorpay()
  const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    // Retrieve user info from localStorage when the component mounts
    const storedUserInfo = localStorage.getItem('userInfo')
    console.log('Stored userInfo:', storedUserInfo)
    if (storedUserInfo) {
      console.log('Parsed userInfo:', JSON.parse(storedUserInfo))
      setUserInfo(JSON.parse(storedUserInfo))
    } else {
      setIsLoggedIn(false)
    }
  }, []) // Only run this effect once when the component mounts

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true)
      try {
        if (!userInfo) {
          // User not logged in, show message
          return
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
        console.log('config:', config)
        console.log('userInfo:', userInfo)
        // Fetch cart items from local storage
        const storedCartItems = localStorage.getItem('cartItems')
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems))
        }
        // Fetch latest cart items from the server
        const response = await axios.get('/cart/cart', config)
        const data = response.data
        setCartItems(data)
        setLoading(false)
      } catch (error) {
        setError('Error fetching cart items')
        setLoading(false)
      }
    }

    if (userInfo) {
      fetchCartItems()
    }
  }, [userInfo]) // Run this effect whenever userInfo changes

  useEffect(() => {
    // Retrieve cart items from local storage when the component mounts
    const storedCartItems = localStorage.getItem('cartItems')
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems))
    }
  }, []) // Empty dependency array ensures this effect runs only once when the component mounts

  useEffect(() => {
    // Store cart items in local storage whenever they change
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems]) // This effect runs whenever cartItems change

  const paynow = async () => {
    try {
      if (!userInfo) {
        console.error('logged in user found')
        // You can redirect the user to the login page or show a message here
        return
      }
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      const response = await axios.post('/orders/order-create/', {}, config)
      const data = response.data
      console.log(response.data)
      const options = {
        key: data.razorpay_merchant_key,
        amount: data.cost,
        currency: 'INR',
        name: 'ecommerce application',
        order_id: data.razorpay_order_id,
        callback_url: 'http://localhost:3000/',
      }

      const rzp1 = new Razorpay(options)
      rzp1.open()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className="px-4">
      <HeroBanner title={'Shopping Cart'} subheading={'Home - Shop'} />
      {!isLoggedIn ? (
        <div className="text-center mt-4 text-red-700">User not logged in</div>
      ) : loading ? (
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
              <div className="col-span-1 ml-auto">Price</div>
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
              <div className="font-bold">₹{item.price}</div>
            </div>
          ))}
          <Link to="/shop" className="text-blue-500 mt-4">
            <div className="font-bold text-gray-700 bg-gray-200 w-fit p-2 px-4 mt-4 rounded-none">
              CONTINUE SHOPPING
            </div>
          </Link>
          {/* Cart total */}
          <div className="my-4 bg-gray-200 w-1/4 p-2 px-4">
            <p className="mt-2 text-xl font-bold text-gray-800">Cart Total</p>
            <div className="flex justify-between mt-4">
              <p className="text-gray-600 text-lg">Total price: </p>
              <p className="text-lg font-bold text-red-500">
                ₹{cartItems.reduce((acc, item) => acc + item.price * 1, 0)}
              </p>
            </div>
            <Link to="/checkout" className="text-blue-500 mt-4">
              <button className="bg-blue-500 px-4 py-1 text-white justify-end mt-4 mb-2 w-full rounded-none">
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartItem
