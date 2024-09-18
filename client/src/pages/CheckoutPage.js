import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import useRazorpay from 'react-razorpay'
import HeroBanner from '../components/HeroBanner'
import { Link, useHistory } from 'react-router-dom'
import CreateAddressComponent from '../pages/CreateAddressComponent'
import { createUserAddress } from '../actions/userActions' // Import the action to create address

const CheckoutPage = () => {
  const dispatch = useDispatch()
  const history = useHistory() // Initialize useHistory
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userInfo, setUserInfo] = useState(null)
  const [Razorpay] = useRazorpay()
  const [address, setAddress] = useState({
    name: '',
    phone_number: '',
    house_no: '',
    landmark: '',
    city: '',
    state: '',
    pin_code: '',
  })

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo')
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo))
    }
  }, [])

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true)
      try {
        if (!userInfo) {
          setLoading(false)
          return
        }

        const config = {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }

        const storedCartItems = localStorage.getItem('cartItems')
        if (storedCartItems) {
          setCartItems(JSON.parse(storedCartItems))
        }

        const response = await axios.get('/cart/cart', config)
        const data = response.data
        setCartItems(data)
      } catch (error) {
        setError('Error fetching cart items')
      } finally {
        setLoading(false)
      }
    }

    fetchCartItems()
  }, [userInfo])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
  }, [cartItems])

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const saveAddress = (e) => {
    e.preventDefault()
    dispatch(createUserAddress(address)) // Dispatch the action to create address
  }

  const paynow = async () => {
    try {
      if (!userInfo) {
        console.error('No logged in user found')
        return
      }
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }

      // Save the address before proceeding with payment
      //dispatch(createUserAddress(address))

      const response = await axios.post('/orders/order-create/', {}, config)
      const data = response.data
      console.log(data)
      const options = {
        key: 'rzp_test_lKLwu13AnAdmPU',
        amount: data.cost,
        currency: 'INR',
        name: 'Ecommerce Application',
        order_id: data.razorpay_order_id,
        callback_url: 'http://localhost:3000/',
        handler: function (response) {
          console.log(response)
          history.push('/paymentsuccess') // Redirect to payment success page
        },
        modal: {
          ondismiss: function () {
            console.log('Checkout form closed')
          },
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        theme: {
          color: '#3399cc',
        },
      }

      const rzp1 = new Razorpay(options)
      rzp1.open()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <HeroBanner title="Checkout" />
      <div className="container mx-auto mt-4 px-4">
        <h1 className="font-bold text-3xl">Billing Details</h1>
        <hr className="my-4" />
        <div className="flex flex-col md:flex-row md:space-x-8 mb-4">
          <div className="md:w-3/4">
            <CreateAddressComponent
              address={address}
              handleChange={handleChange}
              saveAddress={saveAddress}
            />
          </div>
          <div className="md:w-1/4">
            <div className="bg-gray-200 p-4 rounded-md">
              <p className="text-xl font-bold text-gray-800 mb-4">Cart Total</p>
              <div className="flex justify-between mb-4">
                <p className="text-gray-600 text-lg">Total price: </p>
                <p className="text-lg font-bold text-red-500">
                  ₹
                  {cartItems.reduce(
                    (acc, item) =>
                      acc +
                      (parseFloat(item.price) || 0) *
                        (parseInt(item.quantity) || 1),
                    0
                  )}
                </p>
              </div>
              <button
                className="bg-blue-500 px-4 py-2 text-white w-full rounded-md"
                onClick={paynow}
              >
                Proceed to checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
