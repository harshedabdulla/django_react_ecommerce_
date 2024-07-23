import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import StarRating from './StarRating'

function Product({ product }) {
  const [rating, setRating] = useState(0)
  useEffect(async ()=>{
    const storedUserInfo = localStorage.getItem('userInfo')
    const config = {
      headers: {
        Authorization: `Bearer ${JSON.parse(storedUserInfo).token}`,
      },
    }
    const response = await axios.get(`/api/product-ratings/${product.id}/`, config);
    console.log(response.data["rating"])
    setRating(response.data["rating"])
  })
  return (
    <div>
      <Card className="mb-4 rounded">
        <Card.Body>
          <Link to={`/product/${product.id}`}>
            <Card.Img
              variant="top"
              src={product.image}
              className="h-48 w-full object-cover"
            />
          </Link>
          <Link to={`/product/${product.id}`}>
            <Card.Title as="div">
              <strong>{product.name}</strong>

            </Card.Title>
              <div style={{fontSize:15}}>{rating==0 ? "Unrated" : rating + "/5" }</div>
          </Link>

          <Card.Text as="h3">₹ {product.price}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Product
