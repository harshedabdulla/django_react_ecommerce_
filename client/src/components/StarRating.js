import React, { useState } from 'react'
import { FaStar } from 'react-icons/fa'

const StarRating = ({ onSubmit, valuek=0 }) => {
  const [rating, setRating] = useState(valuek)

  const handleClick = (value) => {
    if (value === rating) {
      // If the same star is clicked again, reset rating
      setRating(null)
      onSubmit(null) // Notify parent component of reset
    } else {
      setRating(value)
      onSubmit(value) // Notify parent component of selected rating
    }
  }

  return (
    <div role="radiogroup" aria-label="Rating">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1
        return (
          <label key={index} style={{ cursor: 'pointer' }}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              checked={rating === ratingValue}
              onChange={() => handleClick(ratingValue)}
              style={{ display: 'none' }} // Hide default radio input
            />
            <FaStar
              className="star"
              color={ratingValue <= rating ? '#ffc107' : '#e4e5e9'}
              size={24}
              style={{ cursor: 'pointer' }}
              role="radio"
              aria-checked={ratingValue <= rating ? 'true' : 'false'}
            />
          </label>
        )
      })}
    </div>
  )
}

export default StarRating
