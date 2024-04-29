import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getProductsBySearchTerm } from '../actions/productActions'

function SearchBarForProducts() {
  const dispatch = useDispatch()
  const history = useHistory()
  const [searchTerm, setSearchTerm] = useState('')
  const [searchError, setSearchError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    if (searchTerm.trim() !== '') {
      console.log('Search term:', searchTerm)
      try {
        const response = await fetch(
          `http://localhost:8000/api/product-search/?name=${encodeURIComponent(
            searchTerm
          )}`
        )
        if (response.ok) {
          const data = await response.json()
          console.log('Search results:', data)
          // Encode search results data into URL parameters
          const searchResultsParam = encodeURIComponent(JSON.stringify(data))
          // Navigate to search results page with search results data as URL parameter
          history.push(
            `/search-results?searchTerm=${encodeURIComponent(
              searchTerm
            )}&searchResults=${searchResultsParam}`
          )
        } else {
          setSearchError('No items found')
        }
      } catch (error) {
        console.error('Error fetching search results:', error)
        setSearchError('An error occurred while searching')
      }
    }
  }

  return (
    <div>
      <div className="container mx-auto mt-6">
        <form onSubmit={onSubmit}>
          <div className="flex items-center mb-4">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search our store..."
              className="form-control flex-grow border-gray-200 rounded-none text-gray-200"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              type="submit"
              className="bg-blue-500 h-10 px-4 font-bold text-white button-focus-css rounded-none ml-2"
            >
              SEARCH
            </button>
          </div>
        </form>
        {searchError && <div className="text-red-500 mb-4">{searchError}</div>}
      </div>
    </div>
  )
}

export default SearchBarForProducts
