import React from 'react'
import CarouselIndicatorsInside from '../components/CarouselIndicatorsInside'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'

import { CREATE_PRODUCT_RESET } from '../constants'

const ShopProducts = () => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('All categories')
  useEffect(() => {
    dispatch(getProductsList())
    dispatch({
      type: CREATE_PRODUCT_RESET,
    })
  }, [dispatch])

  // products list reducer
  const productsListReducer = useSelector((state) => state.productsListReducer)
  const { loading, error, products } = productsListReducer
  return (
    <div>
      {/* Image header */}
      <div className="px-0">
        <img
          src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="h-32 w-full object-cover"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-white mb-24">
            Explore
            <div className="text-sm text-white mb-24 flex items-center text-center mx-4">
              Home - <div className="text-gray-500 align-center">Shop</div>
            </div>
          </div>
        </div>
      </div>
      {/* Hot Products Section */}
      <div className="text-3xl font-bold text-left mt-4 font-bold">
        Hot offers
      </div>
      <hr className="w-36 border-4 border-blue-500 mt-2" />
      <div className="mt-8">
        <CarouselIndicatorsInside />
        <hr className="w-40 border-[2px] border-gray-400 mt-8" />
      </div>
      <div className="mt-8">
        <h4 className="text-3xl font-bold">All Products</h4>
        <hr className="w-36 border-2 border-blue-500 mt-2" />

        {error && <Message variant="danger">{error}</Message>}
        {loading && (
          <span style={{ display: 'flex' }}>
            <h5>Getting Products</h5>
            <span className="ml-2">
              <Spinner animation="border" />
            </span>
          </span>
        )}
        <div className="mt-4">
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
    </div>
  )
}

export default ShopProducts
