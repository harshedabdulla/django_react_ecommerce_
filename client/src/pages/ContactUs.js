import React, { useState } from 'react'
import HeroBanner from '../components/HeroBanner'
import axios from 'axios'

const ContactUs = () => {
  const [feedback, setFeedback] = useState('')

  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('/feedback/submit-feedback/', {
        feedback,
      })
      console.log('Feedback submitted:', response.data)
      // Reset the feedback input
      setFeedback('')
    } catch (error) {
      console.error('Error submitting feedback:', error)
    }
  }

  return (
    <div>
      <HeroBanner title={'Contact Us'} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8 text-center ">
        <div className="flex flex-col items-center">
          <i className="fas fa-phone-alt text-3xl mb-2 text-blue-500"></i>
          <p className="font-medium">Phone</p>
          <p className="text-gray-600">+91 8888 88683</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-map-marker-alt text-3xl mb-2 text-blue-500"></i>
          <p className="font-medium">Open Time</p>
          <p className="text-gray-600">We are online always!</p>
        </div>
        <div className="flex flex-col items-center">
          <i className="fas fa-envelope text-3xl mb-2 text-blue-500"></i>
          <p className="font-medium">Email</p>
          <p className="text-gray-600">hello@ecommerceapp.com</p>
        </div>
      </div>
      {/* Feedback Form */}
      <h2 className="text-center text-4xl font-bold mt-16">Feedback</h2>
      <p className="text-gray-600">Message :</p>
      <form onSubmit={handleSubmit} className="mb-8 mx-auto">
        <textarea
          className="w-full border rounded-md p-2 bg-white"
          rows="4"
          placeholder="Enter your feedback here..."
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        <button
          type="submit"
          className="mt-4 bg-blue-500 w-full text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default ContactUs
