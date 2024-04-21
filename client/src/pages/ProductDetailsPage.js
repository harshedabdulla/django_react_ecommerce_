import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import {
  Spinner,
  Row,
  Col,
  Container,
  Card,
  Button,
  Modal,
} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {
  CREATE_PRODUCT_RESET,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_RESET,
  CARD_CREATE_RESET,
} from '../constants'

import { addToCart } from '../actions/productActions'
function ProductDetailsPage({ history, match }) {
  const dispatch = useDispatch()
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const handleAddToCart = () => {
    dispatch(addToCart(product))
    setShowSuccessMessage(true)
    // Dispatch addToCart action with product details
    // You can also show a success message or perform any other action upon adding to cart
  }
  // modal state and functions
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  // product details reducer
  const productDetailsReducer = useSelector(
    (state) => state.productDetailsReducer
  )
  const { loading, error, product } = productDetailsReducer

  // login reducer
  const userLoginReducer = useSelector((state) => state.userLoginReducer)
  const { userInfo } = userLoginReducer

  // product details reducer
  const deleteProductReducer = useSelector(
    (state) => state.deleteProductReducer
  )
  const { success: productDeletionSuccess } = deleteProductReducer

  useEffect(() => {
    dispatch(getProductDetails(match.params.id))
    dispatch({
      type: UPDATE_PRODUCT_RESET,
    })
    dispatch({
      type: CREATE_PRODUCT_RESET,
    })
    dispatch({
      type: CARD_CREATE_RESET,
    })
  }, [dispatch, match])

  // product delete confirmation
  const confirmDelete = () => {
    dispatch(deleteProduct(match.params.id))
    handleClose()
  }

  // after product deletion
  if (productDeletionSuccess) {
    alert('Product successfully deleted.')
    history.push('/')
    dispatch({
      type: DELETE_PRODUCT_RESET,
    })
  }

  return (
    <div>
      {/* Modal Start*/}
      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <i
                style={{ color: '#e6e600' }}
                className="fas fa-exclamation-triangle"
              ></i>{' '}
              Delete Confirmation
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this product{' '}
            <em>"{product.name}"</em>?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => confirmDelete()}>
              Confirm Delete
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      {/* Modal End */}

      {loading && (
        <span style={{ display: 'flex' }}>
          <h5>Getting Product Details</h5>
          <span className="ml-2">
            <Spinner animation="border" />
          </span>
        </span>
      )}
      {error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <Container>
            <Row>
              <Col md={6}>
                <Card.Img variant="top" src={product.image} height="420" />

                {/* Product edit and delete conditions */}

                {userInfo && userInfo.admin ? (
                  <span style={{ display: 'flex' }}>
                    <button
                      className="btn mt-2 btn-danger btn-sm button-focus-css"
                      style={{ width: '100%' }}
                      onClick={() => handleShow()}
                    >
                      Delete Product
                    </button>

                    <button
                      className="ml-2 mt-2 btn btn-primary btn-sm button-focus-css"
                      onClick={() =>
                        history.push(`/product-update/${product.id}/`)
                      }
                      style={{ width: '100%' }}
                    >
                      Edit Product
                    </button>
                  </span>
                ) : (
                  ''
                )}
              </Col>

              <Col sm>
                <div className="font-bold text-2xl">{product.name}</div>

                <span className="text-red-600 text-2xl font-bold mt-4">
                  ₹ {product.price}
                </span>
                <span className="text-gray-600 text-sm">
                  <p>{product.description}</p>
                </span>
                {/* Add to cart button */}
                <button
                  onClick={handleAddToCart}
                  className=" bg-blue-500 mt-4 w-1/2 text-white py-2 border-black border-2"
                >
                  <span>ADD TO CART</span>
                </button>
                {showSuccessMessage && (
                  <div
                    className="bg-green-400 w-1/2 my-4 py-2 text-center"
                    role="alert"
                  >
                    Product added to cart successfully!
                  </div>
                )}

                <Link to="/shop/cart/">
                  <button className=" bg-blue-500 mt-4 w-1/2 text-white py-2 border-black border-2">
                    <span>CART</span>
                  </button>
                </Link>
                <hr className="my-4" />
                {product.stock ? (
                  <div>
                    <h4 className="text-xl font-bold">
                      {' '}
                      Availability :{' '}
                      <span className="font-medium text-xl">In Stock</span>
                    </h4>
                    <h4 className="text-xl font-bold">
                      {' '}
                      Shipping :{' '}
                      <span className="font-medium text-xl">
                        Free orders above ₹499
                      </span>
                    </h4>
                    <Link to={`${product.id}/checkout/`}>
                      <button className="btn btn-primary my-12">
                        <span>Pay with Stripe</span>
                      </button>
                    </Link>
                  </div>
                ) : (
                  <Message variant="danger">Out Of Stock!</Message>
                )}
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  )
}

export default ProductDetailsPage
