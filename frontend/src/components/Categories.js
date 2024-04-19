// Categories.js
import React, { useState } from 'react'

const Categories = ({ categories, handleCategoryClick }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="flex justify-center items-center">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        All categories
        <svg
          className="w-4 h-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 1 .707.293l4 4a1 1 0 1 1-1.414 1.414L10 14.414l-3.293 3.293a1 1 0 1 1-1.414-1.414l4-4A1 1 0 0 1 10 12z"
          />
        </svg>
      </button>
      {showDropdown && (
        <ul className="absolute bg-white border rounded mt-1">
          {categories.map((category, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => {
                handleCategoryClick(category)
                setShowDropdown(false)
              }}
            >
              {category}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Categories
