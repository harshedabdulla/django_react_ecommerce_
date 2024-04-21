import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProductsBySearchTerm } from '../actions/productActions' // Import the action to fetch products by search term

function SearchBarForProducts() {
  const dispatch = useDispatch()
  let history = useHistory()
  const [searchTerm, setSearchTerm] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      dispatch(getProductsBySearchTerm(searchTerm)) // Dispatch action to fetch products by search term
      history.push(`/search?name=${searchTerm}`) // Update the URL with the search term
    }
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            value={searchTerm}
            placeholder="Search our store..."
            className="form-control flex-grow border-gray-200 rounded-none text-gray-200"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 h-10 px-4 font-bold text-white button-focus-css rounded-none"
          >
            SEARCH
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBarForProducts
