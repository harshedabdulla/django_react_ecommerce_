import React, { useState } from 'react'

const Categories = ({ categories, handleCategoryClick }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div className="relative">
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
        <ul className="absolute bg-white border rounded-none">
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
