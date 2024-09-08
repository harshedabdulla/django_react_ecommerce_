import React from 'react'
import { useLocation } from 'react-router-dom'
import { Link } from 'react-router-dom'

function SearchResultPage() {
  const location = useLocation()
  const searchTerm = new URLSearchParams(location.search).get('searchTerm')
  // Retrieve and parse search results data from URL parameters
  const searchResultsParam = new URLSearchParams(location.search).get(
    'searchResults'
  )
  const searchResults = searchResultsParam
    ? JSON.parse(decodeURIComponent(searchResultsParam))
    : []

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">
        Search Results for "{searchTerm}"
      </h1>
      {/* Display search results */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {searchResults.map((item) => (
          <Link to={`/product/${item.id}`} key={item.id} className="border p-2 hover:shadow-lg rounded-sm" style={{textDecoration:'none'}}>
          <div key={item.id} className="bg-white rounded-lg shadow-lg p-4">
            <div className="text-lg font-semibold mb-2">{item.name}</div>
            <div className="mb-2">{item.description}</div>
            <div className="font-bold">${item.price}</div>
          </div>
        </Link>
        ))}
      </div>
    </div>
  )
}

export default SearchResultPage
