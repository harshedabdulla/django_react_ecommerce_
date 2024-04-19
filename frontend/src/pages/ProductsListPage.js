// ProductsListPage.js
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from 'react-router-dom'
import { CREATE_PRODUCT_RESET } from '../constants'
import Categories from '../components/Categories'

const ProductsListPage = () => {
  let history = useHistory()
  let searchTerm = history.location.search
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  // products list reducer
  const productsListReducer = useSelector((state) => state.productsListReducer)
  const { loading, error, products } = productsListReducer

  useEffect(() => {
    dispatch(getProductsList())
    dispatch({
      type: CREATE_PRODUCT_RESET,
    })
  }, [dispatch])

  const handleCategoryClick = (category) => {
    setSelectedCategory(category)
  }

  return (
    <div>
      <Categories
        categories={[
          'All categories',
          'Groceries',
          'Fruits and vegetables',
          'Dairy products',
          'Meat',
          'Bakery',
          'Cleaning supplies',
        ]}
        handleCategoryClick={handleCategoryClick}
      />
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
              selectedCategory === 'All categories'
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

export default ProductsListPage
