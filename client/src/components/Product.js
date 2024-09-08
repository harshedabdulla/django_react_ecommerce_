import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Product({ product }) {
  const [rating, setRating] = useState(0)

  useEffect(() => {
    const fetchRating = async () => {
      const storedUserInfo = localStorage.getItem('userInfo')

      if (storedUserInfo) {
        const config = {
          headers: {
            Authorization: `Bearer ${JSON.parse(storedUserInfo).token}`,
          },
        }
        try {
          const response = await axios.get(`/api/product-ratings/${product.id}/`, config)
          setRating(response.data["rating"])
        } catch (error) {
          console.error("Error fetching rating", error)
        }
      }
    }

    fetchRating()
  }, [product.id])

  return (
    <div>
      <Card className="mb-4 rounded">
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
        <Card.Body>
            <Card.Img
              variant="top"
              src={product.image}
              className="h-48 w-full object-cover"
            />                   
            <Card.Title as="div">
              <strong className='mt-2'>{product.name}</strong>
            </Card.Title>
            {localStorage.getItem('userInfo') && (
              <div style={{ fontSize: 15 }}>
                {rating === 0 ? "Unrated" : `${rating}/5`}
              </div>
            )}
          
          <Card.Text as="h3">₹ {product.price}</Card.Text>
        </Card.Body>
        </Link>
      </Card>
    </div>
  )
}

export default Product
