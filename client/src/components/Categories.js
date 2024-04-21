import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Categories = ({ categories }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleCategoryClick = () => {
    setShowDropdown(false) // Close dropdown when category is clicked
  }

  return (
    <div className="relative z-50">
      <button
        className="bg-blue-500 font-bold py-2 px-4 text-white rounded-none inline-flex items-center"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <i className="fas fa-list-ul mr-2"></i>
        All Categories
        <i
          className={`fas fa-chevron-${showDropdown ? 'up' : 'down'} ml-2`}
        ></i>
      </button>
      {showDropdown && (
        <ul className="absolute bg-white border rounded-none z-50">
          {categories.map((category, index) => (
            <li
              key={index}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              <Link
                to={`/shop/${category.replace(/\s+/g, '-')}`}
                onClick={handleCategoryClick}
              >
                {category}
              </Link>
              {/* Use Link component */}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Categories
