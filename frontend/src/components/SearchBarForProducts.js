import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

function SearchBarForProducts() {
  let history = useHistory()
  const [searchTerm, setSearchTerm] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (searchTerm) {
      history.push(`/?searchTerm=${searchTerm}`)
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
            className="form-control flex-grow border-gray-400 rounded-none text-gray-400"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-primary button-focus-css rounded-none"
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBarForProducts
