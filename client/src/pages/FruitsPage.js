import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsByCategory } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import HeroBanner from '../components/HeroBanner' // Import HeroBanner component

const FruitsPage = () => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState(
    'fruits and vegetables'
  )

  useEffect(() => {
    dispatch(getProductsByCategory(selectedCategory)) // Pass selectedCategory to getProductsByCategory
  }, [dispatch, selectedCategory])

  const productsListReducer = useSelector((state) => state.productsListReducer)
  const { loading, error, products } = productsListReducer

  return (
    <div>
      <HeroBanner title={'Fruits and vegetables'} subheading={'Home - Shop'} />{' '}
      {/* Use HeroBanner component */}
      {error && <Message variant="danger">{error}</Message>}
      {loading && (
        <span style={{ display: 'flex' }}>
          <h5>Getting Products</h5>
          <span className="ml-2">
            <Spinner animation="border" />
          </span>
        </span>
      )}
      <div>
        <Row>
          {products
            .filter((item) =>
              selectedCategory === 'fruits and vegetables' // Update category name here
                ? true
                : item.category === selectedCategory
            )
            .map((product, idx) => (
              <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                <div className="mx-2">
                  <Product product={product} />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  )
}

export default FruitsPage
