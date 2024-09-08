import React from 'react'
import CarouselIndicatorsInside from '../components/CarouselIndicatorsInside'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import HeroBanner from '../components/HeroBanner'

const ShopProducts = () => {
  const dispatch = useDispatch()
  const [selectedCategory, setSelectedCategory] = useState('All categories')

  useEffect(() => {
    dispatch(getProductsList())
    // Remove CREATE_PRODUCT_RESET if not needed here
  }, [dispatch])

  const productsListReducer = useSelector((state) => state.productsListReducer)
  const { loading, error, products } = productsListReducer

  return (
    <div>
      {/* Header with image */}
      <HeroBanner title={'Shop'} subheading={'Home - Shop'} />

      {/* Hot Products Section */}
      <div className="text-3xl text-left mt-4 font-bold">
        Hot offers
      </div>
      <hr className="w-36 border-4 border-blue-500 mt-2" />
      <div className="mt-8">
        <CarouselIndicatorsInside />
        <hr className="w-40 border-[2px] border-gray-400 mt-8" />
      </div>

      {/* All Products Section */}
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
