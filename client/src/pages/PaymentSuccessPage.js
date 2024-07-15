import React from 'react'
import HeroBanner from '../components/HeroBanner'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

const PaymentSuccessPage = () => {
  return (
    <div>
      <HeroBanner title="Payment Success" />
      <div className="container my-4">
        <h2 className="text-6xl mt-4">Payment was Successfull 👍</h2>
        <p className="text-2xl my-4">
          Thank you for your purchase! Your product will be dispatch asap 🚛.
        </p>
        <Link
          to="/shop/"
          className="border-none bg-blue-500 text-white px-4 py-1 my-4"
        >
          Continue Shopping
        </Link>
      </div>
    </div>
  )
}

export default PaymentSuccessPage
