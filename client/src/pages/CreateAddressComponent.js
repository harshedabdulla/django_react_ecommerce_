import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUserAddress } from '../actions/userActions' // Import the action to create address

const CreateAddressComponent = ({ toggleCreateAddress }) => {
  const dispatch = useDispatch()
  const [address, setAddress] = useState({
    name: '',
    phone_number: '',
    house_no: '',
    landmark: '',
    city: '',
    state: '',
    pin_code: '',
  })
  const [message, setMessage] = useState('') // New state variable for the message
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}

    if (!address.name.trim()) newErrors.name = 'Name is required'
    if (!address.phone_number.trim()) {
      newErrors.phone_number = 'Phone number is required'
    } else if (!/^\d{10}$/.test(address.phone_number)) {
      newErrors.phone_number = 'Phone number must be 10 digits'
    }
    if (!address.house_no.trim())
      newErrors.house_no = 'House number is required'
    if (!address.city.trim()) newErrors.city = 'City is required'
    if (!address.state.trim()) newErrors.state = 'State is required'
    if (!address.pin_code.trim()) {
      newErrors.pin_code = 'Pin code is required'
    } else if (!/^\d{6}$/.test(address.pin_code)) {
      newErrors.pin_code = 'Pin code must be 6 digits'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(createUserAddress(address))
      setMessage('Address saved, please pay now') // Set the message after address is saved
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block mb-2 font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="w-full p-2 border border-gray-300 bg-white rounded-md"
            value={address.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-600">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone_number"
            className="block mb-2 font-medium text-gray-700"
          >
            Phone
          </label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            className="w-full p-2 border border-gray-300 bg-white rounded-md"
            value={address.phone_number}
            onChange={handleChange}
          />
          {errors.phone_number && (
            <p className="text-red-600">{errors.phone_number}</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="house_no"
            className="block mb-2 font-medium text-gray-700"
          >
            House No
          </label>
          <input
            type="text"
            id="house_no"
            name="house_no"
            className="w-full p-2 border border-gray-300 bg-white rounded-md"
            value={address.house_no}
            onChange={handleChange}
          />
          {errors.house_no && <p className="text-red-600">{errors.house_no}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="landmark"
            className="block mb-2 font-medium text-gray-700"
          >
            Landmark
          </label>
          <input
            type="text"
            id="landmark"
            name="landmark"
            className="w-full p-2 border border-gray-300 bg-white rounded-md"
            value={address.landmark}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="city"
            className="block mb-2 font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="w-full p-2 border border-gray-300 bg-white rounded-md"
            value={address.city}
            onChange={handleChange}
          />
          {errors.city && <p className="text-red-600">{errors.city}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="state"
            className="block mb-2 font-medium text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            className="w-full p-2 border border-gray-300 bg-white rounded-md"
            value={address.state}
            onChange={handleChange}
          />
          {errors.state && <p className="text-red-600">{errors.state}</p>}
        </div>
        <div className="mb-4">
          <label
            htmlFor="pin_code"
            className="block mb-2 font-medium text-gray-700"
          >
            Pin Code
          </label>
          <input
            type="text"
            id="pin_code"
            name="pin_code"
            className="w-full p-2 border border-gray-300 bg-white rounded-md"
            value={address.pin_code}
            onChange={handleChange}
          />
          {errors.pin_code && <p className="text-red-600">{errors.pin_code}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">Notes</label>
          <textarea className="w-full p-2 border bg-white border-gray-300 rounded-md" />
        </div>
        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 text-white w-full rounded-md"
        >
          Save Address
        </button>
      </form>
      {message && (
        <div className="mt-4 text-green-600 font-medium">{message}</div>
      )}
    </>
  )
}

export default CreateAddressComponent
